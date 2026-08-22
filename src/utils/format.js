export function formatPrice(n) {
  if (n >= 1000000) {
    return `EGP ${Math.round(n / 100000) / 10}M`
  }
  return `EGP ${n.toLocaleString('en-US')}`
}

export function formatPriceFull(n) {
  return `EGP ${n.toLocaleString('en-US')}`
}

export function formatArea(n) {
  return `${n} m\u00b2`
}

export function getProperty(id, list) {
  return list.find((p) => p.id === id)
}
