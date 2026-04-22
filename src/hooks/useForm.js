import { useState, useCallback } from 'react'

/**
 * useForm — lightweight form state manager
 * @param {object} initialValues
 * @returns {{ values, errors, handleChange, setError, reset }}
 */
export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear field error on change
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const setError = useCallback((field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }))
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return { values, errors, handleChange, setError, reset }
}
