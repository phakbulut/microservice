import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';

// Kriterler ve açıklamaları
const criteria = [
  { 
    id: 'history', 
    title: 'Tarihçe ve Topluluk', 
    description: 'Frameworkün gelişim süreci ve topluluk desteği', 
    icon: '📜'
  },
  { 
    id: 'features', 
    title: 'Varsayılan Özellikler', 
    description: 'Kutudan çıkar çıkmaz sunulan özellikler ve eklenti desteği',
    icon: '🔌'
  },
  { 
    id: 'structure', 
    title: 'Dizin Yapısı', 
    description: 'Proje yapısı ve dosya organizasyonu gereksinimleri',
    icon: '📂'
  },
  { 
    id: 'eloquent', 
    title: 'Veritabanı Desteği', 
    description: 'ORM çözümleri ve veritabanı entegrasyonu',
    icon: '💾'
  },
  { 
    id: 'route', 
    title: 'Route Engine', 
    description: 'Yönlendirme motoru ve API yapılandırma özellikleri',
    icon: '🛤️'
  },
  { 
    id: 'syntax', 
    title: 'Sözdizimi', 
    description: 'Kod yazım şekli ve geliştirici deneyimi',
    icon: '⌨️'
  },
  { 
    id: 'learning', 
    title: 'Öğrenme Eğrisi', 
    description: 'Öğrenme kolaylığı ve dokümantasyon kalitesi',
    icon: '📚'
  },
  { 
    id: 'performance', 
    title: 'Performans', 
    description: 'Hız, verimlilik ve ölçeklendirme özellikleri',
    icon: '⚡'
  },
  { 
    id: 'scenarios', 
    title: 'Kullanım Senaryoları', 
    description: 'Hangi projelerde avantajlı olduğu',
    icon: '🎯'
  }
];

// Arkpalan parçacıkları bileşeni
const BackgroundParticles = ({ colors }) => {
  const particles = Array(20).fill().map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.3 + 0.1,
    color: i % 2 === 0 ? colors.primary : colors.accent
  }));

  return (
    <div className="background-particles">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
};

const CriteriaSection = ({ framework }) => {
  const colors = useSelector(state => state.colors);
  
  // Dinamik stiller
  const sectionStyle = {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '120px',
    paddingBottom: '120px',
    backgroundImage: `radial-gradient(circle at 80% 20%, ${colors.primary}15 0%, transparent 60%)`
  };
  
  const titleWrapperStyle = {
    position: 'relative',
    display: 'inline-block'
  };
  
  const cardStyle = {
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}40`,
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    height: '100%',
    overflow: 'hidden'
  };
  
  const iconStyle = {
    fontSize: '2.5rem',
    marginBottom: '15px',
    display: 'inline-block'
  };
  
  const cardTitleStyle = {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '10px'
  };
  
  const cardTextStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem'
  };
  
  const introTextStyle = {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 50px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.2rem',
    lineHeight: '1.6'
  };
  
  return (
    <section className="section" id="criteria-section" style={sectionStyle}>
      <BackgroundParticles colors={colors} />
      
      <Container>
        <div className="text-center">
          <h2 className="section-title">
            <span className="gradient-text">Karşılaştırma Kriterleri</span>
          </h2>
        </div>
        
        <p style={introTextStyle}>
          Java web frameworklerini karşılaştırırken kullandığımız temel kriterler aşağıda listelenmiştir. 
     
        </p>
        
        <Row className="g-4">
          {criteria.map((item, index) => (
            <Col key={index} lg={4} md={6} className="mb-3">
              <Card 
                style={cardStyle} 
                className="criteria-card"
                onClick={() => document.getElementById(`${item.id}-section`)?.scrollIntoView({ behavior: 'smooth' })}
              >
                <CardBody className="d-flex flex-column align-items-center text-center p-4">
                  <div className="criteria-icon" style={iconStyle}>
                    {item.icon}
                  </div>
                  <h3 style={cardTitleStyle}>{item.title}</h3>
                  <p style={cardTextStyle}>{item.description}</p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        
      
      </Container>
    </section>
  );
};

export default CriteriaSection;