// Definir un objeto JSON con la información de los grados
const gradosJSON = `[
  { "nombre": "Error", "descripcion": "¡Por favor ingresa algún grado!" },
  { "nombre": "blanco", "descripcion": "Grado inicial en el Jiu-Jitsu Basileño: Fundamentos básicos y dedicación en el aprendizaje y práctica regular del BJJ." },
  { "nombre": "azul", "descripcion": "Grado básico en el Jiu-Jitsu Basileño: Conocimiento sólido de las técnicas fundamentales, capacidad para aplicarlas en situaciones de combate y experiencia en la participación en competiciones. Mínimo 2 años de entrenamiento." },
  { "nombre": "purpura", "descripcion": "Grado intermedio en el Jiu-Jitsu Basileño: Dominio de una amplia variedad de técnicas, habilidad para adaptarse a diferentes estilos de lucha y una comprensión profunda de las estrategias del BJJ. Mínimo 5 años de entrenamiento." },
  { "nombre": "cafe", "descripcion": "Grado avanzado en el Jiu-Jitsu Basileño: Perfeccionamiento de técnicas avanzadas, capacidad para enseñar y transmitir conocimientos a estudiantes y participación destacada en competiciones de alto nivel. Mínimo 7 años de entrenamiento." },
  { "nombre": "negro", "descripcion": "Grado experto en el Jiu-Jitsu Basileño: Dominio completo del arte, contribución significativa al desarrollo y promoción del BJJ, y reconocimiento por parte de la comunidad. Mínimo 12 años de entrenamiento." },
  { "nombre": "coral", "descripcion": "Grado maestro en el Jiu-Jitsu Basileño: Reconocimiento excepcional, dedicación de toda una vida al arte y contribución significativa al desarrollo del BJJ. Mínimo 25 años de entrenamiento." }
]`;

// Convertir el objeto JSON en un array de objetos JavaScript
const grados = JSON.parse(gradosJSON);
  
// Obtener referencias a los elementos del DOM
const formulario = document.getElementById("formulario");
const resultadoContainer = document.getElementById("resultado");
const detalleContainer = document.getElementById("detalle");
const inputBusqueda = document.getElementById("busquedaGrado");
const botonBuscar = document.getElementById("botonBuscar");
const botonLogout = document.getElementById("botonLogout");
const nombreUsuario = document.getElementById("nombreUsuario");

// Verificar si hay datos de usuario en el localStorage al cargar la página
window.addEventListener("load", function () {
  const nombreGuardado = localStorage.getItem("nombre");
  const gradoGuardado = localStorage.getItem("grado");
  const añosGuardado = localStorage.getItem("años");
  
  if (nombreGuardado && gradoGuardado && añosGuardado) {
    formulario.nombre.value = nombreGuardado;
    formulario.grado.value = gradoGuardado;
    formulario.años.value = añosGuardado;
    nombreUsuario.textContent = nombreGuardado;
    botonLogout.style.display = "inline-block";    
  }
});

//Manejador boton logout
botonLogout.addEventListener("click", function () {
  const nombreActual = formulario.nombre.value;
  localStorage.removeItem("nombre");
  localStorage.removeItem("grado");
  localStorage.removeItem("años");
  formulario.nombre.value = "";
  formulario.grado.value = "";
  formulario.años.value = "";
  nombreUsuario.textContent = "";
  botonLogout.style.display = "none";
  //alert(`Has cerrado sesión, ${nombreActual}`); CAMBIAR POR ALGUN FRAMEWORK PARA LA ULTIMA ENTREGA ;P
});
  
