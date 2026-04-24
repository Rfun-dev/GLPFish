import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

/**
 * AuthContext
 * Provides authentication state and actions across the app.
 * Replace the mock logic here with real API calls when the backend is ready.
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("fishqc_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          email: firebaseUser.email,
          role: "inspector",
        };
        localStorage.setItem("fishqc_user", JSON.stringify(userData));
        setUser(userData);
      } else {
        localStorage.removeItem("fishqc_user");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  /** Login — swap this mock with a real API call */
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  /** Register — swap this mock with a real API call */
  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(credential.user, { displayName: name });

      // Simpan profil langsung ke Firestore — seperti Supabase insert
      await setDoc(doc(db, "users", credential.user.uid), {
        name,
        email,
        // role: "inspector",
        createdAt: new Date(),
      });

      return { success: true };
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  /** Logout */
  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  /**
   * uploadImage — upload file gambar ke Firebase Storage
   * @param {File}   file            - file dari input type="file"
   * @param {string} folder          - subfolder di storage, default 'images'
   * @returns {{ success, url, path, error }}
   *
   * Contoh pemakaian di komponen:
   *   const { uploadImage } = useAuth()
   *   const result = await uploadImage(file)
   *   if (result.success) console.log(result.url)
   */
  const uploadImage = useCallback(async (file, folder = "images") => {
    if (!auth.currentUser) {
      return { success: false, error: "User belum login" };
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF",
      };
    }

    // Validasi ukuran file — maksimal 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { success: false, error: "Ukuran file maksimal 5MB" };
    }

    setUploadProgress(0);

    try {
      // Path: images/{uid}/{timestamp}_{namafile}
      const filePath = `${folder}/${auth.currentUser.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);

      // Upload file
      setUploadProgress(50);
      const snapshot = await uploadBytes(storageRef, file);

      // Ambil URL publik
      setUploadProgress(80);
      const url = await getDownloadURL(snapshot.ref);

      setUploadProgress(100);
      return { success: true, url, path: filePath };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setTimeout(() => setUploadProgress(0), 500);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

function firebaseErrorMessage(code) {
  const messages = {
    "auth/user-not-found": "Email tidak terdaftar",
    "auth/wrong-password": "Password salah",
    "auth/invalid-credential": "Email atau password salah",
    "auth/email-already-in-use": "Email sudah digunakan",
    "auth/weak-password": "Password minimal 6 karakter",
    "auth/invalid-email": "Format email tidak valid",
    "auth/too-many-requests": "Terlalu banyak percobaan, coba lagi nanti",
    "auth/network-request-failed": "Tidak ada koneksi internet",
  };
  return messages[code] || "Terjadi kesalahan, coba lagi";
}
