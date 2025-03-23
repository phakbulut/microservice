import React from 'react';
import { Container, Row, Col, Card, CardBody, Progress } from 'reactstrap';
import { useSelector } from 'react-redux';

// Framework öğrenme bilgileri
const learningData = {
  dropwizard: {
    difficultyLevel: 65,
    learningTime: "2-3 ay",
    learningPath: [
      { step: 1, title: "Core Java ve OOP", description: "Güçlü nesne yönelimli programlama temelleri" },
      { step: 2, title: "JAX-RS (Jersey)", description: "RESTful web servisleri oluşturma" },
      { step: 3, title: "Jackson", description: "JSON serileştirme ve deserileştirme" },
      { step: 4, title: "Hibernate & JDBC", description: "Veritabanı erişimi ve ORM" },
      { step: 5, title: "Metrics ve HealthCheck", description: "Uygulama izleme ve sağlık kontrolü" },
      { step: 6, title: "Dropwizard Yapılandırma", description: "YAML tabanlı yapılandırma yönetimi" },
      { step: 7, title: "Dropwizard Bundle", description: "Eklenti ve paket sistemi" }
    ],
    advantages: "Java temelli olduğu için Core Java bilgisi olanlar için öğrenmesi nispeten kolaydır. Dokümantasyon kapsamlıdır.",
    challenges: "YAML yapılandırması bazen karmaşık olabilir. Daha az topluluk desteği vardır."
  },
  
  vertx: {
    difficultyLevel: 75,
    learningTime: "3-4 ay",
    learningPath: [
      { step: 1, title: "Core Java ve OOP", description: "Güçlü nesne yönelimli programlama temelleri" },
      { step: 2, title: "Asenkron Programlama", description: "Callback ve Promise yapıları" },
      { step: 3, title: "Reactif Programlama", description: "Olay temelli, reaktif paradigma" },
      { step: 4, title: "Vert.x Core", description: "Temel modüller ve yapı" },
      { step: 5, title: "Vert.x Web", description: "HTTP sunucu ve istemci oluşturma" },
      { step: 6, title: "Vert.x EventBus", description: "Mikroservis iletişimi" },
      { step: 7, title: "Vert.x Service Discovery", description: "Servis keşfi ve kayıt" },
      { step: 8, title: "Vert.x Circuit Breaker", description: "Devre kesici desen kullanımı" }
    ],
    advantages: "Yüksek verimlilik, asenkron ve reaktif programlama modeline sahiptir.",
    challenges: "Asenkron/reaktif programlama paradigması geleneksel Java programcıları için zorlayıcı olabilir. Callback hell tuzağına düşmek kolaydır."
  },
  
  spring: {
    difficultyLevel: 70,
    learningTime: "2-4 ay",
    learningPath: [
      { step: 1, title: "Core Java ve OOP", description: "Güçlü nesne yönelimli programlama temelleri" },
      { step: 2, title: "Spring Core", description: "IoC ve Dependency Injection" },
      { step: 3, title: "Spring Boot", description: "Otomatik yapılandırma ve starter'lar" },
      { step: 4, title: "Spring MVC", description: "Web uygulamaları ve REST API'ler" },
      { step: 5, title: "Spring Data", description: "Veritabanı erişimi ve repository desteği" },
      { step: 6, title: "Spring Security", description: "Kimlik doğrulama ve yetkilendirme" },
      { step: 7, title: "Spring Cloud", description: "Mikroservis mimarisi ve bulut entegrasyonu" }
    ],
    advantages: "Çok geniş ekosistem, mükemmel dokümantasyon, büyük topluluk desteği ve iş pazarında yüksek talep.",
    challenges: "Spring'in büyük ekosistemi bazen bunaltıcı olabilir. 'Sihirli' otomatik yapılandırması karmaşık sorunlarda hata ayıklamayı zorlaştırabilir."
  },
  
  restlet: {
    difficultyLevel: 60,
    learningTime: "1-2 ay",
    learningPath: [
      { step: 1, title: "Core Java ve OOP", description: "Güçlü nesne yönelimli programlama temelleri" },
      { step: 2, title: "REST Prensipleri", description: "RESTful API tasarım ilkeleri" },
      { step: 3, title: "Restlet Core", description: "Temel kavramlar ve mimari" },
      { step: 4, title: "Restlet Kaynakları", description: "Kaynak sınıfları ve temsilleri" },
      { step: 5, title: "Restlet Uzantıları", description: "Jackson, Gson, vb. entegrasyonları" },
      { step: 6, title: "Restlet Güvenliği", description: "Kimlik doğrulama ve yetkilendirme" }
    ],
    advantages: "REST prensiplerini doğru şekilde uygular, minimalist ve anlaşılması kolaydır.",
    challenges: "Daha az güncel, topluluk desteği azalmıştır ve büyük projelerde ölçeklenebilirlik sorunları olabilir."
  },
  
  spark: {
    difficultyLevel: 40,
    learningTime: "1-2 ay",
    learningPath: [
      { step: 1, title: "Core Java ve OOP", description: "Temel Java programlama" },
      { step: 2, title: "Lambda İfadeleri", description: "Java 8+ lambda ve fonksiyonel arabirimler" },
      { step: 3, title: "Spark Core", description: "Rota tanımları ve işleyiciler" },
      { step: 4, title: "Spark Template", description: "Şablon motorları kullanımı" },
      { step: 5, title: "JSON İşleme", description: "Gson veya Jackson entegrasyonu" },
      { step: 6, title: "Spark Filter", description: "Ara yazılım ve filtreler" }
    ],
    advantages: "Ultra minimal, hızla başlamanızı sağlar. Öğrenmesi en kolay framework'tür.",
    challenges: "Büyük projelerde yapısal organizasyon zorluğu, ileri düzey özelliklerin eksikliği."
  }
};

