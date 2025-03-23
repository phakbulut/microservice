import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';

// Framework'lerin performans verileri
const performanceData = {
  dropwizard: {
    resourceUsage: "Orta-Yüksek",
    requestPerSecond: "İyi",
    bootTime: "Orta",
    highTrafficSuitability: "İyi",
    memoryFootprint: "Orta",
    notes: "Dropwizard orta seviyede kaynak tüketimi olan, yüksek trafikli ortamlarda iyi performans gösterebilen dengeli bir framework'tür. JVM tam olarak ısındıktan sonra performans artışı gösterir.",
    strengths: ["Jersey ve Jetty ile hızlı REST API'ler", "Metrics kütüphanesi ile performans izleme", "Çoklu iş parçacığı desteği"],
    weaknesses: ["İlk başlatma süresi uzundur", "Spring Boot'a göre daha fazla bellek kullanımı", "Büyük projelerde derleme süresi artabilir"]
  },
  
  vertx: {
    resourceUsage: "Düşük",
    requestPerSecond: "Çok Yüksek",
    bootTime: "Hızlı",
    highTrafficSuitability: "Mükemmel",
    memoryFootprint: "Düşük",
    notes: "Vert.x, reaktif ve non-blocking mimarisi sayesinde minimum kaynak tüketimiyle maksimum performans sağlar. Yüksek trafik altında bile son derece verimlidir ve mikroservisler için idealdir.",
    strengths: ["Asenkron olay döngüsü modeli", "Düşük bellek ayak izi", "Yüksek eşzamanlılık kapasitesi"],
    weaknesses: ["Reaktif paradigmaya alışma zorluğu", "Callback hell riski", "Hata ayıklama karmaşıklığı"]
  },
  
  spring: {
    resourceUsage: "Yüksek",
    requestPerSecond: "Orta-İyi",
    bootTime: "Yavaş",
    highTrafficSuitability: "İyi",
    memoryFootprint: "Yüksek",
    notes: "Spring Boot, zengin özellik seti nedeniyle daha fazla sistem kaynağı tüketmesine rağmen, iyi optimize edilmiş ve ölçeklenebilir uygulamalar üretir. Spring WebFlux ile reaktif programlama desteği sayesinde performans artırılabilir.",
    strengths: ["Kapsamlı önbellek desteği", "WebFlux ile reaktif seçenek", "Ölçeklenebilir mimarisi"],
    weaknesses: ["Yüksek bellek tüketimi", "Uzun başlatma süresi", "Çok sayıda arka plan işlemi"]
  },
  
  restlet: {
    resourceUsage: "Orta",
    requestPerSecond: "Orta",
    bootTime: "Orta",
    highTrafficSuitability: "Orta",
    memoryFootprint: "Orta",
    notes: "Restlet, orta seviye bir performansa sahiptir. Basit projelerde hızlı çalışır, ancak yüksek trafik altında diğer modern framework'lere göre daha az verimlidir.",
    strengths: ["Basit API'ler için hafif yapı", "Esnek URI yönlendirme", "Düşük-orta bellek kullanımı"],
    weaknesses: ["Modern optimizasyon eksikliği", "Yüksek trafik durumlarında performans düşüşü", "Asenkron işleme kapasitesi sınırlı"]
  },
  
  spark: {
    resourceUsage: "Çok Düşük",
    requestPerSecond: "Yüksek",
    bootTime: "Çok Hızlı",
    highTrafficSuitability: "Orta-İyi",
    memoryFootprint: "Çok Düşük",
    notes: "Spark Java, minimalist yapısı sayesinde çok düşük sistem kaynak tüketimi sunar ve başlangıç süresi oldukça hızlıdır. Orta ölçekli trafik için mükemmel performans gösterir, ancak çok karmaşık uygulamalarda ek kütüphaneler gerekebilir.",
    strengths: ["Ultra hafif yapı", "Çok hızlı başlangıç süresi", "Minimal bellek kullanımı"],
    weaknesses: ["Karmaşık işlemlerde yetersiz kalabilir", "Ek kütüphane gereksinimleri", "Büyük projelerde kod organizasyonu zorluğu"]
  }
};

// Değerlendirme için renk sınıfları
const getColorClass = (value) => {
  if (value === "Düşük" || value === "Çok Düşük" || value === "Hızlı" || value === "Çok Hızlı") 
    return "metric-value-good";
  if (value === "Orta" || value === "Orta-İyi" || value === "Orta-Yüksek") 
    return "metric-value-medium";
  return "metric-value-bad";
};

// Ters metrikler (yüksek = iyi) için renk sınıfları
const getInverseColorClass = (value) => {
  if (value === "Yüksek" || value === "Çok Yüksek" || value === "Mükemmel" || value === "İyi") 
    return "metric-value-good";
  if (value === "Orta" || value === "Orta-İyi" || value === "Orta-Yüksek") 
    return "metric-value-medium";
  return "metric-value-bad";
};

