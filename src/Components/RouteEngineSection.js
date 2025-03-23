import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';

// Framework'lere göre rota tanımlama örnekleri
const routeExamples = {
  dropwizard: {
    title: "Dropwizard Rota Tanımlamaları",
    description: "Dropwizard, JAX-RS (Jersey) ile RESTful API tanımlamaları yapar. Anotasyonlar kullanarak HTTP metodları ve yollar belirlenir.",
    configNeeded: "Orta", // Az, Orta, Çok
    routeExample: `// Sınıf düzeyinde yol belirtimi
@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
  
  // Login endpoint tanımı
  @POST
  @Path("/login")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response login(LoginDTO credentials) {
    // Kullanıcı girişi mantığı
    return Response.ok(new LoginResponse(token, user)).build();
  }
  
  // Diğer endpoint tanımları
  @GET
  @Path("/{id}")
  public Response getUser(@PathParam("id") long id) {
    // Kullanıcı getirme mantığı
    return Response.ok(user).build();
  }
}`,
    features: [
      "Anotasyonlar ile HTTP metod ve yol tanımlamaları",
      "Jersey'nin güçlü yol parametreleri ve sorgulama desteği",
      "İstek ve yanıt için otomatik JSON dönüşümü",
      "Anotasyonlarla content tipi belirleme",
      "Path parametreleri (@PathParam), sorgu parametreleri (@QueryParam) desteği"
    ]
  },
  
  vertx: {
    title: "Vert.x Rota Tanımlamaları",
    description: "Vert.x, programatik olarak yollar tanımlar ve asenkron bir yaklaşım kullanır. Router nesnesi üzerinden HTTP metodları ve yollar belirlenir.",
    configNeeded: "Az", // Az, Orta, Çok
    routeExample: `// Router tanımlama
Router router = Router.router(vertx);

// Login endpoint tanımı
router.post("/api/users/login").handler(ctx -> {
  // İstek gövdesini al (asenkron)
  ctx.request().bodyHandler(body -> {
    JsonObject credentials = body.toJsonObject();
    
    // Kullanıcı girişi mantığı
    authService.login(credentials, result -> {
      if (result.succeeded()) {
        // Başarılı yanıt
        ctx.response()
          .setStatusCode(200)
          .putHeader("Content-Type", "application/json")
          .end(result.result().encode());
      } else {
        // Hata yanıtı
        ctx.response()
          .setStatusCode(401)
          .putHeader("Content-Type", "application/json")
          .end(new JsonObject().put("error", "Giriş başarısız").encode());
      }
    });
  });
});

// HTTP sunucusu başlatma
vertx.createHttpServer()
  .requestHandler(router)
  .listen(8080);`,
    features: [
      "Programatik rota tanımlamaları (anotasyon kullanmaz)",
      "Asenkron işleyiciler (handler) kullanır",
      "Zincirleme API tasarımı",
      "Route parametreleri ve regex desteği",
      "Event Loop'u bloke etmeyen reaktif yaklaşım"
    ]
  },
  
  spring: {
    title: "Spring Boot Rota Tanımlamaları",
    description: "Spring Boot, anotasyonlar kullanarak RESTful API tanımlamaları yapar. HTTP metodları ve yollar için özel anotasyonlar vardır.",
    configNeeded: "Az", // Az, Orta, Çok
    routeExample: `// Controller sınıfı tanımlama
@RestController
@RequestMapping("/api/users")
public class UserController {
  
  @Autowired
  private UserService userService;
  
  // Login endpoint tanımı
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginDTO credentials) {
    try {
      // Kullanıcı girişi mantığı
      LoginResponse response = userService.login(credentials);
      return ResponseEntity.ok(response);
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
              .body(new ErrorResponse("Giriş başarısız"));
    }
  }
  
  // Kullanıcı getirme endpoint tanımı
  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    return ResponseEntity.ok(userService.findById(id));
  }
}`,
    features: [
      "Zengin anotasyon desteği (@GetMapping, @PostMapping vb.)",
      "Otomatik JSON dönüşümü",
      "Path değişkenleri (@PathVariable) ve istek parametreleri (@RequestParam)",
      "İstek gövdesinden nesne dönüşümü (@RequestBody)",
      "Spring Security ile kolay entegrasyon"
    ]
  },
  
  restlet: {
    title: "Restlet Rota Tanımlamaları",
    description: "Restlet, sınıf tabanlı bir yaklaşımla RESTful API tanımlamaları yapar. Her kaynak ayrı bir sınıftır.",
    configNeeded: "Orta", // Az, Orta, Çok
    routeExample: `// Ana uygulama sınıfı
public class MyApplication extends Application {
  
  @Override
  public Restlet createInboundRoot() {
    // Router oluşturma
    Router router = new Router(getContext());
    
    // Login endpoint tanımı
    router.attach("/api/users/login", LoginResource.class);
    
    // Kullanıcı kaynakları
    router.attach("/api/users/{userId}", UserResource.class);
    
    return router;
  }
}

// Login Resource sınıfı
public class LoginResource extends ServerResource {
  
  // POST metodu için işleyici
  @Post
  public Representation login(Representation entity) throws ResourceException {
    // JSON girdisini parse et
    JsonRepresentation rep = new JsonRepresentation(entity);
    JSONObject credentials = rep.getJsonObject();
    
    // Giriş mantığı...
    
    // JSON yanıtı oluştur
    JSONObject response = new JSONObject();
    response.put("token", token);
    response.put("user", userJson);
    
    return new JsonRepresentation(response);
  }
}`,
    features: [
      "Sınıf tabanlı kaynak (resource) modeli",
      "Ayrı HTTP metod metotları",
      "Temsil (Representation) tabanlı veri işleme",
      "URL şablonları ve değişkenler",
      "İçerik pazarlığı (content negotiation) desteği"
    ]
  },
  
  spark: {
    title: "Spark Framework Rota Tanımlamaları",
    description: "Spark, minimalist bir yaklaşımla rota tanımlamaları sunar. Fonksiyonel programlama tarzında HTTP metodları ve yollar tanımlanır.",
    configNeeded: "Az", // Az, Orta, Çok
    routeExample: `// Rota tanımlamaları doğrudan yapılır
// Login endpoint tanımı
post("/api/users/login", (request, response) -> {
  // JSON isteğini parse et
  LoginDTO credentials = gson.fromJson(request.body(), LoginDTO.class);
  
  try {
    // Kullanıcı girişi mantığı
    User user = userService.authenticate(credentials);
    String token = jwtUtil.createToken(user);
    
    // Başarılı yanıt
    response.type("application/json");
    response.status(200);
    return gson.toJson(new LoginResponse(token, user));
  } catch (AuthException e) {
    // Hata yanıtı
    response.type("application/json");
    response.status(401);
    return gson.toJson(new ErrorResponse("Giriş başarısız"));
  }
});

// Kullanıcı getirme endpointi
get("/api/users/:id", (request, response) -> {
  long userId = Long.parseLong(request.params("id"));
  User user = userService.findById(userId);
  
  response.type("application/json");
  return gson.toJson(user);
});`,
    features: [
      "Çok basit ve anlaşılır sözdizimi",
      "Lambda ifadeleri ile fonksiyonel yaklaşım",
      "Minimal yapılandırma gereksinimi",
      "URL parametreleri (request.params) ve sorgu parametreleri (request.queryParams)",
      "Before ve after filtrelerle ara katman desteği"
    ]
  }
};

