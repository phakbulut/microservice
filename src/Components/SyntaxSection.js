import React from 'react';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// Framework'lerin kodlama örnekleri
const syntaxExamples = {
  dropwizard: {
    goodExample: {
      title: "Sade ve Anlaşılır REST Kaynakları",
      description: "Dropwizard'da JAX-RS anotasyonları ile REST kaynaklarını tanımlamak oldukça temiz ve açıktır.",
      code: `@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductResource {
  
  private final ProductDAO productDAO;
  
  public ProductResource(ProductDAO productDAO) {
    this.productDAO = productDAO;
  }
  
  @GET
  public List<Product> getAllProducts() {
    return productDAO.findAll();
  }
  
  @GET
  @Path("/{id}")
  public Product getProduct(@PathParam("id") long id) {
    return productDAO.findById(id)
      .orElseThrow(() -> new WebApplicationException(Status.NOT_FOUND));
  }
  
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public Response createProduct(Product product) {
    long id = productDAO.insert(product);
    return Response.created(UriBuilder.fromResource(ProductResource.class)
      .path(String.valueOf(id))
      .build())
      .entity(product)
      .build();
  }
}`
    },
    badExample: {
      title: "Karmaşık YAML Yapılandırması",
      description: "Dropwizard'ın yoğun yapılandırma gereksinimleri bazen çok fazla YAML yapılandırması gerektirebilir.",
      code: `server:
  applicationConnectors:
    - type: http
      port: 8080
      bindHost: 127.0.0.1
      inheritChannel: false
      headerCacheSize: 512 bytes
      outputBufferSize: 32KiB
      maxRequestHeaderSize: 8KiB
      maxResponseHeaderSize: 8KiB
      inputBufferSize: 8KiB
      idleTimeout: 30 seconds
      minBufferPoolSize: 64 bytes
      bufferPoolIncrement: 1KiB
      maxBufferPoolSize: 64KiB
      acceptorThreads: 1
      selectorThreads: 2
      acceptQueueSize: 1024
      reuseAddress: true
      soLingerTime: 345s
      useServerHeader: false
      useDateHeader: true
      useForwardedHeaders: false
  adminConnectors:
    - type: http
      port: 8081
  requestLog:
    appenders:
      - type: file
        currentLogFilename: ./logs/requests.log
        archivedLogFilenamePattern: ./logs/requests-%d.log.gz
        archivedFileCount: 5

database:
  driverClass: org.postgresql.Driver
  user: postgres
  password: postgres
  url: jdbc:postgresql://localhost/mydatabase
  properties:
    charSet: UTF-8
    hibernate.dialect: org.hibernate.dialect.PostgreSQLDialect
  maxWaitForConnection: 1s
  validationQuery: "SELECT 1"
  minSize: 8
  maxSize: 32
  checkConnectionWhileIdle: false`
    }
  },
  
  vertx: {
    goodExample: {
      title: "Asenkron ve Reaktif API",
      description: "Vert.x'in asenkron ve olay tabanlı yapısı, yüksek eşzamanlı uygulamalar için mükemmeldir.",
      code: `// HTTP Sunucu oluşturma
vertx.createHttpServer()
  .requestHandler(router)
  .listen(8080, result -> {
    if (result.succeeded()) {
      System.out.println("Sunucu başlatıldı!");
    } else {
      System.err.println("Sunucu başlatılamadı: " + result.cause());
    }
  });

// Veritabanı sorgusu örneği
jdbcClient.query("SELECT * FROM products WHERE price > ?", 
    new JsonArray().add(100), ar -> {
  if (ar.succeeded()) {
    List<JsonObject> rows = ar.result().getRows();
    // Ürünleri işle
    rows.forEach(product -> 
      System.out.println("Ürün bulundu: " + product.encode())
    );
  } else {
    System.err.println("Sorgu hatası: " + ar.cause());
  }
});

// EventBus ile mikroservis iletişimi
vertx.eventBus().consumer("orders.create", message -> {
  JsonObject order = (JsonObject) message.body();
  // Siparişi işle
  processOrder(order)
    .onSuccess(result -> message.reply(result))
    .onFailure(err -> message.fail(500, err.getMessage()));
});`
    },
    badExample: {
      title: "Callback Cehennem",
      description: "Karmaşık asenkron işlemlerde, Vert.x'in callback yapısı 'callback cehennemi' oluşturabilir.",
      code: `vertx.createHttpClient().request(HttpMethod.GET, 8080, "localhost", "/api/users", request -> {
  request.result().send(response -> {
    if (response.succeeded()) {
      response.result().body(body -> {
        if (body.succeeded()) {
          JsonObject user = body.result().toJsonObject();
          
          // Şimdi kullanıcının siparişlerini al
          vertx.createHttpClient().request(HttpMethod.GET, 8080, "localhost", "/api/orders?userId=" + user.getInteger("id"), orderRequest -> {
            orderRequest.result().send(orderResponse -> {
              if (orderResponse.succeeded()) {
                orderResponse.result().body(orderBody -> {
                  if (orderBody.succeeded()) {
                    JsonArray orders = orderBody.result().toJsonArray();
                    
                    // Her sipariş için ürün detaylarını al
                    orders.forEach(order -> {
                      JsonObject orderObj = (JsonObject) order;
                      // Ürün detayları için yeni istek
                      vertx.createHttpClient().request(HttpMethod.GET, 8080, "localhost", 
                          "/api/products/" + orderObj.getInteger("productId"), productRequest -> {
                        // Ürün yanıtını işle...
                        // ... ve devam et ...
                      });
                    });
                  }
                });
              }
            });
          });
        }
      });
    }
  });
});

// Bu sorun Promise veya Vert.x'in Future API'si
// ya da RxJava kullanılarak çözülebilir`
    }
  },
  
  spring: {
    goodExample: {
      title: "Zarif Dependency Injection",
      description: "Spring'in güçlü DI (Dependency Injection) yapısı, bağımlılıkları yönetmeyi kolaylaştırır.",
      code: `@Service
public class ProductServiceImpl implements ProductService {
  
  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final PriceCalculator priceCalculator;
  
  // Constructor injection - Spring otomatik olarak dependency'leri enjekte eder
  public ProductServiceImpl(
      ProductRepository productRepository,
      CategoryRepository categoryRepository,
      PriceCalculator priceCalculator) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.priceCalculator = priceCalculator;
  }
  
  @Override
  @Transactional(readOnly = true)
  public ProductDTO findById(Long id) {
    return productRepository.findById(id)
        .map(this::convertToDTO)
        .orElseThrow(() -> new ProductNotFoundException(id));
  }
  
  @Override
  @Transactional
  public ProductDTO createProduct(ProductCreateRequest request) {
    // İş mantığı...
    Product product = new Product();
    product.setName(request.getName());
    product.setPrice(priceCalculator.calculatePrice(request));
    product.setCategory(categoryRepository.findById(request.getCategoryId())
        .orElseThrow(() -> new CategoryNotFoundException(request.getCategoryId())));
    
    return convertToDTO(productRepository.save(product));
  }
}`
    },
    badExample: {
      title: "XML Yapılandırma Karmaşıklığı",
      description: "Eski Spring uygulamalarında, XML yapılandırmaları çok karmaşık ve hata yapmaya açık olabilir.",
      code: `<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/tx 
        http://www.springframework.org/schema/tx/spring-tx.xsd
        http://www.springframework.org/schema/aop 
        http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!-- DataSource Tanımı -->
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost:3306/mydb" />
        <property name="username" value="root" />
        <property name="password" value="password" />
        <property name="initialSize" value="5" />
        <property name="maxActive" value="10" />
    </bean>

    <!-- SessionFactory Tanımı -->
    <bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource" />
        <property name="packagesToScan" value="com.example.domain" />
        <property name="hibernateProperties">
            <props>
                <prop key="hibernate.dialect">org.hibernate.dialect.MySQLDialect</prop>
                <prop key="hibernate.show_sql">true</prop>
                <prop key="hibernate.format_sql">true</prop>
                <prop key="hibernate.hbm2ddl.auto">update</prop>
            </props>
        </property>
    </bean>

    <!-- TransactionManager Tanımı -->
    <bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory" />
    </bean>

    <!-- Service Tanımları -->
    <bean id="productService" class="com.example.service.ProductServiceImpl">
        <constructor-arg ref="productRepository" />
        <constructor-arg ref="categoryRepository" />
        <constructor-arg ref="priceCalculator" />
    </bean>

    <!-- Daha fazla bean tanımı... -->
</beans>`
    }
  },
  
  restlet: {
    goodExample: {
      title: "RESTful Kavramlara Sadık Tasarım",
      description: "Restlet, REST prensiplerini temel alarak, kaynak odaklı bir API yapısı sunar.",
      code: `// Restlet uygulama sınıfı
public class ProductApplication extends Application {
  
  @Override
  public Restlet createInboundRoot() {
    Router router = new Router(getContext());
    
    // Tüm ürünler için kaynak
    router.attach("/products", ProductsResource.class);
    
    // Tek bir ürün için kaynak
    router.attach("/products/{productId}", ProductResource.class);
    
    // Ürün yorumları için alt-kaynak
    router.attach("/products/{productId}/reviews", ReviewsResource.class);
    
    return router;
  }
}

// Tek ürün için kaynak sınıfı
public class ProductResource extends ServerResource {
  
  @Get("json")
  public Representation getProduct() {
    String productId = getAttribute("productId");
    
    try {
      // Ürün verisini al
      Product product = getProductService().findById(productId);
      
      // JSON yanıtı oluştur
      JSONObject result = new JSONObject();
      result.put("id", product.getId());
      result.put("name", product.getName());
      result.put("price", product.getPrice());
      
      return new JsonRepresentation(result);
    } catch (ProductNotFoundException e) {
      setStatus(Status.CLIENT_ERROR_NOT_FOUND);
      return new StringRepresentation("Product not found");
    }
  }
}`
    },
    badExample: {
      title: "Aşırı Sınıf Hiyerarşisi",
      description: "Restlet'in katı nesne modeli, küçük API'ler için fazla sınıf ve kod oluşturabilir.",
      code: `// Ana uygulama
public class MyRestletApplication extends Application {
  // ...
}

// Ürünler koleksiyonu kaynağı
public class ProductsResource extends ServerResource {
  // ...
}

// Tekil ürün kaynağı
public class ProductResource extends ServerResource {
  // ...
}

// Ürün kategorileri koleksiyonu kaynağı
public class CategoriesResource extends ServerResource {
  // ...
}

// Tekil kategori kaynağı
public class CategoryResource extends ServerResource {
  // ...
}

// Kategori-ürün ilişki koleksiyonu kaynağı
public class CategoryProductsResource extends ServerResource {
  // ...
}

// Kategori-ürün ilişkisi tekil kaynağı
public class CategoryProductResource extends ServerResource {
  // ...
}

// Ürün yorumları koleksiyonu kaynağı
public class ProductReviewsResource extends ServerResource {
  // ...
}

// Tekil ürün yorumu kaynağı
public class ProductReviewResource extends ServerResource {
  // ...
}

// Ürün etiketleri koleksiyonu kaynağı
public class ProductTagsResource extends ServerResource {
  // ...
}

// Tekil ürün etiketi kaynağı
public class ProductTagResource extends ServerResource {
  // ...
}

// vs vs...`
    }
  },
  
  spark: {
    goodExample: {
      title: "Ultra Kompakt Sözdizimi",
      description: "Spark'ın minimalist yaklaşımı, çok az kod ile hızlıca API oluşturmayı sağlar.",
      code: `// Uygulama başlatma ve rotaları tanımlama
public static void main(String[] args) {
  // JSON dönüşümü için gson
  Gson gson = new Gson();
  
  // Tüm ürünleri getir
  get("/api/products", (req, res) -> {
    res.type("application/json");
    return ProductService.getAllProducts();
  }, gson::toJson);
  
  // ID'ye göre ürün getir
  get("/api/products/:id", (req, res) -> {
    res.type("application/json");
    String id = req.params("id");
    Product product = ProductService.getProductById(id);
    
    if (product == null) {
      res.status(404);
      return Collections.singletonMap("error", "Product not found");
    }
    
    return product;
  }, gson::toJson);
  
  // Yeni ürün ekle
  post("/api/products", (req, res) -> {
    res.type("application/json");
    Product product = gson.fromJson(req.body(), Product.class);
    return ProductService.createProduct(product);
  }, gson::toJson);
  
  // Ürün güncelle
  put("/api/products/:id", (req, res) -> {
    res.type("application/json");
    String id = req.params("id");
    Product product = gson.fromJson(req.body(), Product.class);
    product.setId(id);
    
    return ProductService.updateProduct(product);
  }, gson::toJson);
  
  // Ürün sil
  delete("/api/products/:id", (req, res) -> {
    res.type("application/json");
    String id = req.params("id");
    boolean success = ProductService.deleteProduct(id);
    
    if (success) {
      return Collections.singletonMap("status", "success");
    } else {
      res.status(404);
      return Collections.singletonMap("error", "Product not found");
    }
  }, gson::toJson);
}`
    },
    badExample: {
      title: "Yapısal Organizasyon Eksikliği",
      description: "Spark'ın basitliği, büyük projelerde kod organizasyonu ve yapılandırmasını zorlaştırabilir.",
      code: `// Büyük Spark uygulaması tek bir dosyada
public static void main(String[] args) {
  // JSON dönüşümü için gson ve diğer yapılandırmalar
  Gson gson = new Gson();
  
  // CORS yapılandırması
  options("/*", (request, response) -> {
    response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Content-Length,Accept");
    response.header("Access-Control-Allow-Credentials", "true");
    return "OK";
  });
  
  before((request, response) -> {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Content-Length,Accept");
    response.type("application/json");
    
    // Token doğrulama
    if (!request.pathInfo().contains("/auth/") && !request.requestMethod().equals("OPTIONS")) {
      String token = request.headers("Authorization");
      if (token == null || !validateToken(token)) {
        halt(401, gson.toJson(Collections.singletonMap("error", "Unauthorized")));
      }
    }
  });
  
  // Kullanıcı rotaları
  get("/api/users", (req, res) -> UserService.getAllUsers(), gson::toJson);
  get("/api/users/:id", (req, res) -> UserService.getUserById(req.params("id")), gson::toJson);
  post("/api/users", (req, res) -> UserService.createUser(gson.fromJson(req.body(), User.class)), gson::toJson);
  put("/api/users/:id", (req, res) -> UserService.updateUser(
    req.params("id"), gson.fromJson(req.body(), User.class)), gson::toJson);
  delete("/api/users/:id", (req, res) -> UserService.deleteUser(req.params("id")), gson::toJson);
  
  // Ürün rotaları
  get("/api/products", (req, res) -> ProductService.getAllProducts(), gson::toJson);
  get("/api/products/:id", (req, res) -> ProductService.getProductById(req.params("id")), gson::toJson);
  post("/api/products", (req, res) -> ProductService.createProduct(
    gson.fromJson(req.body(), Product.class)), gson::toJson);
  put("/api/products/:id", (req, res) -> ProductService.updateProduct(
    req.params("id"), gson.fromJson(req.body(), Product.class)), gson::toJson);
  delete("/api/products/:id", (req, res) -> ProductService.deleteProduct(req.params("id")), gson::toJson);
  
  // Sipariş rotaları
  get("/api/orders", (req, res) -> OrderService.getAllOrders(), gson::toJson);
  get("/api/orders/:id", (req, res) -> OrderService.getOrderById(req.params("id")), gson::toJson);
  get("/api/users/:userId/orders", (req, res) -> 
    OrderService.getOrdersByUserId(req.params("userId")), gson::toJson);
  post("/api/orders", (req, res) -> OrderService.createOrder(
    gson.fromJson(req.body(), Order.class)), gson::toJson);
  put("/api/orders/:id", (req, res) -> OrderService.updateOrder(
    req.params("id"), gson.fromJson(req.body(), Order.class)), gson::toJson);
  delete("/api/orders/:id", (req, res) -> OrderService.deleteOrder(req.params("id")), gson::toJson);
  
  // Kategori rotaları
  // Yorum rotaları
  // Etiket rotaları
  // vs...
}`
    }
  }
};

