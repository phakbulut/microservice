import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useSelector } from 'react-redux';

// Senaryoların tanımları
const scenariosData = {
  dropwizard: {
    bestFor: [
      { title: "Büyük kurumsal projeler", description: "JVM ekosisteminin kurumsal çözümlerinden faydalanmak isteyen büyük ölçekli projeler." },
      { title: "Güvenlik odaklı uygulamalar", description: "Güvenli ve sağlam kimlik doğrulama mekanizması gerektiren projeler." },
      { title: "Operasyon izleme odaklı projeler", description: "Kapsamlı ölçüm ve izleme (metrics) desteği sayesinde kritik izleme gerektiren sistemler." }
    ],
    notRecommendedFor: [
      { title: "Çok hızlı başlangıç gerektiren sistemler", description: "Yüksek startup süresi nedeniyle hızlı başlatma gerektiren serverless çözümler için uygun değil." },
      { title: "Minimum kaynak kullanımı gerektiren mikro servisler", description: "Dropwizard, JVM'in yükü nedeniyle çok hafif mikro servisler için ideal değil." },
      { title: "İleri düzey reaktif programlama", description: "Non-blocking reaktif API'leri odak noktasına alan sistemler için daha iyi alternatifler var." }
    ],
    useCases: [
      { title: "Finans sektörü API'leri", description: "Güvenilir kimlik doğrulama, yetkilendirme ve izleme gerektiren finansal API'ler" },
      { title: "Büyük ölçekli e-ticaret platformları", description: "Büyük veri hacimlerini işleyebilen ve stabil çalışan e-ticaret sistemleri" },
      { title: "Kurumsal veri yönetim sistemleri", description: "Yüksek güvenilirlik gerektiren veri yönetim ve ETL sistemleri" }
    ]
  },
  
  vertx: {
    bestFor: [
      { title: "Yüksek eşzamanlılık gerektiren projeler", description: "Binlerce eşzamanlı bağlantıyı verimli şekilde yönetmesi gereken sistemler." },
      { title: "Reaktif mikroservisler", description: "Hızlı, hafif, non-blocking reaktif mikroservis mimarileri." },
      { title: "Gerçek zamanlı veri işleme", description: "WebSocket, SSE ve diğer gerçek zamanlı iletişim protokollerini kullanan uygulamalar." }
    ],
    notRecommendedFor: [
      { title: "Hızlı geliştirme gerektiren küçük projeler", description: "Öğrenme eğrisi ve reaktif paradigma, basit projeler için fazla gelebilir." },
      { title: "Yoğun CPU işlemleri yapan uygulamalar", description: "CPU-bound işlemler için non-blocking model avantaj sağlamaz." },
      { title: "Convention-over-configuration isteyenler", description: "Spring gibi gelişmiş otomatik yapılandırma ve DI çözümleri arayanlar için uygun değil." }
    ],
    useCases: [
      { title: "IoT gateway servisleri", description: "Binlerce IoT cihazından gelen verileri gerçek zamanlı işleyen gateway'ler" },
      { title: "Online oyun sunucuları", description: "Düşük gecikme süresi ve yüksek eşzamanlılık gerektiren oyun sunucu sistemleri" },
      { title: "Gerçek zamanlı analitik platformları", description: "Canlı veri akışı işleyen ve anında analiz gerçekleştiren sistemler" }
    ]
  },
  
  spring: {
    bestFor: [
      { title: "Geniş kapsamlı kurumsal projeler", description: "Spring ekosisteminin zengin çözümlerini kullanmak isteyen kapsamlı projeler." },
      { title: "Hızlı geliştirme odaklı projeler", description: "Spring Boot ile minimum yapılandırma gerektiren ve hızlı geliştirilmesi gereken sistemler." },
      { title: "Bağımlılık enjeksiyonu ve AOP gerektiren projeler", description: "Temiz modüler mimari için güçlü DI ve aspect-oriented programming ihtiyacı olan sistemler." }
    ],
    notRecommendedFor: [
      { title: "Ultra hafif mikroservisler", description: "Yüksek bellek ihtiyacı ve başlangıç süresi, çok küçük servisler için dezavantaj olabilir." },
      { title: "Kaynak kısıtlı ortamlar", description: "Sınırlı kaynakları olan sistemlerde (IoT, edge computing) bellek tüketimi yüksek olabilir." },
      { title: "Çok basit projeler", description: "Basit REST servisleri için Spring çerçevesi fazla karmaşık gelebilir." }
    ],
    useCases: [
      { title: "Kurumsal web uygulamaları", description: "Büyük ölçekli, güvenlik gerektiren ve modüler kurumsal web uygulamaları" },
      { title: "Mikro servis ekosistemi", description: "Spring Cloud ile kolay yönetilebilen ve ölçeklenebilen mikro servis sistemleri" },
      { title: "Batch işleme sistemleri", description: "Spring Batch ile karmaşık ETL ve veri işleme uygulamaları" }
    ]
  },
  
  restlet: {
    bestFor: [
      { title: "REST API geliştirme odaklı projeler", description: "RESTful web servisleri geliştirmek için özel tasarlanmış projeler." },
      { title: "Çok platformlu uygulamalar", description: "Aynı kodu hem sunucu hem istemci tarafında kullanmak isteyen projeler." },
      { title: "REST konseptine sıkı bağlı sistemler", description: "REST standartlarına sıkı sıkıya uymak isteyen projeler." }
    ],
    notRecommendedFor: [
      { title: "Modern async gereksinimli projeler", description: "Reactive programming gerektiren modern async servisler için uygun değil." },
      { title: "Performans kritik uygulamalar", description: "Diğer modern frameworklere göre performansı daha düşük olabilir." },
      { title: "Active community arayan projeler", description: "Topluluğu diğer büyük frameworkler kadar aktif değil." }
    ],
    useCases: [
      { title: "Eğitim ve akademik projeler", description: "REST prensiplerini öğrenmek ve uygulamak için ideal öğrenme platformu" },
      { title: "RESTful istemci-sunucu uygulamaları", description: "Hem sunucu hem de istemci tarafında tutarlı REST API çözümleri" },
      { title: "Hafif REST dokümantasyon sistemleri", description: "API dokümantasyonuna önem veren REST servisleri" }
    ]
  },
  
  spark: {
    bestFor: [
      { title: "Minimal, hafif mikroservisler", description: "Çok düşük bellek ayak izi gerektiren, son derece hafif servisler." },
      { title: "Hızlı prototipleme", description: "Minimum kodla hızlıca çalışan bir API prototipi oluşturmak isteyenler." },
      { title: "Öğrenim ve eğitim", description: "Web uygulama geliştirmeyi öğrenenler için basit ve anlaşılır sözdizimi." }
    ],
    notRecommendedFor: [
      { title: "Büyük ölçekli kurumsal projeler", description: "Büyük ve karmaşık uygulamalar için gerekli kapsamlı özelliklerden yoksun." },
      { title: "İleri düzey DI ve AOP gerektiren projeler", description: "Spring gibi gelişmiş bağımlılık enjeksiyonu çözümleri yok." },
      { title: "Ölçeklenebilir mikroservis ekosistemi", description: "Mikroservis orkestrasyon ve discovery özellikleri yetersiz." }
    ],
    useCases: [
      { title: "Tek sayfalık web uygulamaları için backend", description: "JavaScript frontend'ler için minimalist API backend'leri" },
      { title: "IoT veri toplama servisleri", description: "Sınırlı kaynaklara sahip ortamlarda çalışabilecek hafif veri toplama servisleri" },
      { title: "MVP (Minimum Viable Product) geliştirme", description: "Hızlıca piyasaya sürülmesi gereken minimum uygulanabilir ürünler" }
    ]
  }
};

