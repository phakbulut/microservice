import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';

// Framework tarihçe bilgileri (Vert.x için kısa açıklama ve SVG şema eklendi)
const frameworkHistories = {
  dropwizard: {
    title: 'Dropwizard Tarihçesi',
    creator: 'Yammer',
    year: '2011',
    description: 'Dropwizard, Yammer tarafından kendi mikro servis mimarilerini hızlı ve etkili bir şekilde oluşturmak amacıyla geliştirildi. RESTful servislerin operasyonel gereksinimlerini karşılamak için tasarlanan bu framework, Jersey, Jetty ve Jackson gibi kütüphaneleri bir araya getirerek güçlü bir temel sundu. Yammer’ın iç ihtiyaçlarından doğan proje, kısa sürede açık kaynak topluluğunda popülerlik kazandı ve mikro servis trendinin öncülerinden biri haline geldi.',
    milestones: [
      '2011 - İlk versiyon yayınlandı: Yammer’ın iç projelerinden açık kaynağa geçiş yaptı ve REST odaklı mikro servisler için bir standart oluşturdu.',
      '2013 - Version 0.7.0 ile büyük güncellemeler: Metrics kütüphanesi daha derin entegrasyonla performans izlemeyi güçlendirdi, bu da operasyonel kolaylık sağladı.',
      '2016 - Dropwizard 1.0.0 sürümü: İlk kararlı sürüm, topluluğun güvenini artırdı ve daha geniş bir kullanıcı kitlesine ulaştı.',
      '2018 - 2.0.0 sürümü ile Java 8 desteği: Modern Java özellikleriyle uyumluluk sağlandı ve performans optimizasyonları yapıldı.',
      '2020 - Modern Java özellikleriyle güncellendi: Java 11 ve modüler yapı desteğiyle framework, güncel teknolojilere ayak uydurdu.'
    ],
    milestoneImportance: 'Dropwizard’ün dönüm noktaları, mikro servis mimarisindeki operasyonel ihtiyaçlara odaklanarak framework’ün hem performansını hem de kullanılabilirliğini artırdı. Her sürüm, topluluğun geri bildirimleriyle şekillenerek pratik çözümler sundu.'
  },
  vertx: {
    title: 'Vert.x Tarihçesi',
    creator: 'Tim Fox',
    year: '2011',
    description: 'Vert.x, Tim Fox tarafından Node.js’e alternatif bir JVM tabanlı platform olarak geliştirildi. Asenkron ve non-blocking yapısıyla dikkat çeken bu araç seti, yüksek eşzamanlılık gerektiren uygulamalar için tasarlandı. Eclipse Vakfı tarafından sahiplenilen proje, reaktif programlama ile öne çıktı.\n\n' +
      '**Reaktif Programlama:** Olay odaklı ve asenkron bir yaklaşım sunar. Vert.x, olay döngüsü (event loop) ile kaynakları verimli kullanır ve yüksek yükte düşük gecikme sağlar.',
    milestones: [
      '2011 - Proje başlangıcı: JVM üzerinde asenkron bir alternatif olarak doğdu ve performans odaklı bir vizyon sundu.',
      '2013 - Eclipse Vakfı projesi oldu: Daha geniş bir topluluk ve kurumsal destek kazandı, bu da güvenilirliğini artırdı.',
      '2015 - Vert.x 3 ile tamamen yeniden yazıldı: Reaktif programlama paradigmalarına tam geçiş yaparak modern uygulamalar için temel oluşturdu.',
      '2017 - Reaktif programlama desteği güçlendirildi: RxJava entegrasyonuyla geliştiricilere daha esnek bir API sunuldu.',
      '2020 - Vert.x 4.0 ile yeni özellikler: Kotlin ve GraalVM desteği eklenerek dil çeşitliliği ve native performans sağlandı.'
    ],
    milestoneImportance: 'Vert.x’in dönüm noktaları, reaktif programlamanın benimsenmesini hızlandırdı ve yüksek performanslı sistemler için bir standart oluşturdu. Her güncelleme, framework’ün esnekliğini ve modern teknolojilere uyumunu artırdı.'
  },
  spring: {
    title: 'Spring Boot Tarihçesi',
    creator: 'Pivotal Software',
    year: '2014',
    description: 'Spring Boot, Spring Framework’ün karmaşık konfigürasyonlarını basitleştirme hedefiyle Pivotal Software tarafından geliştirildi. 2002’de başlayan Spring ekosisteminin bir uzantısı olarak, “convention over configuration” prensibiyle hızlı geliştirme ve dağıtım süreçlerini mümkün kıldı. Kurumsal dünyada yaygın olarak kullanılan Spring Boot, mikro servis mimarilerinin de temel taşlarından biri haline geldi.',
    milestones: [
      '2014 - İlk sürüm yayınlandı: Otomatik yapılandırma ve gömülü sunucu ile Spring’in erişilebilirliğini artırdı.',
      '2015 - Spring Cloud ve mikroservis desteği: Dağıtık sistemler için kapsamlı araçlar sunarak bulut tabanlı uygulamaları güçlendirdi.',
      '2018 - Spring Boot 2.0 ve reaktif programlama: WebFlux ile reaktif paradigmaya geçiş yaparak performansı optimize etti.',
      '2019 - Native image ve GraalVM entegrasyonu: Başlatma süresini kısaltarak bulut ortamlarında verimliliği artırdı.',
      '2021 - Spring Native ve Kubernetes desteği: Doğrudan native derleme ve container entegrasyonuyla modern deployment süreçlerini destekledi.'
    ],
    milestoneImportance: 'Spring Boot’un dönüm noktaları, kurumsal geliştirme süreçlerini hızlandırdı ve framework’ü hem geleneksel hem de modern uygulamalar için vazgeçilmez kıldı. Her adım, geniş ekosistemi daha erişilebilir ve güçlü hale getirdi.'
  },
  restlet: {
    title: 'Restlet Tarihçesi',
    creator: 'Jérôme Louvel',
    year: '2005',
    description: 'Restlet, REST mimarisini Java’da uygulamak amacıyla Jérôme Louvel tarafından geliştirildi. Roy Fielding’in REST prensiplerine sadık kalarak, web API’larının oluşturulmasını kolaylaştırmayı hedefledi. İlk olarak bireysel bir çaba olarak başlayan proje, zamanla niş bir topluluk tarafından benimsendi ancak büyük ölçekli framework’lere karşı sınırlı bir popülarite elde etti. 2020 yılından sonra yeni sürüm yayınlanmıyor.',
    milestones: [
      '2005 - Proje başlangıcı: REST odaklı ilk Java framework’lerinden biri olarak dikkat çekti.',
      '2009 - İlk kararlı sürüm: Küçük ölçekli projeler için güvenilir bir seçenek haline geldi.',
      '2013 - Cloud platformu ve API yönetimi: Bulut entegrasyonuyla modern ihtiyaçlara yanıt vermeye çalıştı.',
      '2016 - Restlet Framework 2.3.0 sürümü: Performans ve uyumluluk güncellemeleri yapıldı.',
      '2018 - Talend tarafından satın alındı: Kurumsal bir çatı altında gelişimi devam etti.'
    ],
    milestoneImportance: 'Restlet’in dönüm noktaları, REST prensiplerini uygulamaya yönelik sadeliği korurken, framework’ün sınırlı kapsamını genişletme çabasını yansıttı. Ancak rekabet karşısında niş bir konumda kaldı.'
  },
  spark: {
    title: 'Spark Framework Tarihçesi',
    creator: 'Per Wendel',
    year: '2011',
    description: 'Spark Framework, Ruby’nin Sinatra framework’ünden ilham alınarak Per Wendel tarafından geliştirildi. Hızlı ve minimalist bir web framework’ü olarak tasarlanan Spark, özellikle prototip geliştirme ve küçük ölçekli projeler için tercih edildi. Basit sözdizimi ve düşük öğrenme eşiği ile dikkat çekti.',
    milestones: [
      '2011 - Proje başlangıcı: Sinatra benzeri bir yaklaşımla Java’da hızlı geliştirme sundu.',
      '2014 - İlk kararlı sürüm: Küçük ölçekli projeler için stabil bir seçenek haline geldi.',
      '2015 - Lambda ifadeleri ve Java 8 desteği: Modern Java özellikleriyle uyumluluk sağlandı.',
      '2016 - WebSocket desteği eklendi: Gerçek zamanlı uygulamalara yönelik yetenekleri artırdı.',
      '2018 - Spark 2.8.0 ile güncel özellikler: Performans ve güvenlik güncellemeleri yapıldı.'
    ],
    milestoneImportance: 'Spark’ın dönüm noktaları, basitlik ve hız odaklı bir framework olarak konumunu güçlendirdi. Her güncelleme, geliştiricilere minimal bir çabayla daha fazla işlevsellik sundu.'
  }
};

