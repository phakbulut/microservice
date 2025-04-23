import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { useSelector } from 'react-redux';

// Her framework için özellikler (daha fazla özellik eklendi)
// const frameworkFeatures = {
//   dropwizard: [
//     { title: 'REST API', description: 'Jersey ile hızlı ve standartlara uygun RESTful servisler oluşturur.' },
//     { title: 'Metrics', description: 'Uygulama performansını izlemek ve analiz etmek için metrik toplama sağlar.' },
//     { title: 'Jetty Server', description: 'Gömülü, yüksek performanslı bir HTTP sunucusu ile hızlı dağıtım sunar.' },
//     { title: 'Jackson', description: 'JSON verilerini kolayca serileştirir ve deserileştirir.' },
//     { title: 'Logback', description: 'Esnek ve yapılandırılabilir loglama desteği sunar.' },
//     { title: 'Hibernate Validator', description: 'Giriş verilerini doğrulamak için güçlü bir araç seti sağlar.' },
//     { title: 'Health Checks', description: 'Uygulamanın sağlık durumunu izlemek için hazır araçlar içerir.' }
//   ],
//   vertx: [
//     { title: 'Asenkron', description: 'Non-blocking yapısıyla eşzamanlı işlemleri verimli bir şekilde yönetir.' },
//     { title: 'Polyglot', description: 'Java, Kotlin, JavaScript gibi birden fazla dili destekler.' },
//     { title: 'Event Bus', description: 'Dağıtık sistemlerde bileşenler arası mesajlaşmayı sağlar.' },
//     { title: 'Reaktif', description: 'RxJava ve reaktif akışlarla olay odaklı programlamayı kolaylaştırır.' },
//     { title: 'Verticles', description: 'Modüler ve izole bir şekilde kod birimlerini çalıştırır.' },
//     { title: 'Netty', description: 'Yüksek performanslı ağ işlemleri için Netty altyapısını kullanır.' },
//     { title: 'Clustering', description: 'Dağıtık sistemler için kolay kümeleme desteği sunar.' }
//   ],
//   spring: [
//     { title: 'Spring Ekosistemi', description: 'Geniş bir araç ve kütüphane setiyle entegrasyon sağlar.' },
//     { title: 'Auto Configuration', description: 'Bağımlılıkları otomatik olarak yapılandırarak geliştirme süresini kısaltır.' },
//     { title: 'Dependency Injection', description: 'Bağımlılıkları esnek ve test edilebilir bir şekilde yönetir.' },
//     { title: 'Spring Data', description: 'JPA, MongoDB gibi veritabanlarıyla kolay entegrasyon sunar.' },
//     { title: 'Spring Security', description: 'Güçlü kimlik doğrulama ve yetkilendirme mekanizmaları sağlar.' },
//     { title: 'Actuator', description: 'Uygulama izleme ve yönetim için hazır uç noktalar sunar.' },
//     { title: 'Spring Cloud', description: 'Mikro servis mimarileri için dağıtık sistem araçları içerir.' }
//   ],
//   restlet: [
//     { title: 'REST İlkeleri', description: 'Roy Fielding’in REST prensiplerine tam uyum sağlar.' },
//     { title: 'Taşınabilirlik', description: 'Farklı platformlarda sorunsuz çalışır (örneğin, Android, GAE).' },
//     { title: 'API Odaklı', description: 'Web API’larının hızlı ve etkili bir şekilde geliştirilmesini sağlar.' },
//     { title: 'Hafif Yapı', description: 'Minimum bağımlılıkla düşük kaynak tüketimi sunar.' },
//     { title: 'JAX-RS Desteği', description: 'Standart JAX-RS anotasyonlarıyla uyumlu çalışır.' },
//     { title: 'Client API', description: 'REST istemcileri oluşturmak için güçlü bir API sağlar.' },
//     { title: 'Routing', description: 'Esnek ve yapılandırılabilir URL yönlendirme araçları sunar.' }
//   ],
//   spark: [
//     { title: 'Minimalist', description: 'Basit ve hafif yapısıyla hızlı geliştirme sağlar.' },
//     { title: 'Hızlı Kurulum', description: 'Karmaşık yapılandırmalara gerek kalmadan projeleri başlatır.' },
//     { title: 'Lambda Desteği', description: 'Java 8 lambda ifadeleriyle kısa ve okunabilir kod yazmayı sağlar.' },
//     { title: 'Şablon Motorları', description: 'Mustache, Freemarker gibi motorlarla dinamik içerik üretir.' },
//     { title: 'Static Files', description: 'Statik dosyaları (CSS, JS) kolayca sunar.' },
//     { title: 'WebSocket', description: 'Gerçek zamanlı iletişim için WebSocket desteği sunar.' },
//     { title: 'Before/After Filters', description: 'İstek öncesi ve sonrası işlemleri için filtreleme sağlar.' }
//   ]
// };
const frameworkFeatures = {
  dropwizard: [
    { title: 'REST API', description: 'Jersey ile hızlı ve standartlara uygun RESTful servisler oluşturur.' },
    { title: 'Metrics', description: 'Uygulama performansını izlemek ve analiz etmek için metrik toplama sağlar.' },
    { title: 'Jetty Server', description: 'Gömülü, yüksek performanslı bir HTTP sunucusu ile hızlı dağıtım sunar.' },
    { title: 'Jackson', description: 'JSON verilerini kolayca serileştirir ve deserileştirir.' },
    { title: 'Logback', description: 'Esnek ve yapılandırılabilir loglama desteği sunar.' },
    { title: 'Hibernate Validator', description: 'Giriş verilerini doğrulamak için güçlü bir araç seti sağlar.' },
    { title: 'Health Checks', description: 'Uygulamanın sağlık durumunu izlemek için hazır araçlar içerir.' },
    { title: 'Configuration Management', description: 'YAML tabanlı yapılandırma dosyaları ile uygulama ayarlarını yönetir.' },
    { title: 'Testing Support', description: 'Entegre test desteği ile uygulama bileşenlerini kolayca test etme imkanı sunar.' }
  ],
  vertx: [
    { title: 'Polyglot', description: 'Java, Kotlin, JavaScript gibi birden fazla dili destekler.' },
    { title: 'Event Bus', description: 'Dağıtık sistemlerde bileşenler arası mesajlaşmayı sağlar.' },
    { title: 'Verticles', description: 'Modüler ve izole bir şekilde kod birimlerini çalıştırır.' },
    { title: 'Clustering', description: 'Dağıtık sistemler için kolay kümeleme desteği sunar.' },
    { title: 'Vert.x Web', description: 'HTTP sunucusu ve istemcisi, yönlendirme, şablon motorları ve daha fazlasını sağlar.' },
    { title: 'Vert.x Web Client', description: 'HTTP istemcisi ile asenkron web istekleri yapmayı kolaylaştırır.' },
    { title: 'Vert.x Auth', description: 'Kimlik doğrulama ve yetkilendirme mekanizmaları sunar.' },
    { title: 'Vert.x Config', description: 'Uygulama yapılandırmalarını merkezi bir şekilde yönetmeyi sağlar.' },
    { title: 'Vert.x SQL Client', description: 'Veritabanı işlemleri için asenkron SQL istemcisi sağlar.' },
    { title: 'Vert.x MQTT', description: 'MQTT protokolü ile mesajlaşma desteği sunar.' },
    { title: 'Vert.x Kafka Client', description: 'Apache Kafka ile entegrasyon için istemci sağlar.' },
    { title: 'Vert.x gRPC', description: 'gRPC protokolü ile hizmetler arası iletişim desteği sunar.' }
  ],
  spring: [
    { title: 'Auto Configuration', description: 'Bağımlılıkları otomatik olarak yapılandırarak geliştirme süresini kısaltır.' },
    { title: 'Dependency Injection', description: 'Bağımlılıkları esnek ve test edilebilir bir şekilde yönetir.' },
    { title: 'Spring Data', description: 'JPA, MongoDB gibi veritabanlarıyla kolay entegrasyon sunar.' },
    { title: 'Spring Security', description: 'Güçlü kimlik doğrulama ve yetkilendirme mekanizmaları sağlar.' },
    { title: 'Actuator', description: 'Uygulama izleme ve yönetim için hazır uç noktalar sunar.' },
    { title: 'Spring Cloud', description: 'Mikro servis mimarileri için dağıtık sistem araçları içerir.' },
    { title: 'Spring Batch', description: 'Toplu veri işleme ve yönetimi için kapsamlı araçlar sunar.' },
    { title: 'Spring WebFlux', description: 'Reaktif programlama desteği ile yüksek performanslı web uygulamaları geliştirmeyi sağlar.' },
    { title: 'Spring Kafka', description: 'Apache Kafka ile entegrasyon için destek sağlar.' },
    { title: 'Spring Integration', description: 'Kurumsal entegrasyon desenlerini uygulamak için araçlar sunar.' },
    { title: 'Spring HATEOAS', description: 'RESTful hizmetlerde HATEOAS prensiplerini uygulamayı kolaylaştırır.' },
    { title: 'Spring DevTools', description: 'Geliştirme sürecini hızlandırmak için otomatik yeniden başlatma ve canlı yeniden yükleme özellikleri sunar.' }
  ],
  restlet: [
    { title: 'Taşınabilirlik', description: 'Farklı platformlarda sorunsuz çalışır (örneğin, Android, GAE).' },
    { title: 'API Odaklı', description: 'Web API’larının hızlı ve etkili bir şekilde geliştirilmesini sağlar.' },
    { title: 'Hafif Yapı', description: 'Minimum bağımlılıkla düşük kaynak tüketimi sunar.' },
    { title: 'JAX-RS Desteği', description: 'Standart JAX-RS anotasyonlarıyla uyumlu çalışır.' },
    { title: 'Client API', description: 'REST istemcileri oluşturmak için güçlü bir API sağlar.' },
    { title: 'Routing', description: 'Esnek ve yapılandırılabilir URL yönlendirme araçları sunar.' },
    { title: 'Restlet Security', description: 'Kimlik doğrulama ve yetkilendirme mekanizmaları sağlar.' },
    { title: 'Restlet Extensions', description: 'JSON, XML, Atom, RSS gibi formatlar için destek sunar.' },
    { title: 'Restlet Cloud', description: 'Bulut tabanlı dağıtım ve yönetim araçları sağlar.' }
  ],
  spark: [
    { title: 'Minimalist', description: 'Basit ve hafif yapısıyla hızlı geliştirme sağlar.' },
    { title: 'Embedded Jetty', description: 'Yerleşik Jetty sunucusu sayesinde harici yapılandırmaya ihtiyaç duymaz.' },
    { title: 'Java 8 Lambda Desteği', description: 'Fonksiyonel programlama tarzıyla uyumlu, okunabilir kod yazımı sağlar.' },
    { title: 'Route Management', description: 'Kolay ve sade yönlendirme sistemi ile REST uç noktaları tanımlanabilir.' },
    { title: 'Templating Engine Desteği', description: 'Thymeleaf, FreeMarker, Mustache gibi şablon motorlarıyla entegrasyon sunar.' },
    { title: 'JSON Desteği', description: 'Gson veya Jackson ile kolay JSON seri/deserileştirme sağlar.' },
    { title: 'Static File Serving', description: 'Statik dosyaları (HTML, JS, CSS) kolayca servis edebilir.' },
    { title: 'Testing Friendly', description: 'JUnit ile kolay entegre olabilir, test yazımını destekler.' },
    { title: 'Lightweight REST API', description: 'Mikro servisler için düşük bellek ve işlem gücü tüketimi ile idealdir.' }
  ]
}  
 

const FeaturesSection = ({ framework }) => {
  const features = frameworkFeatures[framework.toLowerCase()] || [];
  const colors = useSelector(state => state.colors) || {
    accent: '#FF007A',
  };

  // Özellik numarası için stil
  const featureNumberStyle = {
    backgroundColor: colors.accent,
    color: 'white',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    marginRight: '10px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textShadow: '0 0 3px rgba(0,0,0,0.5)',
    boxShadow: `0 0 8px ${colors.accent}80`
  };

  // Kart başlığı için stil
  const cardTitleStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontWeight: '500'
  };

  // Açıklama metni için stil
  const descriptionStyle = {
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontSize: '0.9rem'
  };

  return (
    <section className="section" id="features-section">
      <Container>
        <h2 className="text-center mb-5">Varsayılan Özellikler ve Eklentiler</h2>
        
        <Row>
          {features.map((feature, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="h-100 feature-card">
                <CardBody>
                  <CardTitle tag="h5" style={cardTitleStyle}>
                    <span style={featureNumberStyle}>{index + 1}</span>
                    {feature.title}
                  </CardTitle>
                  <p style={descriptionStyle}>{feature.description}</p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;