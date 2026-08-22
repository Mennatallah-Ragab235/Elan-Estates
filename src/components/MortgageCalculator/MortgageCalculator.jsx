import { useMemo, useState } from 'react'
import { formatPriceFull } from '../../utils/format.js'

export default function MortgageCalculator({ defaultPrice = 18500000 }) {
  const [price, setPrice] = useState(defaultPrice)
  const [downPct, setDownPct] = useState(20)
  const [years, setYears] = useState(15)
  const [rate, setRate] = useState(12.5)

  const { monthly, principal, totalInterest, totalPaid } = useMemo(() => {
    const down = (price * downPct) / 100
    const principal = Math.max(price - down, 0)
    const r = rate / 100 / 12
    const n = years * 12
    const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n))
    const totalPaid = monthly * n
    const totalInterest = totalPaid - principal
    return { monthly, principal, totalInterest, totalPaid }
  }, [price, downPct, years, rate])

  const fmt = (n) => `EGP ${Math.round(n).toLocaleString('en-US')}`

  return (
    <div className="calc-grid">
      <div className="calc-form">
        <div className="field filled">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
            placeholder=" "
            aria-label="Property price"
          />
          <label>Property Price (EGP)</label>
        </div>

        <div>
          <div className="field filled">
            <input
              type="number"
              value={downPct}
              onChange={(e) => setDownPct(Math.min(100, Math.max(0, Number(e.target.value))))}
              aria-label="Down payment percent"
            />
            <label>Down Payment (%)</label>
          </div>
          <input
            type="range"
            min="0" max="90" step="5"
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            aria-label="Down payment slider"
          />
          <div className="range-row">
            <span>{formatPriceFull((price * downPct) / 100)}</span>
            <span>{downPct}%</span>
          </div>
        </div>

        <div>
          <div className="field filled">
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
              aria-label="Payment period in years"
            />
            <label>Payment Period (years)</label>
          </div>
          <input
            type="range"
            min="5" max="30" step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            aria-label="Period slider"
          />
          <div className="range-row">
            <span>5 yrs</span>
            <span>30 yrs</span>
          </div>
        </div>

        <div>
          <div className="field filled">
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              aria-label="Interest rate"
            />
            <label>Interest Rate (% annual)</label>
          </div>
          <input
            type="range"
            min="0" max="25" step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            aria-label="Rate slider"
          />
          <div className="range-row">
            <span>0%</span>
            <span>25%</span>
          </div>
        </div>
      </div>

      <div className="result-card">
        <div className="lbl">Estimated monthly payment</div>
        <div className="amount">{fmt(monthly)}</div>
        <div className="per">per month, over {years} years</div>
        <div className="breakdown">
          <div className="b">
            <div className="k">Loan amount</div>
            <div className="v">{fmt(principal)}</div>
          </div>
          <div className="b">
            <div className="k">Total interest</div>
            <div className="v">{fmt(totalInterest)}</div>
          </div>
          <div className="b">
            <div className="k">Total paid</div>
            <div className="v">{fmt(totalPaid)}</div>
          </div>
          <div className="b">
            <div className="k">Down payment</div>
            <div className="v">{fmt((price * downPct) / 100)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
