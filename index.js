const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];
// elemetos del dom
const formFinder = document.querySelector(".form__finder");
const inputIdPizza = document.querySelector(".input__number");
const namePizzaConteiner = document.querySelector(".name__pizza");
const idPizzaConteiner = document.querySelector(".id__pizza");
const imgPizzaConteiner = document.querySelector(".img__pizza");
const pizzaExisting = document.querySelector(".pizza__existing");
const alertErrorconteiner = document.querySelector(".pizza__null");
const ingredientesPizzaConteiner = document.querySelector(
  ".ingredientes__pizza"
);
const maxValue = pizzas.length;
const minValue = 1;
const pizzaSelection = JSON.parse(localStorage.getItem("pizza")) || [];
const savePizzaInLocalStorage = () => {
  localStorage.setItem("pizza", JSON.stringify(pizzaSelection));
};

// repeat functions

const isEmpty = (inputIdPizza) => {
  return !inputIdPizza.value.trim().length;
};
// function for valid id number in input
const isValidNumberId = (inputIdPizza) => {
  for (i = 0; i < pizzas.length; i++) {
    let valid = false;
    if (pizzas[i].id == inputIdPizza.value) {
      valid = true;
      return valid;
    }
  }
};
// funcion for render pizza
const renderPizza = () => {
  nombre = pizzaSelection[0].nombre;
  id = pizzaSelection[0].id;
  img = pizzaSelection[0].imagen;
  ingredientes = pizzaSelection[0].ingredientes;
  namePizzaConteiner.textContent = nombre;
  idPizzaConteiner.textContent = id;
  ingredientesPizzaConteiner.textContent = ingredientes;
  imgPizzaConteiner.setAttribute("src", img);
  pizzaExisting.style.display = "block";
  alertErrorconteiner.style.display = "none";
  return;
};
// function for when input is valid and for render pizza in window
const renderPizzaMain = () => {
  if (isEmpty(inputIdPizza)) {
    pizzaSelection.splice(0);
    savePizzaInLocalStorage();
    renderErrorEmpty();
    return;
  }

  if (!isValidNumberId(inputIdPizza)) {
    pizzaSelection.splice(0);
    savePizzaInLocalStorage();
    renderErrorId();
    return;
  } else {
    renderPizza();
  }
};

// function for when init page and the input is isEmpty
const renderPizzaInit = () => {
  if (pizzaSelection == "") {
    renderErrorEmpty;
  } else {
    renderPizza();
  }
};
// function for when there is no pizza with that id
renderErrorId = () => {
  alertErrorconteiner.style.display = "block";
  pizzaExisting.style.display = "none";
  alertErrorconteiner.textContent = "No existe una pizza con ese ID.";
};
// function for when input is Empty
const renderErrorEmpty = () => {
  alertErrorconteiner.style.display = "block";
  pizzaExisting.style.display = "none";
  alertErrorconteiner.textContent = "Debe ingresar un numero";
};

// form validating
const pizzasBrowserForm = (e) => {
  e.preventDefault();
  pizzaSelection.splice(0);
  pizzaSelection.push(pizzas[+inputIdPizza.value - 1]);
  savePizzaInLocalStorage();
  renderPizzaMain();
  return;
};

const init = () => {
  savePizzaInLocalStorage();
  renderPizzaInit();
  if (pizzaSelection == "") {
    renderErrorEmpty();
  }

  formFinder.addEventListener("submit", pizzasBrowserForm);
  inputIdPizza.addEventListener("input", () => isValidNumberId(inputIdPizza));
};

init();
