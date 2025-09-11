import { renderLogin, addLoginLogic } from "./login.js";
import { renderRegister, addRegisterLogic } from "./register.js";

function router() {
  const path = window.location.pathname;

  if (path === "/signup") {
    document.getElementById("app").innerHTML = renderRegister();
    addRegisterLogic();
  } else {
    // por defecto /login
    document.getElementById("app").innerHTML = renderLogin();
    addLoginLogic();
  }
}

// Escuchar cambios de ruta
window.addEventListener("popstate", router);

// Cargar la vista inicial
router();
