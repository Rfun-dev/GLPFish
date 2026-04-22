import { Outlet } from 'react-router-dom'

/**
 * AuthLayout — auth shell that wraps login/register pages.
 * Each page handles its own hero section and styling.
 */
export default function AuthLayout() {
  return <Outlet />
}