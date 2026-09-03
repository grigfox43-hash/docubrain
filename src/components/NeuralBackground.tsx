export function NeuralBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 opacity-60 dark:opacity-30">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="neural-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338CA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="neural-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4338CA" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Soft atmospheric gradient blur lights */}
        <circle cx="280" cy="240" r="320" fill="url(#neural-grad-1)" filter="blur(70px)" />
        <circle cx="1180" cy="380" r="340" fill="url(#neural-grad-2)" filter="blur(80px)" />

        {/* Neural Network Nodes & Links */}
        <g stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" className="animate-pulse">
          <line x1="220" y1="200" x2="380" y2="160" />
          <line x1="380" y1="160" x2="520" y2="280" />
          <line x1="520" y1="280" x2="350" y2="380" />
          <line x1="350" y1="380" x2="220" y2="200" />
          <line x1="380" y1="160" x2="680" y2="190" />
          <line x1="680" y1="190" x2="820" y2="310" />
          <line x1="820" y1="310" x2="980" y2="220" />
          <line x1="980" y1="220" x2="1140" y2="340" />
          <line x1="1140" y1="340" x2="1280" y2="210" />
          <line x1="820" y1="310" x2="650" y2="440" />
          <line x1="650" y1="440" x2="520" y2="280" />
          <line x1="980" y1="220" x2="880" y2="460" />
          <line x1="880" y1="460" x2="1140" y2="340" />
        </g>

        {/* Connected document nodes */}
        <g fill="#4338CA">
          <circle cx="220" cy="200" r="5" opacity="0.8" />
          <circle cx="380" cy="160" r="7" opacity="0.9" />
          <circle cx="520" cy="280" r="8" opacity="0.85" />
          <circle cx="350" cy="380" r="6" opacity="0.75" />
          <circle cx="680" cy="190" r="9" opacity="0.95" />
          <circle cx="820" cy="310" r="10" opacity="0.9" fill="#16A34A" />
          <circle cx="650" cy="440" r="6" opacity="0.7" />
          <circle cx="980" cy="220" r="7" opacity="0.85" />
          <circle cx="880" cy="460" r="6" opacity="0.75" />
          <circle cx="1140" cy="340" r="8" opacity="0.8" />
          <circle cx="1280" cy="210" r="5" opacity="0.65" />
        </g>
      </svg>
    </div>
  );
}
