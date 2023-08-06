
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
const addQuestionButton = document.getElementById("addQuestion");
const questionsContainer = document.getElementById("questionsContainer");
const questionType = document.getElementById('questionType')
const optionsContainer = document.getElementById('options-container')
let tipo
let questionValue = 1

questionType.addEventListener("change", () => {
  toggleOptionsContainer(questionType);
});

optionsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("addOption")) {
    event.preventDefault();

    const options = optionsContainer.querySelectorAll("[name=options]");
    const lastOption = options[options.length - 1];
    const lastOptionValue = parseInt(lastOption.value.slice(-1));
    const newOptionValue = lastOptionValue + 1;

    const newOptionDiv = document.createElement("div");
    newOptionDiv.classList.add("option");

    if (questionType.value === "select") {
      const newOptionRadio = document.createElement("input");
      newOptionRadio.type = "radio";
      newOptionRadio.name = "options";
      newOptionRadio.value = `Option ${newOptionValue}`;
      newOptionDiv.appendChild(newOptionRadio);
    } else if (questionType.value === "options") {
      const newOptionCheckbox = document.createElement("input");
      newOptionCheckbox.type = "checkbox";
      newOptionCheckbox.name = "options";
      newOptionCheckbox.value = `Option ${newOptionValue}`;
      newOptionDiv.appendChild(newOptionCheckbox);
    }
    const newOptionInput = document.createElement("input");
    newOptionInput.type = "text";
    newOptionInput.name = `Options${questionValue}`;

    newOptionInput.placeholder = `Option ${newOptionValue}`;
    newOptionDiv.appendChild(newOptionInput);

    optionsContainer.insertBefore(newOptionDiv, event.target);
  }
});

function toggleOptionsContainer(select) {
  const selectedType = select.value;
  const optionsContainer = select.parentElement.querySelector(".options-container");
  if (selectedType === "select") {
    optionsContainer.style.display = "block";
    optionsContainer.innerHTML = `
      <label for="options">Opciones</label>
      <div class="option">
        <input type="radio" name="options" value="Option 1">
        <input type="text" name="Options${questionValue}" placeholder="Option 1">
      </div>
      <div class="option">
        <input type="radio" name="options" value="Option 2">
        <input type="text" name="Options${questionValue}" placeholder="Option 2">
      </div>
      <button class="addOption">Agregar opción</button>
    `;
  } else if (selectedType === "options") {
    optionsContainer.style.display = "block";
    optionsContainer.innerHTML = `
      <label for="options">Opciones</label>
      <div class="option">
        <input type="checkbox" name="options" value="Option 1">
        <input type="text" name="Options${questionValue}" placeholder="Option 1">
      </div>
      <div class="option">
        <input type="checkbox" name="options" value="Option 2">
        <input type="text" name="Options${questionValue}" placeholder="Option 2">
      </div>
      <button class="addOption">Agregar opción</button>
    `;
  } else {
    optionsContainer.style.display = "none";
    optionsContainer.innerHTML = "";
  }

  optionsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("addOption")) {
      event.preventDefault();
    }
  });
}


addQuestionButton.addEventListener("click", () => {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("questionNew");
  questionValue = questionValue + 1
  const questionLabel = document.createElement("label");
  questionLabel.textContent = "Pregunta";
  const questionInput = document.createElement("input");
  questionInput.type = "text";
  questionInput.name = `textoPregunta${questionValue}`
  questionInput.classList.add("question-text");
  questionInput.placeholder = "Escribe tu pregunta aquí";

  const questionTypeLabel = document.createElement("label");
  questionTypeLabel.textContent = "Tipo de Pregunta";
  const select = document.createElement("select");
  select.name = `tipoPregunta${questionValue}`
  select.id = "questionType";
  const textOption = document.createElement("option");
  textOption.value = "text";
  textOption.textContent = "Pregunta de texto libre";
  select.appendChild(textOption);
  const selectOption = document.createElement("option");
  selectOption.value = "select";
  selectOption.textContent = "Pregunta de selección";
  select.appendChild(selectOption);
  const optionsOption = document.createElement("option");
  optionsOption.value = "options";
  optionsOption.textContent = "Pregunta de opciones";
  select.appendChild(optionsOption);

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");
  optionsContainer.style.display = "none";

  questionDiv.appendChild(questionLabel);
  questionDiv.appendChild(questionInput);
  questionDiv.appendChild(questionTypeLabel);
  questionDiv.appendChild(select);
  questionDiv.appendChild(optionsContainer);

  questionsContainer.appendChild(questionDiv);

  toggleOptionsContainer(select);

  select.addEventListener("change", () => {
    toggleOptionsContainer(select);
  });

  optionsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("addOption")) {
      event.preventDefault();

      const options = optionsContainer.querySelectorAll("[name=options]");
      const lastOption = options[options.length - 1];
      const lastOptionValue = parseInt(lastOption.value.slice(-1));
      const newOptionValue = lastOptionValue + 1;

      const newOptionDiv = document.createElement("div");
      newOptionDiv.classList.add("option");

      if (select.value === "select") {
        const newOptionRadio = document.createElement("input");
        newOptionRadio.type = "radio";
        newOptionRadio.name = "options";
        tipo = 'Selecion'
        newOptionRadio.value = `Option ${newOptionValue}`;
        newOptionDiv.appendChild(newOptionRadio);
      } else if (select.value === "options") {
        const newOptionCheckbox = document.createElement("input");
        newOptionCheckbox.type = "checkbox";
        newOptionCheckbox.name = "options";
        tipo = 'Opciones'
        newOptionCheckbox.value = `Option ${newOptionValue}`;
        newOptionDiv.appendChild(newOptionCheckbox);
      }

      const newOptionInput = document.createElement("input");
      newOptionInput.type = "text";
      newOptionInput.name = `Options${questionValue}`;
      
      newOptionInput.placeholder = `Option ${newOptionValue}`;
      newOptionDiv.appendChild(newOptionInput);

      optionsContainer.insertBefore(newOptionDiv, event.target);
    }
  });
});
