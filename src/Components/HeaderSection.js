import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const frameworks = [
  { id: 'dropwizard', name: 'Dropwizard', logo: `${process.env.PUBLIC_URL}/logos/dropwizard.png` },
  { id: 'vertx', name: 'Vert.x', logo: `${process.env.PUBLIC_URL}/logos/vertx.png` },
  { id: 'spring', name: 'Spring Boot', logo: `${process.env.PUBLIC_URL}/logos/spring.png` },
  { id: 'restlet', name: 'Restlet', logo: `${process.env.PUBLIC_URL}/logos/restlet.png` },
  { id: 'spark', name: 'Spark', logo: `${process.env.PUBLIC_URL}/logos/spark.png` },
];

// Site bölümleri
const sections = [
  { id: 'intro', name: 'Ana Sayfa' },
  { id: 'criteria', name: 'Kriterler' },
  { id: 'history', name: 'Tarihçe' },
  { id: 'features', name: 'Özellikler' },
  { id: 'structure', name: 'Yapı' },
  { id: 'eloquent', name: 'ORM' },
  { id: 'route', name: 'Routing' },
  { id: 'syntax', name: 'Syntax' },
  { id: 'learning', name: 'Öğrenme' },
  { id: 'performance', name: 'Performans' },
  { id: 'scenarios', name: 'Senaryolar' }
];