const HistorySection = ({ framework }) => {
  const history = frameworkHistories[framework.toLowerCase()];
  const colors = useSelector(state => state.colors) || {
    cardBg: 'rgba(255, 255, 255, 0.1)',
    border: '#FF007A',
    primary: '#00FFEA',
    accent: '#FF007A'
  };

  if (!history) {
    return <div>Tarihçe bilgisi bulunamadı</div>;
  }

  // Stillerimizi tanımlayalım (mevcut CSS ile uyumlu)
  const titleStyle = {
    color: 'white',
    marginBottom: '1.5rem',
    textAlign: 'center'
  };

  const cardStyle = {
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    boxShadow: `0 5px 15px ${colors.primary}30`
  };

  const cardTitleStyle = {
    color: 'white',
    borderBottom: `1px solid ${colors.accent}40`,
    paddingBottom: '10px',
    marginBottom: '15px'
  };

  const textStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    lineHeight: '1.6'
  };

  const timelineStyle = {
    color: 'white'
  };

  const timelineMarkerStyle = {
    borderColor: colors.accent,
    boxShadow: `0 0 10px ${colors.accent}80`
  };

  const timelineContentStyle = {
    backgroundColor: `${colors.accent}20`,
    borderLeft: `2px solid ${colors.accent}`
  };

  // SVG şema stil
  const schemaStyle = {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: `${colors.primary}10`,
    border: `1px solid ${colors.primary}50`,
    borderRadius: '5px',
  };

  return (
    <section className="section content-section" id="history-section">
      <Container>
        <h2 style={titleStyle}>{history.title}</h2>

        <Row>
          <Col md={6}>
            <Card className="mb-4" style={cardStyle}>
              <CardBody>
                <h3 style={cardTitleStyle}>{history.creator} tarafından {history.year} yılında</h3>
                <p className="mt-3" style={textStyle}>
                  {history.description.split('\n\n').map((paragraph, index) => (
                    <React.Fragment key={index}>
                      {paragraph}
                      <br /><br />
                    </React.Fragment>
                  ))}
                </p>
                {framework.toLowerCase() === 'vertx' && (
                  <svg width="100%" height="100" style={schemaStyle}>
                    <line x1="50" y1="50" x2="150" y2="50" stroke={colors.accent} strokeWidth="2" />
                    <line x1="150" y1="50" x2="250" y2="50" stroke={colors.accent} strokeWidth="2" />
                    <line x1="250" y1="50" x2="350" y2="50" stroke={colors.accent} strokeWidth="2" />
                    <text x="10" y="45" fill={colors.primary} fontSize="12">İstek</text>
                    <text x="160" y="45" fill={colors.primary} fontSize="12">Olay Döngüsü</text>
                    <text x="260" y="45" fill={colors.primary} fontSize="12">İşleyici</text>
                    <text x="360" y="45" fill={colors.primary} fontSize="12">Yanıt</text>
                    <path d="M145 45 L150 50 L145 55" fill="none" stroke={colors.accent} strokeWidth="2" />
                    <path d="M245 45 L250 50 L245 55" fill="none" stroke={colors.accent} strokeWidth="2" />
                    <path d="M345 45 L350 50 L345 55" fill="none" stroke={colors.accent} strokeWidth="2" />
                  </svg>
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md={6}>
            <Card style={cardStyle}>
              <CardBody>
                <h3 style={cardTitleStyle}>Önemli Dönüm Noktaları</h3>
                <p style={textStyle}>
                  {history.milestoneImportance}
                </p>
                <ul className="timeline mt-4" style={timelineStyle}>
                  {history.milestones.map((milestone, index) => (
                    <li key={index} className="timeline-item">
                      <div className="timeline-marker" style={timelineMarkerStyle}></div>
                      <div className="timeline-content" style={timelineContentStyle}>
                        <p style={textStyle}>{milestone}</p>
      </div>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HistorySection;