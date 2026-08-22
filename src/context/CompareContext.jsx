import { createContext, useContext, useEffect, useState } from 'react'

const CompareContext = createContext(null)
const STORAGE_KEY = 'elan:compare'
const MAX_COMPARE = 3

export function CompareProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* ignore */
    }
  }, [ids])

  const inCompare = (id) => ids.includes(id)
  const toggleCompare = (id) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, id]
    })
  }
  const clearCompare = () => setIds([])
  const canAdd = ids.length < MAX_COMPARE

  return (
    <CompareContext.Provider
      value={{ ids, count: ids.length, max: MAX_COMPARE, canAdd, inCompare, toggleCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
