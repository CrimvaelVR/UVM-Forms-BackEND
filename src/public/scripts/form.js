let questionCounter = 0; // Variable para contar el número de preguntas agregadas
let radioQuestionsDiv; // Variable para almacenar el div donde se guardarán las preguntas tipo "radio"

// Función para eliminar todos los botones de enviar existentes
function removeSendButtons() {
  const sendButtons = document.querySelectorAll(".sendButton");
  sendButtons.forEach((button) => button.remove());
}

// Función para añadir una nueva pregunta al contenedor
function addQuestion() {
  const question = document.getElementById("question").value;
  const questionType = document.getElementById("questionType").value;

  if (question.trim() === "") {
    alert("Por favor, ingresa una pregunta válida.");
    return;
  }

  let questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.innerHTML = `<input type="text" style="background: none; border: none; color:white" value="${question}">`;

  if (questionType === "text") {
    questionElement.innerHTML += '<input type="text" placeholder="Respuesta">';

  } else if (questionType === "options") {
    const options = document.getElementById("options").value.split(",");
    let selectOptions = "";
    for (const option of options) {
      selectOptions += `<option value="${option.trim()}">${option.trim()}</option>`;
    }
    questionElement.innerHTML += `<select>${selectOptions}</select>`;
    
  } else if (questionType === "select") {
    const options = document.getElementById("options").value.split(",");
    let radioOptions = "";
    for (const option of options) {
      radioOptions += `<div class="questionRadio"><input type="radio" name="radioOptions" value="${option.trim()}">${option.trim()}</div>`;
    }
    questionElement.innerHTML +=`<div class="questionOption">${radioOptions}</div>`;
  }

  document.getElementById("questionsContainer").appendChild(questionElement);

  questionCounter++;

  // Eliminamos los botones de enviar existentes
  removeSendButtons();

  // Mostrar el botón de enviar solo si hay al menos una pregunta
  if (questionCounter > 0) {
    const sendButton = document.createElement("input");
    sendButton.type = "submit";
    sendButton.value = "Enviar";
    sendButton.classList.add("sendButton"); // Agregamos una clase para identificar el botón de enviar
    sendButton.addEventListener("click", submitForm);
    document.getElementById("questionsContainer").appendChild(sendButton);
  }
}


function AddTitulo(){
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;

  
}



function submitForm() {
  // Aquí puedes implementar la lógica para enviar el formulario
  alert("Formulario enviado!");
}

// Mostrar u ocultar el campo de opciones dependiendo del tipo de pregunta seleccionada
document.getElementById("questionType").addEventListener("change", function () {
  const optionsContainer = document.getElementById("optionsContainer");
  if (this.value === "options"||this.value === "select") {
    optionsContainer.style.display = "flex";
  } else {
    optionsContainer.style.display = "none";
  }
});