const SyntaxSection = ({ framework }) => {
  const colors = useSelector(state => state.colors);
  const [activeTab, setActiveTab] = useState('good');
  
  const frameworkExamples = syntaxExamples[framework.toLowerCase()] || syntaxExamples.spring;
  
  return (
    <section className="section content-section syntax-section" id="syntax-section">
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
      
      <Container>
        <h2 className="section-title">
          <span className="gradient-text">Sözdizimi Karşılaştırması</span>
        </h2>
        
        <p className="intro-text">
          Her framework'ün kendine özgü sözdizimi ve kodlama yaklaşımı vardır. {framework} kullanırken kodun nasıl göründüğünü ve yazıldığını anlamak için aşağıdaki örnekleri inceleyin.
        </p>
        
        <Nav tabs className="syntax-tabs">
          <NavItem>
            <NavLink 
              className={activeTab === 'good' ? 'active' : ''}
              onClick={() => setActiveTab('good')}
            >
              <span className="tab-icon good">✓</span> İyi Örnek
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              className={activeTab === 'bad' ? 'active' : ''}
              onClick={() => setActiveTab('bad')}
            >
              <span className="tab-icon bad">✗</span> Zorlayıcı Örnek
            </NavLink>
          </NavItem>
        </Nav>
        
        <div className="syntax-tab-content">
          {activeTab === 'good' ? (
            <Card className="syntax-card">
              <CardBody>
                <h3 className="syntax-title">{frameworkExamples.goodExample.title}</h3>
                <p className="syntax-description">{frameworkExamples.goodExample.description}</p>
                <div className="code-block syntax-code">
                  <pre>{frameworkExamples.goodExample.code}</pre>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="syntax-card">
              <CardBody>
                <h3 className="syntax-title">{frameworkExamples.badExample.title}</h3>
                <p className="syntax-description">{frameworkExamples.badExample.description}</p>
                <div className="code-block syntax-code">
                  <pre>{frameworkExamples.badExample.code}</pre>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SyntaxSection; 