const HeaderSection = ({ visible, onSectionClick, activeSection }) => {
  const selectedFramework = useSelector(state => state.selectedFramework);
  const colors = useSelector(state => state.colors);
  const dispatch = useDispatch();
  const scrollerRef = useRef(null);
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const ITEM_WIDTH = 120; // Logo container genişliği (margin dahil)
  const ITEM_SPACING = 20; // Logolar arası boşluk

  // Framework seçme fonksiyonu
  const selectFramework = (frameworkId) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentIndex = frameworks.findIndex(fw => fw.id === selectedFramework);
    const targetIndex = frameworks.findIndex(fw => fw.id === frameworkId);
    const containerWidth = containerRef.current?.offsetWidth || 0;
    
    let distance = targetIndex - currentIndex;
    // Sonsuz efekt için en kısa yolu hesapla
    if (Math.abs(distance) > frameworks.length / 2) {
      distance = distance > 0 
        ? distance - frameworks.length 
        : distance + frameworks.length;
    }

    const newPosition = currentPosition - (distance * (ITEM_WIDTH + ITEM_SPACING));

    // Pozisyonu güncelle
    if (scrollerRef.current) {
      scrollerRef.current.style.transition = 'transform 0.5s ease';
      scrollerRef.current.style.transform = `translateX(${newPosition}px)`;
      
      // Animasyon bittikten sonra pozisyonu normalize et
      setTimeout(() => {
        const normalizedIndex = (targetIndex + frameworks.length) % frameworks.length;
        const offset = (containerWidth - ITEM_WIDTH) / 2;
        const normalizedPosition = -(normalizedIndex * (ITEM_WIDTH + ITEM_SPACING)) + offset;
        
        scrollerRef.current.style.transition = 'none';
        scrollerRef.current.style.transform = `translateX(${normalizedPosition}px)`;
        setCurrentPosition(normalizedPosition);
        setIsTransitioning(false);
      }, 500);
    }

    dispatch({ type: 'SET_FRAMEWORK', payload: frameworkId });
  };

  // Sol ok tuşuna basınca önceki framework'e geçiş
  const prevFramework = () => {
    if (isTransitioning) return;
    const currentIndex = frameworks.findIndex(fw => fw.id === selectedFramework);
    const newIndex = currentIndex === 0 ? frameworks.length - 1 : currentIndex - 1;
    selectFramework(frameworks[newIndex].id);
  };

  // Sağ ok tuşuna basınca sonraki framework'e geçiş
  const nextFramework = () => {
    if (isTransitioning) return;
    const currentIndex = frameworks.findIndex(fw => fw.id === selectedFramework);
    const newIndex = currentIndex === frameworks.length - 1 ? 0 : currentIndex + 1;
    selectFramework(frameworks[newIndex].id);
  };

  // Pencere boyutu değiştiğinde yeniden hesapla
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Seçili logoyu merkeze getir
      const currentIndex = frameworks.findIndex(fw => fw.id === selectedFramework);
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const offset = (containerWidth - ITEM_WIDTH) / 2;
      const newPosition = -(currentIndex * (ITEM_WIDTH + ITEM_SPACING)) + offset;
      
      if (scrollerRef.current) {
        scrollerRef.current.style.transition = 'none';
        scrollerRef.current.style.transform = `translateX(${newPosition}px)`;
        setCurrentPosition(newPosition);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedFramework]);

  // İlk yüklemede ve framework değiştiğinde logoyu merkeze getir
  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const currentIndex = frameworks.findIndex(fw => fw.id === selectedFramework);
    const containerWidth = containerRef.current.offsetWidth;
    const offset = (containerWidth - ITEM_WIDTH) / 2;
    const newPosition = -(currentIndex * (ITEM_WIDTH + ITEM_SPACING)) + offset;

    scrollerRef.current.style.transition = 'none';
    scrollerRef.current.style.transform = `translateX(${newPosition}px)`;
    setCurrentPosition(newPosition);
  }, [selectedFramework, visible]);

  // Dinamik stiller
  const headerStyle = {
    backgroundColor: `${colors.background}e6`,
    borderBottom: `1px solid ${colors.border}`
  };

  const arrowStyle = {
    color: colors.accent,
    textShadow: `0 0 10px ${colors.accent}`,
    backgroundColor: `${colors.accent}33`
  };

  const activeLogoStyle = {
    filter: `drop-shadow(0 0 15px ${colors.accent})`
  };

  const logoNameStyle = {
    color: colors.accent,
    textShadow: `0 0 5px ${colors.accent}`
  };

  const activeItemStyle = {
    color: colors.accent
  };

  // Klavye navigasyonu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevFramework();
      } else if (e.key === 'ArrowRight') {
        nextFramework();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedFramework]);

  return (
    <div className={`framework-header ${visible ? 'visible' : ''}`} style={headerStyle}>
      <div className="framework-slider">
        <button 
          className="slider-arrow left" 
          onClick={prevFramework}
          style={arrowStyle}
          aria-label="Önceki framework"
          disabled={isTransitioning}
        >
          &#8249;
        </button>
        
        <div className="framework-logos-container" ref={containerRef}>
          <div 
            className="framework-scroller"
            ref={scrollerRef}
          >
            {/* Sol kopya grup */}
            {frameworks.map((fw) => (
              <div 
                key={`left-${fw.id}`}
                className={`framework-logo-container ${selectedFramework === fw.id ? 'active' : ''}`}
                onClick={() => selectFramework(fw.id)}
                style={{ marginRight: ITEM_SPACING }}
              >
                <img 
                  src={fw.logo} 
                  alt={`${fw.name} logo`}
                  className="framework-logo"
                  style={selectedFramework === fw.id ? activeLogoStyle : {}}
                />
                <span 
                  className="framework-name"
                  style={logoNameStyle}
                >
                  {fw.name}
                </span>
              </div>
            ))}
            
            {/* Ana grup */}
            {frameworks.map((fw) => (
              <div 
                key={fw.id}
                className={`framework-logo-container ${selectedFramework === fw.id ? 'active' : ''}`}
                onClick={() => selectFramework(fw.id)}
                style={{ marginRight: ITEM_SPACING }}
              >
                <img 
                  src={fw.logo} 
                  alt={`${fw.name} logo`}
                  className="framework-logo"
                  style={selectedFramework === fw.id ? activeLogoStyle : {}}
                />
                <span 
                  className="framework-name"
                  style={logoNameStyle}
                >
                  {fw.name}
                </span>
              </div>
            ))}
            
            {/* Sağ kopya grup */}
            {frameworks.map((fw) => (
              <div 
                key={`right-${fw.id}`}
                className={`framework-logo-container ${selectedFramework === fw.id ? 'active' : ''}`}
                onClick={() => selectFramework(fw.id)}
                style={{ marginRight: ITEM_SPACING }}
              >
                <img 
                  src={fw.logo} 
                  alt={`${fw.name} logo`}
                  className="framework-logo"
                  style={selectedFramework === fw.id ? activeLogoStyle : {}}
                />
                <span 
                  className="framework-name"
                  style={logoNameStyle}
                >
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="slider-arrow right" 
          onClick={nextFramework}
          style={arrowStyle}
          aria-label="Sonraki framework"
          disabled={isTransitioning}
        >
          &#8250;
        </button>
      </div>
      
      {visible && (
        <div className="header-nav">
          {sections.map(section => (
            <div
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`header-nav-item ${activeSection === section.id ? 'active' : ''}`}
              style={activeSection === section.id ? activeItemStyle : {}}
            >
              {section.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSection; 