const LearningSection = ({ framework }) => {
  const colors = useSelector(state => state.colors);
  
  // Varsayılan olarak Spring'i kullan veya framework parametresine göre veriyi seç
  const frameworkData = learningData[framework.toLowerCase()] || learningData.spring;
  
  return (
    <section className="section content-section learning-section" id="learning-section">
      <div className="background-particles">
        {Array(10).fill().map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              backgroundColor: i % 2 === 0 ? colors.primary : colors.accent,
              boxShadow: `0 0 ${Math.random() * 20 + 10}px ${i % 2 === 0 ? colors.primary : colors.accent}`
            }}
          />
        ))}
      </div>
      
      <Container>
        <h2 className="section-title">
          <span className="gradient-text">Öğrenme Zorluğu</span>
        </h2>
        
        <p className="intro-text">
          Core Java bilgisine sahip bir geliştirici için {framework} öğrenme süreci nasıldır? 
          Aşağıda zorluk seviyesi, tahmini öğrenme süresi ve önerilen öğrenme yolu bulabilirsiniz.
        </p>
        
        <Row className="mb-5">
          <Col md={6}>
            <Card className="learning-difficulty-card">
              <CardBody>
                <h3 className="learning-card-title">Zorluk Seviyesi</h3>
                <div className="difficulty-meter">
                  <Progress
                    className="difficulty-progress"
                    value={frameworkData.difficultyLevel}
                    style={{
                      height: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px'
                    }}
                  >
                    <span className="difficulty-value">{frameworkData.difficultyLevel}%</span>
                  </Progress>
                  <div className="difficulty-labels">
                    <span>Kolay</span>
                    <span>Orta</span>
                    <span>Zor</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="learning-time-card">
              <CardBody>
                <h3 className="learning-card-title">Öğrenme Süresi</h3>
                <div className="learning-time-content">
                  <div className="time-icon">⏱️</div>
                  <div className="time-value">
                    <span className="time-number">{frameworkData.learningTime}</span>
                    <span className="time-description">
                      Core Java bilen bir geliştirici için yaklaşık süre
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Card className="learning-path-card">
          <CardBody>
            <h3 className="learning-card-title">Öğrenme Yolu</h3>
            <p className="learning-card-description">
              Core Java bilgisine sahip bir geliştirici için {framework} öğrenirken izlenmesi gereken adımlar:
            </p>
            
            <div className="learning-steps">
              {frameworkData.learningPath.map(step => (
                <div className="learning-step" key={step.step}>
                  <div className="step-number" 
                    style={{
                      backgroundColor: colors.accent,
                      boxShadow: `0 0 10px ${colors.accent}`
                    }}>
                    {step.step}
                  </div>
                  <div className="step-content">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        
        <Row className="mt-4">
          <Col md={6}>
            <Card className="learning-notes-card">
              <CardBody>
                <h3 className="learning-card-title">
                  <span className="card-title-icon">✅</span> Avantajlar
                </h3>
                <p className="learning-notes">{frameworkData.advantages}</p>
              </CardBody>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="learning-notes-card">
              <CardBody>
                <h3 className="learning-card-title">
                  <span className="card-title-icon">⚠️</span> Zorluklar
                </h3>
                <p className="learning-notes">{frameworkData.challenges}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LearningSection; 