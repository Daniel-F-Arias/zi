import { renderRegister, addRegisterLogic } from "./register.js";

export function renderLogin() {
  return `
    <div class="login-container">
      <div class="login-card">
      <img src="logo.png" alt="Logo" class="logo" />
        <h2>Inicia sesión</h2>
        <form id="loginForm">
          <input type="email" id="email" placeholder="Correo electrónico" required />
          <input type="password" id="password" placeholder="Contraseña" required />
          <button type="submit">Ingresar</button>
        </form>
        <p>
          <a href="#" id="forgotPassword">¿Olvidaste tu contraseña?</a>
        </p>
        <p>¿No tienes cuenta? 
          <a href="/signup" id="goToRegister">Regístrate aquí</a>
        </p>
      </div>
    </div>
  `;
}

export function addLoginLogic() {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    console.log("Intento de login:", { email, password });
    alert("Inicio de sesión (simulado)");
  });

  // Cambiar a /signup
  document.getElementById("goToRegister").addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState({}, "", "/signup");
    document.getElementById("app").innerHTML = renderRegister();
    addRegisterLogic();
  });

  // Recuperar contraseña
  document.getElementById("forgotPassword").addEventListener("click", (e) => {
    e.preventDefault();
    const email = prompt("Ingresa tu correo para recuperar la contraseña:");
    if (email) {
      alert(`Si existe una cuenta con ${email}, te enviaremos un enlace de recuperación.`);
      console.log("Recuperación enviada a:", email);
    }
  });
}
