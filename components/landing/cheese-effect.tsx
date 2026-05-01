"use client"

export function CheeseEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Cheese drips */}
      <svg 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl" 
        viewBox="0 0 400 60" 
        fill="none"
      >
        {/* Drip 1 */}
        <path 
          d="M50 0 Q50 20 45 35 Q40 50 50 55 Q60 50 55 35 Q50 20 50 0" 
          fill="url(#cheese-gradient)"
          className="animate-drip"
        />
        {/* Drip 2 */}
        <path 
          d="M120 0 Q120 30 115 45 Q110 60 120 58 Q130 60 125 45 Q120 30 120 0" 
          fill="url(#cheese-gradient)"
          className="animate-drip-slow"
        />
        {/* Drip 3 */}
        <path 
          d="M200 0 Q200 15 197 25 Q194 35 200 38 Q206 35 203 25 Q200 15 200 0" 
          fill="url(#cheese-gradient)"
          className="animate-drip-delay"
        />
        {/* Drip 4 */}
        <path 
          d="M280 0 Q280 25 275 40 Q270 55 280 52 Q290 55 285 40 Q280 25 280 0" 
          fill="url(#cheese-gradient)"
          className="animate-drip-slow"
        />
        {/* Drip 5 */}
        <path 
          d="M350 0 Q350 20 345 32 Q340 44 350 46 Q360 44 355 32 Q350 20 350 0" 
          fill="url(#cheese-gradient)"
          className="animate-drip"
        />
        
        <defs>
          <linearGradient id="cheese-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