const RouteEngineSection = ({ framework }) => {
  const colors = useSelector(state => state.colors);
  const routeExample = routeExamples[framework.toLowerCase()] || routeExamples.spring;
  
  // Yapılandırma ihtiyacı için sınıf belirleme
  const getConfigClass = (level) => {
    if (level === "Az") return "config-low";
    if (level === "Orta") return "config-medium";
    if (level === "Çok") return "config-high";
    return "";
  };

  return (
    <section className="section content-section route-section" id="route-section">
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
          <span className="gradient-text">Rota Tanımlamaları</span>
        </h2>
        
        <p className="intro-text">
          API endpoint'leri oluşturmak her framework'te farklı yaklaşımlarla gerçekleştirilir. Bu bölümde {framework} framework'ünün rota tanımlama yaklaşımını inceleyeceğiz.
        </p>
        
        <Row>
          <Col lg={12}>
            <Card className="route-card">
              <CardHeader className="route-card-header">
                <div className="route-card-header-content">
                  <h3 className="route-card-title">{routeExample.title}</h3>
                  <div className={`route-config-badge ${getConfigClass(routeExample.configNeeded)}`}>
                    <span className="config-label">Konfigürasyon İhtiyacı:</span>
                    <span className="config-value">{routeExample.configNeeded}</span>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <p>{routeExample.description}</p>
                
                <h4 className="endpoint-title">Login API Endpoint Örneği</h4>
                <div className="code-block">
                  <pre>{routeExample.routeExample}</pre>
                </div>
                
                <div className="features-container">
                  <h5 className="features-title">Öne Çıkan Özellikler:</h5>
                  <ul className="route-feature-list">
                    {routeExample.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RouteEngineSection; 