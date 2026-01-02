import { Pause, Play } from 'lucide-react';

interface Planet {
  name: string;
  type: string;
  link: string;
  size: number;
  color: string;
  image?: string;
}

interface OrbitControllerProps {
  isPaused: boolean;
  onTogglePause: () => void;
  rotation: number;
  onNotchDragStart: (e: React.MouseEvent) => void;
  onNotchDrag: (e: React.MouseEvent) => void;
  planets: Planet[];
}

export default function OrbitController({
  isPaused,
  onTogglePause,
  rotation,
  planets,
}: OrbitControllerProps) {
  const radius = 48; // Half of w-24 (96px)

  // Color mapping for each planet type
  const getPlanetDotColor = (type: string): string => {
    switch (type) {
      case 'eclipse':
        return 'bg-gray-400'; // grey
      case 'kzfree':
        return 'bg-green-500'; // green
      case 'jazz':
        return 'bg-purple-500'; // purple
      case 'k3fay':
        return 'bg-yellow-400'; // yellow
      case 'photography':
        return 'bg-orange-500'; // orange
      case 'library':
        return 'bg-blue-500'; // blue
      case 'reader':
        return 'bg-amber-700'; // brown
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate positions for all planet dots
  const getPlanetDotPosition = (index: number) => {
    const angle = (360 / planets.length) * index + rotation;
    const angleRad = (angle * Math.PI) / 180;
    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;
    return { x, y };
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/10 bg-white/2" />

        {/* Planet dots around the wheel */}
        {planets.map((planet, index) => {
          const { x, y } = getPlanetDotPosition(index);
          return (
            <div
              key={index}
              className={`absolute w-3 h-3 rounded-full z-20 ${getPlanetDotColor(planet.type)}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              title={planet.name}
            />
          );
        })}

        <button
          onClick={onTogglePause}
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition shadow-lg"
          style={{
            background: 'linear-gradient(to bottom right, rgba(234, 179, 8, 0.6), rgba(245, 158, 11, 0.6), rgba(239, 68, 68, 0.6))',
          }}
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className="w-5 h-5 text-white" /> : <Pause className="w-5 h-5 text-white" />}
        </button>
      </div>
    </div>
  );
}