// UseCase Component
const UseCase = ({ icon, title, description }) => (
  <div className="use-case-item">
    <div className="use-case-icon">{icon}</div>
    <div className="use-case-content">
      <h5 className="use-case-title">{title}</h5>
      <p className="use-case-description">{description}</p>
    </div>
  </div>
);

// Main Component
const ScenariosSection = ({ framework = 'spring' }) => {
  const colors = useSelector(state => state.colors);
  const [activeTab, setActiveTab] = useState('bestFor');
  
  const frameworkLower = framework.toLowerCase();
  const data = scenariosData[frameworkLower] || scenariosData.spring;
  
  return (
    <section className="section content-section scenarios-section" id="scenarios-section">
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
          <span className="gradient-text">Kullanım Senaryoları</span>
        </h2>
        
        <p className="intro-text">
          {framework} framework'ünün en iyi uyum sağladığı senaryolar, tavsiye edilmeyen durumlar ve gerçek hayat kullanım örnekleri hakkında bilgiler aşağıda verilmiştir.
        </p>
        
        <div className="scenarios-tabs">
          <Button 
            color="outline-light" 
            className={`scenario-tab ${activeTab === 'bestFor' ? 'active' : ''}`}
            onClick={() => setActiveTab('bestFor')}
          >
            <i className="fas fa-check-circle scenario-tab-icon"></i> En Uygun Olduğu Durumlar
          </Button>
          <Button 
            color="outline-light" 
            className={`scenario-tab ${activeTab === 'notRecommendedFor' ? 'active' : ''}`}
            onClick={() => setActiveTab('notRecommendedFor')}
          >
            <i className="fas fa-times-circle scenario-tab-icon"></i> Tavsiye Edilmeyen Durumlar
          </Button>
          <Button 
            color="outline-light" 
            className={`scenario-tab ${activeTab === 'useCases' ? 'active' : ''}`}
            onClick={() => setActiveTab('useCases')}
          >
            <i className="fas fa-project-diagram scenario-tab-icon"></i> Gerçek Hayat Kullanımları
          </Button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'bestFor' && (
            <Row>
              {data.bestFor.map((item, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="scenario-card best-for-card">
                    <CardBody>
                      <UseCase 
                        icon={<i className="fas fa-thumbs-up"></i>} 
                        title={item.title} 
                        description={item.description} 
                      />
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          
          {activeTab === 'notRecommendedFor' && (
            <Row>
              {data.notRecommendedFor.map((item, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="scenario-card not-recommended-card">
                    <CardBody>
                      <UseCase 
                        icon={<i className="fas fa-thumbs-down"></i>} 
                        title={item.title} 
                        description={item.description} 
                      />
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          
          {activeTab === 'useCases' && (
            <Row>
              {data.useCases.map((item, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="scenario-card use-case-card">
                    <CardBody>
                      <UseCase 
                        icon={<i className="fas fa-lightbulb"></i>} 
                        title={item.title} 
                        description={item.description} 
                      />
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        <div className="framework-decision-helper mt-5">
          <Card className="decision-card">
            <CardBody>
              <h3 className="decision-title">Framework Seçim Rehberi</h3>
              <p className="decision-description">
                Java tabanlı REST API framework'ü seçerken dikkat etmeniz gereken kriterler:
              </p>
              <ListGroup className="decision-list">
                <ListGroupItem className="decision-item">
                  <span className="decision-bullet">▶</span>
                  <strong>Proje boyutu ve karmaşıklığı:</strong> Büyük ve karmaşık projeler için Spring, kurumsal odaklı projeler için Dropwizard, basit ve hızlı çözümler için Spark
                </ListGroupItem>
                <ListGroupItem className="decision-item">
                  <span className="decision-bullet">▶</span>
                  <strong>Performans gereksinimleri:</strong> Yüksek eşzamanlı bağlantılar için Vert.x, genel performans için Spring veya Dropwizard
                </ListGroupItem>
                <ListGroupItem className="decision-item">
                  <span className="decision-bullet">▶</span>
                  <strong>Kaynak kullanımı:</strong> Minimum bellek kullanımı için Spark, reaktif mikroservisler için Vert.x
                </ListGroupItem>
                <ListGroupItem className="decision-item">
                  <span className="decision-bullet">▶</span>
                  <strong>Ekosistem ve topluluk:</strong> En geniş ekosistem ve destek için Spring, aktif gelişim için Vert.x ve Dropwizard
                </ListGroupItem>
                <ListGroupItem className="decision-item">
                  <span className="decision-bullet">▶</span>
                  <strong>Geliştirme hızı:</strong> Hızlı prototipleme için Spark veya Spring Boot, esnek REST yapısı için Restlet
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default ScenariosSection; 