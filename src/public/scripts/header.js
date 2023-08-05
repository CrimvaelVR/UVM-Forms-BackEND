
    
    // OBtiene el elemento hamburguesa
    var hamburger = document.querySelector(".hamburger");
  
    // Añade un click listener a la hamburguesa
    hamburger.addEventListener("click", function() {
      
      //  Enciende la clase activa en el elemento hamburguesa
      hamburger.classList.toggle("active");
      
    });
    
    // Consigue los links del header-right
    var links = document.querySelectorAll(".header-right a");
    
    //Añade un event click listener a cada link
    links.forEach(function(link) {
      link.addEventListener("click", function() {
        
        // Elimina
        hamburger.classList.remove("active");
        
      });
    });

    // Obtiene el link de servicios
    var serviciosLink = document.querySelector("#servicios");

    // Añade un event click listener al link de servicios
    serviciosLink.addEventListener("click", function() {
      // Obtiene diferentes partes del HTML
      var heroSection = document.querySelector(".hero");
      var programasDestacadosSection = document.querySelector(".programas-destacados");
      var noticiasSection = document.querySelector(".noticias");
      var body = document.querySelector("body")


      

      // Añade la clase oculto a esos elementos para ocultarlos
      body.classList.add("fondo-servicios");
      heroSection.classList.add("oculto");
      programasDestacadosSection.classList.add("oculto");
      noticiasSection.classList.add("oculto");
      // Añade la clase activo a los lista-estudiantes y a h1gestor
      var h1gestor = document.querySelector(".titulo-gestor")
      var listaEstudiantesSection = document.querySelector(".container");
      listaEstudiantesSection.classList.add("activo");
      h1gestor.classList.add("activo")

    });

    //OBTIENE EL LINK DE IJNICIO
    var inicioLink = document.querySelector("#inicio");

    // AÑADE EL EVENT CLICK LISTENER AL INICIO LINK
    inicioLink.addEventListener("click", function() {
      // OBTIENE ELEMENTOS DEL HTML
      var heroSection = document.querySelector(".hero");
      var programasDestacadosSection = document.querySelector(".programas-destacados");
      var noticiasSection = document.querySelector(".noticias");
      var body = document.querySelector("body");


      // QUITA LA CLASE FONDO SERVICIOS Y LOS OCULTOS 
      body.classList.remove("fondo-servicios");

      heroSection.classList.remove("oculto");
      programasDestacadosSection.classList.remove("oculto");
      noticiasSection.classList.remove("oculto");
      // AÑADE LOS OCULTOS NUEVAMENTE A h1gestor y LISTAESTUDIANTES
      var h1gestor = document.querySelector(".titulo-gestor")
      var listaEstudiantesSection = document.querySelector(".container");
      listaEstudiantesSection.classList.remove("activo");
      h1gestor.classList.remove('activo')

    });
    

 // Obtener el header-right
  var headerRight = document.querySelector(".header-right");

  // Obtener el logo
  var logo = document.querySelector(".logo");

  // Añadir un click listener al logo
  logo.addEventListener("click", function() {
    
    //Encender la active en header right
    headerRight.classList.toggle("active");
    
  });

  // Obtiene el cta
  var cta = document.querySelector(".cta");

  // Añade un scroll 
  window.addEventListener("scroll", function() {

    // Obtiene la posición del
    var scrollPos = window.scrollY;

    // Si la posición de desplazamiento es superior a 100, aplicara animaciones al cta
    if (scrollPos > 1000) {

      // Reduce el tamaño
      cta.style.transform = "scale(0.9)";


      // Reduce la opacidad
      cta.style.opacity = "0.8";

      // Filtro blur al cta
      cta.style.filter = "blur(2px)";

    } else {

      // Resetea el tamaño de lo contrario
      cta.style.transform = "scale(1)";


      // Resetea la opacidad
      cta.style.opacity = "1";

      // Resetea el filtro
      cta.style.filter = "none";

    }
    
    
  });


  

  
  