// Asignar un manejador de eventos al formulario
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const nombre = formulario.nombre.value.trim();
  const gradoActual = formulario.grado.value.toLowerCase();
  const añosEntrenando = parseInt(formulario.años.value);
  
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("grado", gradoActual);
  localStorage.setItem("años", añosEntrenando);
  
  let añosParaSiguienteGrado = 0;
  let gradoSiguiente = "";
  
  if (gradoActual === "blanco") {
    if (añosEntrenando >= 0) {
      añosParaSiguienteGrado = 2 - añosEntrenando;
      gradoSiguiente = "azul";
    } else {
      resultadoContainer.textContent = `Debe haber ingresado un número positivo de años, ${nombre}.`;
      return;
    }
  } else if (gradoActual === "azul") {
    if (añosEntrenando >= 2) {
      añosParaSiguienteGrado = 5 - añosEntrenando;
      gradoSiguiente = "purpura";
    } else {
      añosParaSiguienteGrado = 2 - añosEntrenando;
      if (añosParaSiguienteGrado < 0) {
        añosParaSiguienteGrado = 0;
      }
      resultadoContainer.textContent = `No llevas el tiempo suficiente para ser cinturón azul, ${nombre}. Faltan ${añosParaSiguienteGrado} años para alcanzarlo.`;
      return;
    }
  } else if (gradoActual === "purpura") {
    if (añosEntrenando >= 5) {
      añosParaSiguienteGrado = 7 - añosEntrenando;
      gradoSiguiente = "cafe";
    } else {
      añosParaSiguienteGrado = 5 - añosEntrenando;
      if (añosParaSiguienteGrado < 0) {
        añosParaSiguienteGrado = 0;
      }
      resultadoContainer.textContent = `No llevas el tiempo suficiente para ser cinturón purpura, ${nombre}. Faltan ${añosParaSiguienteGrado} años para alcanzarlo.`;
      return;
    }
  } else if (gradoActual === "cafe") {
    if (añosEntrenando >= 7) {
      añosParaSiguienteGrado = 10 - añosEntrenando;
      gradoSiguiente = "negro";
    } else {
      añosParaSiguienteGrado = 7 - añosEntrenando;
      if (añosParaSiguienteGrado < 0) {
        añosParaSiguienteGrado = 0;
      }
      resultadoContainer.textContent = `No llevas el tiempo suficiente para ser cinturón cafe, ${nombre}. Faltan ${añosParaSiguienteGrado} años para alcanzarlo.`;
      return;
    }
  } else if (gradoActual === "negro") {
    if (añosEntrenando >= 12) {
      añosParaSiguienteGrado = 25 - añosEntrenando;
      gradoSiguiente = "coral";
    } else {
      añosParaSiguienteGrado = 12 - añosEntrenando;
      if (añosParaSiguienteGrado < 0) {
        añosParaSiguienteGrado = 0;
      }
      resultadoContainer.textContent = `No llevas el tiempo suficiente para ser cinturón negro, ${nombre}. Faltan ${añosParaSiguienteGrado} años para alcanzarlo.`;
      return;
    }
  } else {
    resultadoContainer.textContent = "El grado ingresado no es válido.";
    return;
  }
  if (añosParaSiguienteGrado >= 0) {
    resultadoContainer.textContent = `${nombre}, te faltan ${añosParaSiguienteGrado} años para obtener el cinturón ${gradoSiguiente}. ¡Vamos que se puede!`;
  } else {
    const añosSuperados = Math.abs(añosParaSiguienteGrado);
    resultadoContainer.textContent = `${nombre}, ¡ya has superado el tiempo necesario para obtener el cinturón ${gradoSiguiente} por ${añosSuperados} años! Te recomiendo hablar con tu instructor...`;
  }
  
  // Limpiar el contenedor de detalles
  detalleContainer.textContent = "";
});

// Mostrar detalle de grado al hacer clic en el botón
function mostrarDetalleGrado(grado) {
  const gradoEncontrado = grados.find(gradoInfo => gradoInfo.nombre === grado);
  if (gradoEncontrado) {
    detalleContainer.textContent = `Detalle del cinturón ${gradoEncontrado.nombre}:\n${gradoEncontrado.descripcion}`;
  } else {
    detalleContainer.textContent = `No se encontró información para el cinturón ${grado}.`;
  }
}  

// Agregar funcionalidad de búsqueda
botonBuscar.addEventListener("click", function () {
  const textoBusqueda = inputBusqueda.value.trim().toLowerCase();
  buscarGrado(textoBusqueda);
});

function buscarGrado(textoBusqueda) {
  const gradoEncontrado = grados.find(
    (grado) =>
    grado.nombre.toLowerCase().includes(textoBusqueda) ||
    grado.descripcion.toLowerCase().includes(textoBusqueda)
    );
    
    if (gradoEncontrado) {
      detalleContainer.textContent = `\n${gradoEncontrado.nombre}: ${gradoEncontrado.descripcion}`;
    } else {
      detalleContainer.textContent = "No se encontró ningún grado que coincida con la búsqueda. Grados disponibles: Blanco, Azul, Purpura, Cafe, Negro y Coral.";
    }
  }