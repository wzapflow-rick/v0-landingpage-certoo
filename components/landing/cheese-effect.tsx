"use client"

export function CheeseEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible -z-10">
      {/* Cheese drips - mais realistas e animados */}
      <svg
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px]"
        viewBox="0 0 500 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cheeseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="cheeseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Drip 1 */}
        <path
          className="cheese-drop cheese-drop-1"
          d="M80 0 Q75 30 80 50 Q88 80 75 120 Q70 150 78 180 L88 180 Q96 150 85 120 Q72 80 80 50 Q85 30 80 0"
          fill="url(#cheeseGradient)"
          filter="url(#cheeseGlow)"
          opacity="0.7"
        />
        
        {/* Drip 2 */}
        <path
          className="cheese-drop cheese-drop-2"
          d="M160 10 Q155 50 162 80 Q170 120 155 160 L168 160 Q180 120 168 80 Q162 50 160 10"
          fill="url(#cheeseGradient)"
          filter="url(#cheeseGlow)"
          opacity="0.6"
        />
        
        {/* Drip 3 */}
        <path
          className="cheese-drop cheese-drop-3"
          d="M250 5 Q245 35 252 65 Q260 95 248 130 L260 130 Q272 95 260 65 Q254 35 250 5"
          fill="url(#cheeseGradient)"
          filter="url(#cheeseGlow)"
          opacity="0.75"
        />
        
        {/* Drip 4 */}
        <path
          className="cheese-drop cheese-drop-4"
          d="M340 0 Q335 40 342 70 Q350 110 338 150 L350 150 Q362 110 350 70 Q344 40 340 0"
          fill="url(#cheeseGradient)"
          filter="url(#cheeseGlow)"
          opacity="0.65"
        />
        
        {/* Drip 5 */}
        <path
          className="cheese-drop cheese-drop-5"
          d="M420 8 Q415 40 422 70 Q430 100 418 140 L430 140 Q442 100 430 70 Q424 40 420 8"
          fill="url(#cheeseGradient)"
          filter="url(#cheeseGlow)"
          opacity="0.7"
        />
      </svg>
      
      {/* Glow effect behind */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-yellow-500/15 via-orange-500/5 to-transparent rounded-full blur-3xl" />
    </div>
  )
}
