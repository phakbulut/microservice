import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';

// Framework'lere göre veritabanı sorgu örnekleri - Yalnızca sorgu kısmı
const dbQueryExamples = {
  dropwizard: {
    title: "Dropwizard ve Hibernate",
    description: "Dropwizard, JPA ve Hibernate ile veritabanı işlemlerini destekler.",
    queryExample: `// Kullanıcıyı e-posta ile sorgula
User user = session.createQuery("FROM User u WHERE u.email = :email", User.class)
        .setParameter("email", dto.getEmail())
        .uniqueResult();`
  },
  
  vertx: {
    title: "Vert.x ve Reaktif Veritabanı",
    description: "Vert.x, asenkron ve reaktif veritabanı erişimini destekler.",
    queryExample: `// Asenkron olarak veritabanı sorgusu yap
jdbcClient.queryWithParams(
        "SELECT * FROM users WHERE email = ?", 
        new JsonArray().add(email),
        res -> {
            if (res.succeeded()) {
                ResultSet resultSet = res.result();
                // Sonuçları işle
            }
        });`
  },
  
  spring: {
    title: "Spring Boot ve JPA/Hibernate",
    description: "Spring Data JPA, Repository arayüzleri aracılığıyla veritabanına kolayca erişim sağlar.",
    queryExample: `// Spring Data JPA Repository metodu
Optional<User> findByEmail(String email);

// Kullanım
User user = userRepository.findByEmail(loginDto.getEmail())
        .orElseThrow(() -> new UsernameNotFoundException("Email veya şifre yanlış"));`
  },
  
  restlet: {
    title: "Restlet ve JPA",
    description: "Restlet, JPA entegrasyonu ile veritabanı işlemlerini destekler.",
    queryExample: `// EntityManager ile sorgu
User user = em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
        .setParameter("email", email)
        .getSingleResult();`
  },
  
  spark: {
    title: "Spark ve JDBC/JPA",
    description: "Spark Framework, standart JDBC veya JPA kullanarak veritabanı işlemlerini gerçekleştirir.",
    queryExample: `// JPA EntityManager ile kullanıcı sorgulama
User user = em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
        .setParameter("email", dto.getEmail())
        .getSingleResult();`
  }
};

const EloquentSection = ({ framework }) => {
  const colors = useSelector(state => state.colors);
  const dbExample = dbQueryExamples[framework.toLowerCase()] || dbQueryExamples.spring;
  
  // Stil tanımları
  const containerStyle = {
    position: 'relative',
    zIndex: 2
  };
  
  const titleStyle = {
    marginBottom: '2rem',
    textAlign: 'center'
  };
  
  const codeStyle = {
    backgroundColor: `${colors.primary}10`,
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.9)',
    border: `1px solid ${colors.border}50`,
    lineHeight: '1.6',
    marginTop: '20px',
    overflowX: 'auto',
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.2)`
  };

  return (
    <section className="section content-section" id="eloquent-section">
      <div className="background-particles">
        {Array(8).fill().map((_, i) => (
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
      
      <Container style={containerStyle}>
        <h2 className="section-title">
          <span className="gradient-text">Veritabanı İşlemleri</span>
        </h2>
        
        <p className="intro-text">
          Farklı Java framework'leri, veritabanı işlemleri için farklı yaklaşımlar sunar.
        </p>
        
        <Row>
          <Col lg={12}>
            <Card style={{backgroundColor: colors.cardBg, borderColor: colors.border}}>
              <CardHeader style={{backgroundColor: `${colors.primary}20`, borderColor: colors.border}}>
                <h3 style={{color: 'white', margin: 0}}>{dbExample.title}</h3>
              </CardHeader>
              <CardBody>
                <p>{dbExample.description}</p>
                <h4 style={{color: 'white', marginTop: '20px', marginBottom: '10px'}}>Veritabanı Sorgu Örneği</h4>
                <pre style={codeStyle}>
                  {dbExample.queryExample}
                </pre>
                
                <div style={{marginTop: '30px', padding: '15px', backgroundColor: `${colors.accent}20`, borderRadius: '8px', borderLeft: `4px solid ${colors.accent}`}}>
                  <h5 style={{color: colors.accent}}>Framework Özellikleri:</h5>
                  {framework === 'spring' && (
                    <ul style={{color: 'rgba(255, 255, 255, 0.9)', paddingLeft: '20px'}}>
                      <li>Repository arayüzü ile otomatik sorgu oluşturma</li>
                      <li>Method isimlendirmesine göre sorgu yapma özelliği</li>
                      <li>Dependency Injection ile kolay erişim</li>
                      <li>Kapsamlı hata yönetimi ve işlem (transaction) desteği</li>
                    </ul>
                  )}
                  {framework === 'dropwizard' && (
                    <ul style={{color: 'rgba(255, 255, 255, 0.9)', paddingLeft: '20px'}}>
                      <li>Hibernate ile nesne-ilişkisel eşleme (ORM)</li>
                      <li>HQL (Hibernate Query Language) desteği</li>
                      <li>Session yönetimi ve bağlantı havuzu</li>
                      <li>JDBI entegrasyonu ile SQL sorguları için alternatif</li>
                    </ul>
                  )}
                  {framework === 'vertx' && (
                    <ul style={{color: 'rgba(255, 255, 255, 0.9)', paddingLeft: '20px'}}>
                      <li>Asenkron sorgular ve geri çağrı (callback) modeli</li>
                      <li>Reaktif veritabanı sürücüleri</li>
                      <li>Event Loop'u bloklamayan yaklaşım</li>
                      <li>JSON tabanlı veri işleme</li>
                    </ul>
                  )}
                  {framework === 'restlet' && (
                    <ul style={{color: 'rgba(255, 255, 255, 0.9)', paddingLeft: '20px'}}>
                      <li>JPA entegrasyonu ile veritabanı erişimi</li>
                      <li>Resource sınıflarından doğrudan veritabanı erişimi</li>
                      <li>Temsil (Representation) tabanlı veri dönüşümleri</li>
                      <li>EntityManager ile JPQL sorguları</li>
                    </ul>
                  )}
                  {framework === 'spark' && (
                    <ul style={{color: 'rgba(255, 255, 255, 0.9)', paddingLeft: '20px'}}>
                      <li>Hafif ve minimalist yaklaşım</li>
                      <li>JPA veya JDBC ile kolay entegrasyon</li>
                      <li>Lambda ifadeleri içinde veritabanı erişimi</li>
                      <li>Esnek veri dönüşüm stratejileri (JSON, XML, vb.)</li>
                    </ul>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EloquentSection; 