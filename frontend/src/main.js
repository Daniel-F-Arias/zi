import { Login } from "./login.js";
import { Register } from "./register.js";
import { Tasks } from "./tasks.js";

const app = document.getElementById("app");

window.loadView = function(view) {
  switch(view) {
    case "login": app.innerHTML = Login(); break;
    case "register": app.innerHTML = Register(); break;
    case "tasks": app.innerHTML = Tasks(); break;
    default: app.innerHTML = "<h2>Bienvenido a Gestión de Tareas</h2>";
  }
}

// Cargar vista inicial
loadView("login");
