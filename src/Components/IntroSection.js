import React from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

const frameworks = [
  { id: 'dropwizard', name: 'Dropwizard', logo: '/logos/dropwizard.png' },
  { id: 'vertx', name: 'Vert.x', logo: '/logos/vertx.png' },
  { id: 'spring', name: 'Spring Boot', logo: '/logos/spring.png' },
  { id: 'restlet', name: 'Restlet', logo: '/logos/restlet.png' },
  { id: 'spark', name: 'Spark', logo: '/logos/spark.png' },
];

const IntroSection = () => {
  const selectedFramework = useSelector(state => state.selectedFramework);
  const colors = useSelector(state => state.colors);
  const dispatch = useDispatch();
  
  // Framework seçme fonksiyonu
  const selectFramework = (frameworkId) => {
    dispatch({ type: 'SET_FRAMEWORK', payload: frameworkId });
  };

  // Dinamik stiller
  const introStyle = {
    backgroundColor: colors.background,
    backgroundImage: `radial-gradient(circle at 50% 50%, ${colors.background}, ${colors.background}DD)`
  };

  const titleStyle = {
    color: 'white',
    textShadow: `0 0 20px ${colors.primary}60`
  };
  
  const textStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    lineHeight: '1.6'
  };

  const logoActiveStyle = {
    filter: `drop-shadow(0 0 10px ${colors.accent})`
  };

  const logoNameStyle = {
    color: 'white'
  };

  return (
    <section className="section intro-section" id="intro-section" style={introStyle}>
      <Container>
        <div className="intro-content">
          <h1 className="intro-title" style={titleStyle}>Java Frameworkleri</h1>
          <p style={textStyle}>
            Bu sunum, modern Java frameworklerini derinlemesine inceleyerek 
            hangi projelerde hangi frameworkün daha uygun çözüm olduğunu anlamanıza 
            yardımcı olmayı amaçlıyor. Her frameworkün güçlü ve zayıf yanlarını ve kullanım senaryolarını
            öğretiyor
          </p>
          
          <div className="intro-logos">
            {frameworks.map((fw) => (
              <div 
                key={fw.id}
                className={`intro-logo-container ${selectedFramework === fw.id ? 'active' : ''}`}
                onClick={() => selectFramework(fw.id)}
              >
                <img 
                  src={fw.logo} 
                  alt={`${fw.name} logo`}
                  className="intro-logo"
                  style={selectedFramework === fw.id ? logoActiveStyle : {}}
                />
                <span 
                  className="intro-logo-name"
                  style={logoNameStyle}
                >
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default IntroSection;