const getPerformanceRating = (requestValue) => {
  if (requestValue === "Çok Yüksek") return { icon: '🚀', text: 'Üstün Performans', desc: 'Çok yüksek trafikli uygulamalar için idealdir.' };
  if (requestValue === "Yüksek") return { icon: '⚡', text: 'Yüksek Performans', desc: 'Yüksek trafikli uygulamalar için uygundur.' };
  if (requestValue === "Orta" || requestValue === "Orta-İyi") return { icon: '⚙️', text: 'Orta Performans', desc: 'Orta seviye trafikli uygulamalar için yeterlidir.' };
  return { icon: '🐢', text: 'Düşük Performans', desc: 'Düşük trafikli uygulamalar için uygundur.' };
};

const PerformanceSection = ({ framework }) => {
  const colors = useSelector(state => state.colors);
  
  // Varsayılan olarak Spring'i kullan veya framework parametresine göre veriyi seç
  const data = performanceData[framework.toLowerCase()] || performanceData.spring;
  
  // Performans derecesi hesaplama
  const performanceRating = getPerformanceRating(data.requestPerSecond);
  
  return (
    <section className="section content-section performance-section" id="performance-section">
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
          <span className="gradient-text">Performans Analizi</span>
        </h2>
        
        <p className="intro-text">
          {framework} framework'ünün genel performans özellikleri, sistem kaynak kullanımı ve trafik altında davranışı hakkında bilgiler aşağıda verilmiştir.
        </p>
        
        <Row className="mb-4">
          <Col lg={6}>
            <Card className="performance-metrics-card">
              <CardBody>
                <h3 className="performance-card-title">Sistem Kaynak Kullanımı</h3>
                
                <div className="metric-item">
                  <div className="metric-header">
                    <div className="metric-name">
                      <i className="fas fa-microchip metric-icon"></i>
                      <span className="metric-label">CPU & Bellek Kullanımı</span>
                    </div>
                    <div className={`metric-badge ${getColorClass(data.resourceUsage)}`}>
                      {data.resourceUsage}
                    </div>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-header">
                    <div className="metric-name">
                      <i className="fas fa-clock metric-icon"></i>
                      <span className="metric-label">Başlangıç Süresi</span>
                    </div>
                    <div className={`metric-badge ${getColorClass(data.bootTime)}`}>
                      {data.bootTime}
                    </div>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-header">
                    <div className="metric-name">
                      <i className="fas fa-memory metric-icon"></i>
                      <span className="metric-label">Bellek Ayak İzi</span>
                    </div>
                    <div className={`metric-badge ${getColorClass(data.memoryFootprint)}`}>
                      {data.memoryFootprint}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          
          <Col lg={6}>
            <Card className="performance-metrics-card">
              <CardBody>
                <h3 className="performance-card-title">Trafik Performansı</h3>
                
                <div className="metric-item">
                  <div className="metric-header">
                    <div className="metric-name">
                      <i className="fas fa-tachometer-alt metric-icon"></i>
                      <span className="metric-label">Saniyedeki İstek Kapasitesi</span>
                    </div>
                    <div className={`metric-badge ${getInverseColorClass(data.requestPerSecond)}`}>
                      {data.requestPerSecond}
                    </div>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-header">
                    <div className="metric-name">
                      <i className="fas fa-server metric-icon"></i>
                      <span className="metric-label">Yüksek Trafik Uygunluğu</span>
                    </div>
                    <div className={`metric-badge ${getInverseColorClass(data.highTrafficSuitability)}`}>
                      {data.highTrafficSuitability}
                    </div>
                  </div>
                </div>
                
                <div className="metric-item performance-result">
                  <div className="performance-rating">
                    <div className="rating-icon">
                      {performanceRating.icon}
                    </div>
                    <div className="rating-text">
                      <h4>{performanceRating.text}</h4>
                      <p className="rating-description">{performanceRating.desc}</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col md={12}>
            <Card className="performance-notes-card">
              <CardBody>
                <h3 className="performance-card-title">Performans Değerlendirmesi</h3>
                <p className="performance-notes">{data.notes}</p>
                
                <Row className="mt-4">
                  <Col md={6}>
                    <h4 className="performance-subtitle">
                      <span className="performance-icon good">✓</span> Güçlü Yönler
                    </h4>
                    <ul className="performance-list">
                      {data.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </Col>
                  
                  <Col md={6}>
                    <h4 className="performance-subtitle">
                      <span className="performance-icon bad">✗</span> Zayıf Yönler
                    </h4>
                    <ul className="performance-list">
                      {data.weaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PerformanceSection; 