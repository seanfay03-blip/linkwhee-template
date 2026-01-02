import { Link } from 'react-router-dom';

const TextOnly = () => {
  const planets = [
    { name: 'Link 1', link: '#' },
    { name: 'Link 2', link: '#' },
    { name: 'Link 3', link: '#' },
    { name: 'Link 4', link: '#' },
    { name: 'Link 5', link: '#' },
    { name: 'Link 6', link: '#' },
    { name: 'Link 7', link: '#' },
  ];

  const isInternalLink = (link: string) => link.startsWith('/');

  return (
    <div className="h-screen bg-white text-black p-8 font-serif overflow-y-auto">
      <div className="flex flex-col items-center justify-center min-h-full">
        <a 
          href="/" 
          className="absolute top-8 left-8 text-blue-600 underline hover:text-blue-800"
          style={{ fontFamily: 'Times New Roman, serif', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ transform: 'scaleX(-1)', display: 'inline-block', fontSize: '20px' }}>🚀</span>
          home
        </a>

        <h1 
          className="text-4xl font-bold mb-8"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          your title here
        </h1>

        {/* Circular arrangement of planets */}
        <div className="relative w-80 h-80 flex items-center justify-center mb-12">
          {planets.map((planet, index) => {
            const angle = (index / planets.length) * 360;
            const radius = 140;
            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  left: '50%',
                  top: '50%',
                }}
              >
                {planet.link !== '#' ? (
                  isInternalLink(planet.link) ? (
                    <>
                      <Link
                        to={planet.link}
                        className="text-blue-600 underline hover:text-blue-800 whitespace-nowrap"
                        style={{ fontFamily: 'Times New Roman, serif' }}
                      >
                        {planet.name}
                      </Link>
                    </>
                  ) : (
                    <>
                      <a
                        href={planet.link}
                        className="text-blue-600 underline hover:text-blue-800 whitespace-nowrap"
                        style={{ fontFamily: 'Times New Roman, serif' }}
                      >
                        {planet.name}
                      </a>
                    </>
                  )
                ) : (
                  <span
                    className="whitespace-nowrap"
                    style={{ fontFamily: 'Times New Roman, serif' }}
                  >
                    {planet.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextOnly;
