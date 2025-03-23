import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import IntroSection from './Components/IntroSection';
import HeaderSection from './Components/HeaderSection';
import CriteriaSection from './Components/CriteriaSection';
import HistorySection from './Components/HistorySection';
import FeaturesSection from './Components/FeaturesSection';
import StructureSection from './Components/StructureSection';
import EloquentSection from './Components/EloquentSection';
import RouteEngineSection from './Components/RouteEngineSection';
import SyntaxSection from './Components/SyntaxSection';
import LearningSection from './Components/LearningSection';
import PerformanceSection from './Components/PerformanceSection';
import ScenariosSection from './Components/ScenariosSection';

function App() {
  const selectedFramework = useSelector(state => state.selectedFramework);
  const colors = useSelector(state => state.colors);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [headerAnimation, setHeaderAnimation] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const sectionRefs = useRef({});

  // Scroll olayını dinle ve header'ı göster/gizle
  useEffect(() => {
    const handleScroll = () => {
      const introHeight = window.innerHeight;
      const isVisible = window.scrollY > introHeight * 0.6;
      
      if (isVisible && !headerVisible) {
        // Header görünecek
        setHeaderAnimation(true);
        setTimeout(() => {
          setHeaderVisible(true);
        }, 50); // animasyon için küçük gecikme
      } else if (!isVisible && headerVisible) {
        // Header gizlenecek
        setHeaderVisible(false);
        setTimeout(() => {
          setHeaderAnimation(false);
        }, 500); // animasyon tamamlandıktan sonra
      }
      
      // Hangi bölümün görünür olduğunu belirle
      detectVisibleSection();
    };
    
    // Görünür olan bölümü tespit et
    const detectVisibleSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Her bölümün pozisyonunu kontrol et
      for (const section in sectionRefs.current) {
        const element = sectionRefs.current[section];
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerVisible]);

  // Kaydırma fonksiyonu
  const scrollToSection = (sectionId) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      // Header yüksekliğini dikkate alarak kaydır
      const headerOffset = 90;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Renk stillerini CSS değişkenleri olarak ayarla
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--text-color', colors.text);
    root.style.setProperty('--accent-color', colors.accent);
    root.style.setProperty('--background-color', colors.background);
    root.style.setProperty('--card-bg-color', colors.cardBg);
    root.style.setProperty('--border-color', colors.border);
    
    // Body arka plan rengini ayarla
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    
  }, [colors]);

  return (
    <div className="app-container">
      <style jsx="true">{`
        h1, h2, h3 {
          color: white !important;
          text-shadow: 0 0 10px ${colors.primary}40;
        }
        
        p, span, div {
          color: rgba(255, 255, 255, 0.9);
        }
        
        .timeline:before {
          background-color: ${colors.accent};
          box-shadow: 0 0 8px ${colors.accent};
        }
        
        .timeline-marker {
          border: 3px solid ${colors.primary};
          box-shadow: 0 0 10px ${colors.primary}80;
        }
        
        .timeline-content {
          background-color: ${colors.cardBg};
          border-left: 2px solid ${colors.primary};
        }
        
        .feature-number {
          background-color: ${colors.accent};
          color: white !important;
          text-shadow: 0 0 5px rgba(0,0,0,0.5);
        }
        
        .card {
          border: 1px solid ${colors.border}80;
        }
        
        .card:hover {
          box-shadow: 0 10px 20px ${colors.primary}30;
        }
        
        .feature-card {
          background-color: ${colors.cardBg};
          border: 1px solid ${colors.border}40;
        }
        
        .feature-card:hover {
          box-shadow: 0 10px 30px ${colors.primary}40;
        }
      `}</style>
      <HeaderSection visible={headerAnimation} onSectionClick={scrollToSection} activeSection={activeSection} />
      <div ref={el => sectionRefs.current['intro'] = el}>
        <IntroSection />
      </div>
      <div className="content-sections">
        <div ref={el => sectionRefs.current['criteria'] = el} id="criteria-section">
          <CriteriaSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['history'] = el} id="history-section">
          <HistorySection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['features'] = el} id="features-section">
          <FeaturesSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['structure'] = el} id="structure-section">
          <StructureSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['eloquent'] = el} id="eloquent-section">
          <EloquentSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['route'] = el} id="route-section">
          <RouteEngineSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['syntax'] = el} id="syntax-section">
          <SyntaxSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['learning'] = el} id="learning-section">
          <LearningSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['performance'] = el} id="performance-section">
          <PerformanceSection framework={selectedFramework} />
        </div>
        <div ref={el => sectionRefs.current['scenarios'] = el} id="scenarios-section">
          <ScenariosSection framework={selectedFramework} />
        </div>
      </div>
    </div>
  );
}

export default App;