import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { useSelector } from 'react-redux';

// Framework yapıları
const frameworkStructures = {
  dropwizard: {
    rootDir: 'dropwizard-app',
    description: 'Dropwizard, hızlı geliştirme ve yüksek performanslı RESTful web servisleri oluşturmanıza olanak tanır. Jersey, Jackson ve Hibernate gibi popüler kütüphaneleri entegre eder.',
    fileStructure: [
      {
        name: 'src',
        type: 'folder',
        desc: 'Uygulama kaynak kodu içerir.',
        level: 0,
        expanded: true,
        children: [
          {
            name: 'main',
            type: 'folder',
            desc: 'Ana uygulama kodunu içerir.',
            level: 1,
            expanded: true,
            children: [
              {
                name: 'java',
                type: 'folder',
                desc: 'Java dosyaları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'com.example.app',
                    type: 'folder',
                    desc: 'Ana paket',
                    level: 3,
                    expanded: true,
                    children: [
                      {
                        name: 'AppApplication.java',
                        type: 'file',
                        desc: 'Dropwizard uygulamasının ana sınıfı. Application sınıfını genişletir ve temel yöntemleri uygular.',
                        level: 4
                      },
                      {
                        name: 'AppConfiguration.java',
                        type: 'file',
                        desc: 'Yapılandırma sınıfı. Configuration sınıfını genişletir ve YAML yapılandırma dosyasından değerleri okur.',
                        level: 4
                      },
                      {
                        name: 'resources',
                        type: 'folder',
                        desc: 'REST kaynakları',
                        level: 4,
                        expanded: true,
                        children: [
                          {
                            name: 'UserResource.java',
                            type: 'file',
                            desc: 'Kullanıcı işlemleri için JAX-RS kaynak sınıfı. HTTP endpoint tanımları içerir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'core',
                        type: 'folder',
                        desc: 'Temel veri modelleri',
                        level: 4,
                        children: [
                          {
                            name: 'User.java',
                            type: 'file',
                            desc: 'Kullanıcı modeli. Jackson anotasyonları ile JSON serileştirme özelleştirmelerini içerir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'db',
                        type: 'folder',
                        desc: 'Veritabanı erişim nesneleri',
                        level: 4,
                        children: [
                          {
                            name: 'UserDAO.java',
                            type: 'file',
                            desc: 'Kullanıcı veri erişim nesnesi. Hibernate kullanarak veritabanı işlemlerini gerçekleştirir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'health',
                        type: 'folder',
                        desc: 'Sağlık kontrolleri',
                        level: 4,
                        children: [
                          {
                            name: 'AppHealthCheck.java',
                            type: 'file',
                            desc: 'Uygulama sağlık kontrol sınıfı. HealthCheck sınıfını genişletir ve sağlık durumunu döndürür.',
                            level: 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'resources',
                type: 'folder',
                desc: 'Statik kaynaklar ve yapılandırma dosyaları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'assets',
                    type: 'folder',
                    desc: 'Statik varlıklar',
                    level: 3
                  },
                  {
                    name: 'banner.txt',
                    type: 'file',
                    desc: 'Uygulama başlangıcında görüntülenen ASCII sanat banner.',
                    level: 3
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'config.yml',
        type: 'file',
        desc: 'Uygulama yapılandırma dosyası. Veritabanı, sunucu ayarları vb. YAML formatında tanımlanır.',
        level: 0
      },
      {
        name: 'pom.xml',
        type: 'file',
        desc: 'Maven yapılandırma dosyası. Bağımlılıklar, yapı bilgileri ve proje meta verileri burada tanımlanır.',
        level: 0
      },
      {
        name: 'README.md',
        type: 'file',
        desc: 'Proje dokümantasyonu ve kullanım talimatları.',
        level: 0
      }
    ]
  },
  vertx: {
    rootDir: 'vertx-app',
    description: 'Vert.x, reaktif uygulamalar oluşturmak için kullanılan olay tabanlı bir toolkit\'tir. Yüksek performanslı ve asenkron programlama ile büyük ölçekli uygulamalar geliştirmenizi sağlar.',
    fileStructure: [
      {
        name: 'src',
        type: 'folder',
        desc: 'Uygulama kaynak kodu içerir.',
        level: 0,
        expanded: true,
        children: [
          {
            name: 'main',
            type: 'folder',
            desc: 'Ana uygulama kodunu içerir.',
            level: 1,
            expanded: true,
            children: [
              {
                name: 'java',
                type: 'folder',
                desc: 'Java dosyaları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'com.example.app',
                    type: 'folder',
                    desc: 'Ana paket',
                    level: 3,
                    expanded: true,
                    children: [
                      {
                        name: 'MainVerticle.java',
                        type: 'file',
                        desc: 'Ana Verticle. Uygulamanın başlangıç noktası ve HTTP sunucusunu başlatır.',
                        level: 4
                      },
                      {
                        name: 'verticles',
                        type: 'folder',
                        desc: 'Diğer Verticles',
                        level: 4,
                        expanded: true,
                        children: [
                          {
                            name: 'HttpServerVerticle.java',
                            type: 'file',
                            desc: 'HTTP sunucusu işlemlerini yönetir. Rotaları tanımlar ve istekleri işler.',
                            level: 5
                          },
                          {
                            name: 'DatabaseVerticle.java',
                            type: 'file',
                            desc: 'Veritabanı işlemlerini yönetir. Asenkron veritabanı işlemlerini gerçekleştirir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'handlers',
                        type: 'folder',
                        desc: 'İstek işleyicileri',
                        level: 4,
                        children: [
                          {
                            name: 'UserHandler.java',
                            type: 'file',
                            desc: 'Kullanıcı isteği işleyicisi. Kullanıcı verilerini işlemek için mantık içerir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'models',
                        type: 'folder',
                        desc: 'Veri modelleri',
                        level: 4,
                        children: [
                          {
                            name: 'User.java',
                            type: 'file',
                            desc: 'Kullanıcı veri modeli. JSON serileştirme için metodlar içerir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'utils',
                        type: 'folder',
                        desc: 'Yardımcı sınıflar',
                        level: 4,
                        children: [
                          {
                            name: 'DatabaseUtils.java',
                            type: 'file',
                            desc: 'Veritabanı yardımcı işlevleri. Bağlantı oluşturma ve sorgular için metodlar içerir.',
                            level: 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'resources',
                type: 'folder',
                desc: 'Uygulama kaynakları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'config.json',
                    type: 'file',
                    desc: 'Uygulama yapılandırma dosyası JSON formatında.',
                    level: 3
                  },
                  {
                    name: 'webroot',
                    type: 'folder',
                    desc: 'Web kök dizini. Statik dosyaları içerir.',
                    level: 3
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'build.gradle',
        type: 'file',
        desc: 'Gradle yapılandırma dosyası. Bağımlılıklar ve yapı görevleri burada tanımlanır.',
        level: 0
      },
      {
        name: 'README.md',
        type: 'file',
        desc: 'Proje dokümantasyonu ve kullanım talimatları.',
        level: 0
      }
    ]
  },
  spring: {
    rootDir: 'spring-boot-app',
    description: 'Spring Boot, klasik Spring modüllerini birleştirerek tek bir uygulama oluşturmanızı sağlar. Belirli bir yapıya sahip olup, otomatik yapılandırma özellikleri ile geliştirmeyi hızlandırır.',
    fileStructure: [
      {
        name: 'src',
        type: 'folder',
        desc: 'Uygulama kaynak kodu içerir.',
        level: 0,
        expanded: true,
        children: [
          {
            name: 'main',
            type: 'folder',
            desc: 'Ana uygulama kodunu içerir.',
            level: 1,
            expanded: true,
            children: [
              {
                name: 'java',
                type: 'folder',
                desc: 'Java dosyaları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'com.example.app',
                    type: 'folder',
                    desc: 'Ana paket',
                    level: 3,
                    expanded: true,
                    children: [
                      {
                        name: 'Application.java',
                        type: 'file',
                        desc: 'Spring Boot uygulamasının başlangıç noktası. @SpringBootApplication anotasyonu ile işaretlenir ve main() metodu içerir.',
                        level: 4
                      },
                      {
                        name: 'controllers',
                        type: 'folder',
                        desc: 'REST API endpoint tanımları ve istek yönlendirme',
                        level: 4,
                        children: [
                          {
                            name: 'UserController.java',
                            type: 'file',
                            desc: 'Kullanıcı işlemleri için REST endpoint tanımları. @RestController anotasyonu ile işaretlenmiştir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'models',
                        type: 'folder',
                        desc: 'Veri modelleri ve entity sınıfları',
                        level: 4,
                        children: [
                          {
                            name: 'User.java',
                            type: 'file',
                            desc: 'Kullanıcı entity sınıfı. @Entity anotasyonu ile işaretlenmiş ve veritabanı tablosuna karşılık gelir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'repositories',
                        type: 'folder',
                        desc: 'Veritabanı erişim katmanı',
                        level: 4,
                        children: [
                          {
                            name: 'UserRepository.java',
                            type: 'file',
                            desc: 'JpaRepository arayüzünü genişleten veritabanı erişim katmanı. CRUD operasyonlarını otomatik sağlar.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'services',
                        type: 'folder',
                        desc: 'İş mantığı katmanı',
                        level: 4,
                        children: [
                          {
                            name: 'UserService.java',
                            type: 'file',
                            desc: 'Kullanıcı işlemleri için iş mantığı ve servis katmanı. @Service anotasyonu ile işaretlenmiştir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'config',
                        type: 'folder',
                        desc: 'Uygulama yapılandırma sınıfları',
                        level: 4,
                        children: [
                          {
                            name: 'SecurityConfig.java',
                            type: 'file',
                            desc: 'Spring Security yapılandırması. @Configuration anotasyonu ile işaretlenmiştir.',
                            level: 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'resources',
                type: 'folder',
                desc: 'Uygulama kaynakları ve yapılandırma dosyaları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'application.properties',
                    type: 'file',
                    desc: 'Ana yapılandırma dosyası. Veritabanı bağlantısı, sunucu portu gibi ayarları içerir.',
                    level: 3
                  },
                  {
                    name: 'static',
                    type: 'folder',
                    desc: 'Statik dosyalar (CSS, JS, resimler)',
                    level: 3
                  },
                  {
                    name: 'templates',
                    type: 'folder',
                    desc: 'Thymeleaf şablonları',
                    level: 3
                  }
                ]
              }
            ]
          },
          {
            name: 'test',
            type: 'folder',
            desc: 'Test kodunu içerir',
            level: 1,
            children: [
              {
                name: 'java',
                type: 'folder',
                desc: 'Test sınıfları',
                level: 2
              }
            ]
          }
        ]
      },
      {
        name: 'pom.xml',
        type: 'file',
        desc: 'Maven yapılandırma dosyası. Bağımlılıklar, yapı bilgileri ve proje meta verileri burada tanımlanır.',
        level: 0
      },
      {
        name: '.gitignore',
        type: 'file',
        desc: 'Git tarafından izlenmeyecek dosyaların listesi.',
        level: 0
      },
      {
        name: 'README.md',
        type: 'file',
        desc: 'Proje dokümantasyonu ve kullanım talimatları.',
        level: 0
      }
    ]
  },
  restlet: {
    rootDir: 'restlet-app',
    description: 'Restlet, web API\'leri ve RESTful web servisleri oluşturmak için bir framework\'tür. REST ilkelerine dayalı web uygulamaları geliştirmenize yardımcı olur.',
    fileStructure: [
      {
        name: 'src',
        type: 'folder',
        desc: 'Uygulama kaynak kodu içerir.',
        level: 0,
        expanded: true,
        children: [
          {
            name: 'main',
            type: 'folder',
            desc: 'Ana uygulama kodunu içerir.',
            level: 1,
            expanded: true,
            children: [
              {
                name: 'java',
                type: 'folder',
                desc: 'Java dosyaları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'com.example.app',
                    type: 'folder',
                    desc: 'Ana paket',
                    level: 3,
                    expanded: true,
                    children: [
                      {
                        name: 'Application.java',
                        type: 'file',
                        desc: 'Uygulamanın ana sınıfı. Restlet Component ve uygulama yapılandırmasını içerir.',
                        level: 4
                      },
                      {
                        name: 'resources',
                        type: 'folder',
                        desc: 'Restlet kaynakları',
                        level: 4,
                        expanded: true,
                        children: [
                          {
                            name: 'UserResource.java',
                            type: 'file',
                            desc: 'Kullanıcı kaynağı. ServerResource sınıfını genişletir ve REST endpoint mantığını içerir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'representations',
                        type: 'folder',
                        desc: 'Veri temsilleri',
                        level: 4,
                        children: [
                          {
                            name: 'UserRepresentation.java',
                            type: 'file',
                            desc: 'Kullanıcı temsili. JSON/XML dönüşümleri için tanımlamalar içerir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'services',
                        type: 'folder',
                        desc: 'İş mantığı servisleri',
                        level: 4,
                        children: [
                          {
                            name: 'UserService.java',
                            type: 'file',
                            desc: 'Kullanıcı işlemlerini yöneten servis sınıfı.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'security',
                        type: 'folder',
                        desc: 'Güvenlik bileşenleri',
                        level: 4,
                        children: [
                          {
                            name: 'CustomVerifier.java',
                            type: 'file',
                            desc: 'Özel kimlik doğrulama mantığını içeren sınıf.',
                            level: 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'resources',
                type: 'folder',
                desc: 'Uygulama kaynakları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'config.properties',
                    type: 'file',
                    desc: 'Uygulama yapılandırma dosyası.',
                    level: 3
                  },
                  {
                    name: 'static',
                    type: 'folder',
                    desc: 'Statik dosyalar',
                    level: 3
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'pom.xml',
        type: 'file',
        desc: 'Maven yapılandırma dosyası. Bağımlılıklar, yapı bilgileri ve proje meta verileri burada tanımlanır.',
        level: 0
      },
      {
        name: 'README.md',
        type: 'file',
        desc: 'Proje dokümantasyonu ve kullanım talimatları.',
        level: 0
      }
    ]
  },
  spark: {
    rootDir: 'spark-java-app',
    description: 'Spark, mikro web framework yaklaşımıyla Java için basit, hafif bir web uygulaması geliştirme ortamı sunar. Minimal kod ile web servisleri oluşturabilirsiniz.',
    fileStructure: [
      {
        name: 'src',
        type: 'folder',
        desc: 'Uygulama kaynak kodu içerir.',
        level: 0,
        expanded: true,
        children: [
          {
            name: 'main',
            type: 'folder',
            desc: 'Ana uygulama kodunu içerir.',
            level: 1,
            expanded: true,
            children: [
              {
                name: 'java',
                type: 'folder',
                desc: 'Java dosyaları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'com.example.app',
                    type: 'folder',
                    desc: 'Ana paket',
                    level: 3,
                    expanded: true,
                    children: [
                      {
                        name: 'Application.java',
                        type: 'file',
                        desc: 'Uygulamanın ana sınıfı. Tüm rota tanımlarını ve yapılandırmayı içerir.',
                        level: 4
                      },
                      {
                        name: 'controllers',
                        type: 'folder',
                        desc: 'İstek işleyicileri',
                        level: 4,
                        expanded: true,
                        children: [
                          {
                            name: 'UserController.java',
                            type: 'file',
                            desc: 'Kullanıcı rotaları ve işlemleri için işleyici kodları.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'models',
                        type: 'folder',
                        desc: 'Veri modelleri',
                        level: 4,
                        children: [
                          {
                            name: 'User.java',
                            type: 'file',
                            desc: 'Kullanıcı veri modeli. GSON serileştirme için metodlar içerir.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'services',
                        type: 'folder',
                        desc: 'İş mantığı servisleri',
                        level: 4,
                        children: [
                          {
                            name: 'UserService.java',
                            type: 'file',
                            desc: 'Kullanıcı işlemleri için iş mantığı.',
                            level: 5
                          }
                        ]
                      },
                      {
                        name: 'utils',
                        type: 'folder',
                        desc: 'Yardımcı sınıflar',
                        level: 4,
                        children: [
                          {
                            name: 'JsonUtil.java',
                            type: 'file',
                            desc: 'JSON dönüştürme yardımcıları. GSON kullanımını basitleştirir.',
                            level: 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'resources',
                type: 'folder',
                desc: 'Uygulama kaynakları',
                level: 2,
                expanded: true,
                children: [
                  {
                    name: 'public',
                    type: 'folder',
                    desc: 'Statik dosyalar',
                    level: 3,
                    children: [
                      {
                        name: 'css',
                        type: 'folder',
                        desc: 'CSS stil dosyaları',
                        level: 4
                      },
                      {
                        name: 'js',
                        type: 'folder',
                        desc: 'JavaScript dosyaları',
                        level: 4
                      }
                    ]
                  },
                  {
                    name: 'templates',
                    type: 'folder',
                    desc: 'Freemarker şablonları',
                    level: 3
                  },
                  {
                    name: 'application.properties',
                    type: 'file',
                    desc: 'Uygulama yapılandırma dosyası.',
                    level: 3
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'pom.xml',
        type: 'file',
        desc: 'Maven yapılandırma dosyası. Bağımlılıklar, yapı bilgileri ve proje meta verileri burada tanımlanır.',
        level: 0
      },
      {
        name: 'README.md',
        type: 'file',
        desc: 'Proje dokümantasyonu ve kullanım talimatları.',
        level: 0
      }
    ]
  }
};

// Dosya/klasör bileşeni
const FileItem = ({ item, level = 0, selectedFile, onSelectFile }) => {
  const colors = useSelector(state => state.colors);
  const [expanded, setExpanded] = useState(level < 2);
  
  const isFolder = item.type === 'folder';
  const hasChildren = isFolder && item.children && item.children.length > 0;
  
  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  const handleClick = (e) => {
    e.stopPropagation();
    onSelectFile(item);
  };
  
  const isSelected = selectedFile && selectedFile.name === item.name && selectedFile.type === item.type;
  
  const containerStyle = {
    paddingLeft: `${level * 20}px`,
  };
  
  return (
    <div>
      <div 
        className={`file-item ${isSelected ? 'selected' : ''}`}
        style={containerStyle} 
        onClick={handleClick}
        onDoubleClick={hasChildren ? toggleExpanded : null}
      >
        <span className="file-icon" style={{color: isFolder ? colors.accent : 'white'}}>
          {isFolder ? (expanded ? '📂' : '📁') : '📄'}
        </span>
        <span className="file-name">{item.name}</span>
        
        {hasChildren && (
          <span 
            className={`folder-toggle ${expanded ? 'expanded' : ''}`}
            onClick={toggleExpanded}
          >
            ▶
          </span>
        )}
      </div>
      
      {expanded && hasChildren && (
        <div>
          {item.children.map((child, index) => (
            <FileItem 
              key={index} 
              item={child} 
              level={level + 1} 
              selectedFile={selectedFile} 
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Ana bileşen
const StructureSection = ({ framework }) => {
  const colors = useSelector(state => state.colors);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Eğer framework değiştiyse seçili dosyayı sıfırla
  React.useEffect(() => {
    setSelectedFile(null);
  }, [framework]);
  
  const structureData = frameworkStructures[framework] || frameworkStructures.spring;
  
  // Dosya seçildiğinde gerçekleşen animasyon
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    // Mobil görünümde otomatik dosya detay bölümüne kaydır
    if (window.innerWidth < 992) {
      setTimeout(() => {
        document.getElementById('file-detail-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  return (
    <section className="section structure-section" id="structure-section">
      <div className="background-particles">
        {Array(15).fill().map((_, i) => (
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
        <div className="text-center mb-5">
          <h2 className="section-title">
            <span className="gradient-text">Dizin Yapısı ve Organizasyon</span>
          </h2>
          <p className="intro-text">
            {structureData.description}
          </p>
        </div>
        
        <Row className="g-4">
          <Col lg={6}>
            <Card className="file-structure-card h-100" style={{borderColor: colors.border, backgroundColor: colors.cardBg}}>
              <CardHeader style={{backgroundColor: colors.cardBg, borderColor: colors.border}}>
                <h3 className="file-detail-title">
                  <span>📂</span> 
                  {structureData.rootDir}
                </h3>
              </CardHeader>
              <CardBody className="file-structure-container">
                {structureData.fileStructure.map((item, index) => (
                  <FileItem 
                    key={index} 
                    item={item} 
                    selectedFile={selectedFile} 
                    onSelectFile={handleFileSelect}
                  />
                ))}
              </CardBody>
            </Card>
          </Col>
          
          <Col lg={6}>
            <div className="file-detail-container" id="file-detail-section">
              {selectedFile ? (
                <div className="file-info-card">
                  <h3 className="file-detail-title">
                    <span>{selectedFile.type === 'folder' ? '📂' : '📄'}</span>
                    {selectedFile.name}
                  </h3>
                  
                  <div className="file-detail-card">
                    <h5 className="file-detail-subtitle">
                      Tipi: {selectedFile.type === 'folder' ? 'Klasör' : 'Dosya'}
                    </h5>
                    
                    {selectedFile.desc && (
                      <p className="file-detail-text">
                        {selectedFile.desc}
                      </p>
                    )}
                  </div>
                  
                  {selectedFile.type === 'folder' && (
                    <div>
                      <h5 className="file-detail-subtitle">
                        İçerik:
                      </h5>
                      
                      {selectedFile.children && selectedFile.children.length > 0 ? (
                        <ul className="file-list">
                          {selectedFile.children.map((child, index) => (
                            <li key={index} className="file-list-item">
                              <span className="file-list-icon">{child.type === 'folder' ? '📂' : '📄'}</span>
                              {child.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="file-detail-text">Bu klasör boş.</p>
                      )}
                    </div>
                  )}
                  
                  {selectedFile.type === 'file' && (
                    <div>
                      <h5 className="file-detail-subtitle">
                        Dosya Rolü:
                      </h5>
                      <p className="file-detail-text">
                        {selectedFile.desc || `${selectedFile.name} dosyası framework yapısında önemli bir rol oynar.`}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="empty-file-selection">
                  <p className="empty-file-icon">📂</p>
                  <h4 className="empty-file-title">Dosya/Klasör Seçiniz</h4>
                  <p className="empty-file-text">
                    Sol taraftan bir dosya veya klasör seçerek detaylı bilgi alabilirsiniz.
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col>
            <div className="structure-overview text-center">
              <h3 style={{color: 'white', marginBottom: '20px'}}>Katmanlı Mimari</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', margin: '0 auto'}}>
                {framework === 'dropwizard' && 'Dropwizard, REST kaynakları, servisler ve veri erişim katmanlarına dayalı temiz bir ayırma sağlar.'}
                {framework === 'vertx' && 'Vert.x, dikey olarak ayrılmış Verticle\'lar üzerine kuruludur. Her biri kendi işlevselliğine sahiptir ve event bus ile haberleşir.'}
                {framework === 'spring' && 'Spring Boot, Controller-Service-Repository katmanlı mimarisini temel alır ve yüksek ölçeklenebilirlik sağlar.'}
                {framework === 'restlet' && 'Restlet, temiz REST ilkelerine dayalı bir mimari ile kaynaklar, temsiller ve servisler arasında ayrım yapar.'}
                {framework === 'spark' && 'Spark minimalist yaklaşımıyla, basit bir MVC mimarisi kullanır ve route tanımlamaları üzerine odaklanır.'}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
  </section>
); 
};

export default StructureSection; 