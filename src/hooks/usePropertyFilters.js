import { useMemo } from 'react'
import { properties as all } from '../data/properties.js'

export const emptyFilters = {
  q: '',
  location: '',
  type: '',
  bedrooms: '',
  status: '',
  maxPrice: '',
  minArea: '',
  sort: '',
}

export function usePropertyFilters(filters) {
  return useMemo(() => {
    let list = [...all]

    if (filters.q) {
      const q = filters.q.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q),
      )
    }
    if (filters.location) list = list.filter((p) => p.location === filters.location)
    if (filters.type) list = list.filter((p) => p.type === filters.type)
    if (filters.status) list = list.filter((p) => p.status === filters.status)
    if (filters.bedrooms) list = list.filter((p) => String(p.bedrooms) === filters.bedrooms)
    if (filters.maxPrice) list = list.filter((p) => p.price <= Number(filters.maxPrice))
    if (filters.minArea) list = list.filter((p) => p.area >= Number(filters.minArea))

    switch (filters.sort) {
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'area':
        list.sort((a, b) => b.area - a.area)
        break
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [filters])
}
