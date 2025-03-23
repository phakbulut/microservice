import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const frameworks = [
  { id: 'dropwizard', name: 'Dropwizard', logo: '/logos/dropwizard.png' },
  { id: 'vertx', name: 'Vert.x', logo: '/logos/vertx.png' },
  { id: 'spring', name: 'Spring Boot', logo: '/logos/spring.png' },
  { id: 'restlet', name: 'Restlet', logo: '/logos/restlet.png' },
  { id: 'spark', name: 'Spark', logo: '/logos/spark.png' },
];

// Site bölümleri
const sections = [
  { id: 'intro', name: 'Ana Sayfa' },
  { id: 'criteria', name: 'Kriterler' },
  { id: 'history', name: 'Tarihçe' },
  { id: 'features', name: 'Özellikler' },
  { id: 'structure', name: 'Yapı' },
  { id: 'eloquent', name: 'ORM' },
  { id: 'route', name: 'Yönlendirme' },
  { id: 'syntax', name: 'Sözdizimi' },
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
  const logoRefs = useRef({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Framework seçme fonksiyonu
  const selectFramework = (frameworkId) => {
    dispatch({ type: 'SET_FRAMEWORK', payload: frameworkId });
  };

  // Sol ok tuşuna basınca önceki framework'e geçiş
  const prevFramework = () => {
    const currentIndex = frameworks.findIndex(fw => fw.id === selectedFramework);
    const newIndex = currentIndex === 0 ? frameworks.length - 1 : currentIndex - 1;
    selectFramework(frameworks[newIndex].id);
  };

  // Sağ ok tuşuna basınca sonraki framework'e geçiş
  const nextFramework = () => {
    const currentIndex = frameworks.findIndex(fw => fw.id === selectedFramework);
    const newIndex = currentIndex === frameworks.length - 1 ? 0 : currentIndex + 1;
    selectFramework(frameworks[newIndex].id);
  };

  // Pencere boyutu değiştiğinde yeniden hesapla
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Seçili olan framework logo elementini merkeze konumlandır
  useEffect(() => {
    if (!containerRef.current || !logoRefs.current[selectedFramework]) return;

    const logoElement = logoRefs.current[selectedFramework];
    const containerRect = containerRef.current.getBoundingClientRect();
    const logoRect = logoElement.getBoundingClientRect();
    
    // Logonun tam merkeze konumlandırılması için gerekli kaydırma miktarı
    const scrollLeft = (logoRect.left + logoRect.width / 2) - (containerRect.left + containerRect.width / 2);
    
    // Smooth kaydırma
    if (scrollerRef.current) {
      scrollerRef.current.style.transform = `translateX(${-scrollLeft}px)`;
    }
  }, [selectedFramework, windowWidth, visible]);

  // Dinamik stiller
  const headerStyle = {
    backgroundColor: `${colors.background}e6`, // %90 opaklık ile
    borderBottom: `1px solid ${colors.border}`
  };

  const arrowStyle = {
    color: colors.accent,
    textShadow: `0 0 10px ${colors.accent}`,
    backgroundColor: `${colors.accent}33` // %20 opaklık
  };

  const activeLogoStyle = {
    filter: `drop-shadow(0 0 15px ${colors.accent})`
  };

  const logoNameStyle = {
    color: colors.accent,
    textShadow: `0 0 5px ${colors.accent}`
  };

  // Active sınıf için stil
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
        >
          &#8249;
        </button>
        
        <div className="framework-logos-container" ref={containerRef}>
          <div 
            className="framework-scroller"
            ref={scrollerRef}
          >
            {frameworks.map((fw) => (
              <div 
                key={fw.id}
                ref={el => logoRefs.current[fw.id] = el}
                className={`framework-logo-container ${selectedFramework === fw.id ? 'active' : ''}`}
                onClick={() => selectFramework(fw.id)}
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
        >
          &#8250;
        </button>
      </div>
      
      {/* Bölümler arası navigasyon (yeni CSS sınıfları ile) */}
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