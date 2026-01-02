interface PlanetProps {
  planet: {
    name: string;
    type: string;
    link: string;
  };
}

export default function Planet({ planet }: PlanetProps) {
  const baseSize = 180;
  const size = baseSize * planet.size;

  return (
    <div
      className="relative cursor-pointer group transition-transform hover:scale-105"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Grey planet background */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #a0a0a0, #606060)',
          boxShadow: 'inset -4px -4px 8px rgba(0, 0, 0, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Planet text label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="text-white text-sm font-bold tracking-widest text-center px-4"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          {planet.name}
        </span>
      </div>
    </div>
  );
}
