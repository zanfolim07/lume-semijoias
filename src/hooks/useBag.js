import { useCallback, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'

const STORAGE_KEY = 'lume-sacola'

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter((item) => products.some((p) => p.id === item.id)) : []
  } catch {
    return []
  }
}

export function useBag() {
  const [entries, setEntries] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch {}
  }, [entries])

  const add = useCallback((id) => {
    setEntries((list) =>
      list.some((item) => item.id === id)
        ? list.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
        : [...list, { id, qty: 1 }]
    )
  }, [])

  const setQty = useCallback((id, qty) => {
    setEntries((list) =>
      qty < 1 ? list.filter((item) => item.id !== id) : list.map((item) => (item.id === id ? { ...item, qty } : item))
    )
  }, [])

  const clear = useCallback(() => setEntries([]), [])

  const items = useMemo(
    () => entries.map((item) => ({ ...item, product: products.find((p) => p.id === item.id) })),
    [entries]
  )
  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const total = items.reduce((sum, item) => sum + item.qty * item.product.price, 0)

  return { items, count, total, add, setQty, clear }
}
