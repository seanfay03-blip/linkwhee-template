

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stars from './components/Stars';
import Sun from './components/Sun';
import Planet from './components/Planet';
import OrbitController from './components/OrbitController';

interface Planet {
  name: string;
  type: string;
  link: string;
}

const planets: Planet[] = [
  {
    name: 'Link 1',
    type: 'link1',
    link: '#',
  },
  {
    name: 'Link 2',
    type: 'link2',
    link: '#',
  },
  {
    name: 'Link 3',
    type: 'link3',
    link: '#',
  },
  {
    name: 'Link 4',
    type: 'link4',
    link: '#',
  },
  {
    name: 'Link 5',
    type: 'link5',
    link: '#',
  },
  {
    name: 'Link 6',
    type: 'link6',
    link: '#',
  },
  {
    name: 'Link 7',
    type: 'link7',
    link: '#',
  },
];

function App() {
  const navigate = useNavigate();
  const [activePlanetIndex, setActivePlanetIndex] = useState(2); 
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [draggedPlanetIndex, setDraggedPlanetIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingNotch, setIsDraggingNotch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTimeRef = useRef(0);

  // Rotate planets in orbit (paused state stops automatic rotation)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle scroll wheel to rotate planets
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 50) return;
      lastWheelTimeRef.current = now;

      if (e.deltaY > 0) {
        setRotation((prev) => (prev + 10) % 360);
      } else {
        setRotation((prev) => (prev - 10 + 360) % 360);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  // Prevent vertical scroll/pan on mobile
  useEffect(() => {
    let lastY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };

    const handleTouchMovePrevent = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - lastY;
      
      // Only allow horizontal movement (left/right), prevent vertical (up/down)
      if (Math.abs(deltaY) > Math.abs(e.touches[0].clientX - (e.touches[0] as any).lastX || 0)) {
        e.preventDefault();
      }
      lastY = currentY;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMovePrevent, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMovePrevent);
    };
  }, []);

  const getPlanetPosition = (index: number) => {
    const angle = (360 / planets.length) * index + rotation;
    const rad = (angle * Math.PI) / 180;
    const sinRad = Math.sin(rad);
    const cosRad = Math.cos(rad);
    
    const x = cosRad * 400;
    const y = sinRad * 50 - 50;
    const z = y;
    const verticalComponent = sinRad;
    
    return { x, y, z, verticalComponent };
  };

  const handlePlanetMouseDown = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setDraggedPlanetIndex(index);
    setDragOffset({ x: e.clientX, y: e.clientY });
  };

  const handlePlanetTouchStart = (e: React.TouchEvent, index: number) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setDraggedPlanetIndex(index);
    setDragOffset({ x: touch.clientX, y: touch.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingNotch) {
      handleNotchDrag(e);
      return;
    }
    if (draggedPlanetIndex !== null) {
      const deltaX = (e.clientX - dragOffset.x) * 0.1;
      // Invert drag direction so planets follow cursor movement
      setRotation((prev) => (prev - deltaX) % 360);
      setDragOffset({ x: e.clientX, y: e.clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedPlanetIndex !== null) {
      const touch = e.touches[0];
      const deltaX = (touch.clientX - dragOffset.x) * 0.15;
      // Invert drag direction so planets follow touch movement
      setRotation((prev) => (prev - deltaX) % 360);
      setDragOffset({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleMouseUp = () => {
    setDraggedPlanetIndex(null);
    handleNotchMouseUp();
  };

  const handleTouchEnd = () => {
    setDraggedPlanetIndex(null);
  };

  const handlePlanetClick = (index: number) => {
    setActivePlanetIndex(index);
    const planet = planets[index];
    if (planet.link && planet.link !== '#') {
      if (planet.link.startsWith('/')) {
        navigate(planet.link);
      } else {
        window.open(planet.link, '_blank');
      }
    }
  };

  // Find the planet closest to the sun (center) and set it active
  const lockToClosestPlanet = () => {
    let minDist = Infinity;
    let closest = 0;
    for (let i = 0; i < planets.length; i++) {
      const { x, y } = getPlanetPosition(i);
      const dist = Math.hypot(x, y);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    setActivePlanetIndex(closest);
  };

  const handleTogglePause = () => {
    if (!isPaused) {
      lockToClosestPlanet();
    }
    setIsPaused((p) => !p);
  };

  const handleNotchDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingNotch(true);
  };

  const handleNotchDrag = (e: React.MouseEvent) => {
    if (!isDraggingNotch) return;
    
    // Get center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight - 24 - 48; // bottom-6 (24px) + half of controller (48px)
    
    // Calculate angle from center to mouse
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const angleRad = Math.atan2(deltaY, deltaX);
    const angleDeg = (angleRad * 180) / Math.PI;
    
    setRotation((angleDeg + 360) % 360);
  };

  const handleNotchMouseUp = () => {
    setIsDraggingNotch(false);
  };



  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black overflow-hidden relative select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Stars />

      <div className="relative min-h-screen flex items-center justify-center">
        <Sun />

        {/* txt button in top right */}
        <div className="absolute top-8 right-8 z-40 flex items-center justify-center">
          {/* Shaded sphere background */}
          <div
            className="absolute w-12 h-12 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #e5e5e5, #808080)',
              boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.3)',
            }}
          />
          {/* txt text */}
          <Link
            to="/txt"
            className="absolute text-black text-lg font-light hover:opacity-70 transition-opacity z-10"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            txt
          </Link>
        </div>

        {/* Title */}
        <div className="absolute top-8 left-8 z-30 w-max">
          <h1
            className="text-white text-3xl md:text-4xl font-bold tracking-wider"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            your title here
          </h1>
        </div>

        {/* Planets in orbit */}
        {planets.map((planet, index) => {
          const { x, y, z, verticalComponent } = getPlanetPosition(index);
          
          const scale = 0.7 + (verticalComponent + 1) * 0.3;
          const zIndex = verticalComponent < 0 ? 5 : 20 + Math.round(z / 35);
          const isDragging = draggedPlanetIndex === index;

          return (
            <div
              key={index}
              className={`absolute cursor-grab ${isDragging ? 'active:cursor-grabbing' : ''}`}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                left: '50%',
                top: '50%',
                zIndex: Math.round(zIndex),
              }}
              onMouseDown={(e) => handlePlanetMouseDown(e, index)}
              onTouchStart={(e) => handlePlanetTouchStart(e, index)}
              onClick={() => !isDragging && handlePlanetClick(index)}
            >
              <div
                style={{
                  transform: `scale(${scale * 1.05})`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
              >
                <Planet planet={planet} />
              </div>
            </div>
          );
        })}
        <OrbitController
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          rotation={rotation}
          onNotchDragStart={handleNotchDragStart}
          onNotchDrag={handleNotchDrag}
          planets={planets}
        />
      </div>
    </div>
  );
}

export default App;
