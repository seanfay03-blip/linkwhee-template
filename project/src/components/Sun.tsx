export default function Sun() {
  return (
    <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative w-42 h-42 md:w-58 md:h-58">
        {/* Inner bright core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, #fef3c7 0%, #fcd34d 20%, #f59e0b 50%, #d97706 100%)',
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            boxShadow: `
              0 0 40px 20px rgba(255, 255, 255, 0.6),
              0 0 80px 35px rgba(254, 243, 199, 0.5),
              0 0 120px 50px rgba(253, 211, 77, 0.4),
              0 0 160px 70px rgba(245, 158, 11, 0.2),
              inset 0 0 30px rgba(255, 255, 255, 0.8),
              inset -10px -10px 40px rgba(0, 0, 0, 0.3)
            `,
          }}
        />

        {/* White highlight layer */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 20%, transparent 50%)',
          }}
        />

        {/* Extended white corona */}
        <div
          className="absolute -inset-16 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(254, 243, 199, 0.3) 30%, rgba(253, 211, 77, 0.1) 60%, transparent 100%)',
          }}
        />

        {/* Outer glow layer */}
        <div
          className="absolute -inset-32 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
