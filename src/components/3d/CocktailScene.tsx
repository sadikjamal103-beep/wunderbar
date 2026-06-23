'use client'

export default function CocktailScene() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(200,160,76,0.4)) drop-shadow(0 0 60px rgba(200,160,76,0.15)); }
          50% { filter: drop-shadow(0 0 40px rgba(200,160,76,0.7)) drop-shadow(0 0 80px rgba(200,160,76,0.3)); }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
        }
        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { opacity: 0.3; }
        }
        .cocktail-svg {
          animation: float 4s ease-in-out infinite, glow 3s ease-in-out infinite;
        }
        .bubble1 { animation: bubble 2.5s ease-in infinite; }
        .bubble2 { animation: bubble 3s ease-in infinite 0.7s; }
        .bubble3 { animation: bubble 2s ease-in infinite 1.4s; }
        .liquid-shine { animation: shimmer 2s ease-in-out infinite; }
      `}</style>

      {/* Background glow orb */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,160,76,0.08) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <svg
        className="cocktail-svg"
        width="180"
        height="260"
        viewBox="0 0 180 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Liquid fill inside glass */}
        <defs>
          <clipPath id="glassClip">
            <polygon points="15,15 165,15 100,130 80,130" />
          </clipPath>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FE86A0" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FDD835" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Liquid inside */}
        <polygon
          points="15,15 165,15 100,130 80,130"
          fill="url(#liquidGrad)"
          clipPath="url(#glassClip)"
        />

        {/* Glass outline */}
        <polygon
          points="15,15 165,15 100,130 80,130"
          fill="url(#glassGrad)"
          stroke="#C9A84C"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Shine on glass */}
        <line
          x1="40" y1="20" x2="60" y2="95"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          className="liquid-shine"
        />

        {/* Stem */}
        <rect x="87" y="130" width="6" height="80" fill="#C9A84C" rx="3" />

        {/* Base */}
        <rect x="55" y="207" width="70" height="8" rx="4" fill="#C9A84C" />

        {/* Olive / garnish */}
        <circle cx="138" cy="12" r="7" fill="#5a8a3c" stroke="#4a7a2c" strokeWidth="1" />
        <circle cx="138" cy="12" r="3" fill="#c94040" />
        <line x1="138" y1="12" x2="150" y2="5" stroke="#C9A84C" strokeWidth="1.5" />

        {/* Bubbles */}
        <circle className="bubble1" cx="70" cy="110" r="3" fill="white" fillOpacity="0.5" />
        <circle className="bubble2" cx="95" cy="95" r="2" fill="white" fillOpacity="0.4" />
        <circle className="bubble3" cx="115" cy="105" r="2.5" fill="white" fillOpacity="0.45" />

        {/* Rim highlight */}
        <line x1="15" y1="15" x2="165" y2="15" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
      </svg>
    </div>
  )
}
