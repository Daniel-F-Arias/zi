import { renderLogin, addLoginLogic } from "./login.js";

export function renderRegister() {
  return `
    <div class="register-container">
      <div class="register-card">
        <img src="logo.png" alt="Logo" class="logo" />
        <h2>Crear cuenta</h2>
        <form id="registerForm" novalidate>
          <input type="text" id="nombres" placeholder="Nombres" required />
          <div class="error" id="error-nombres"></div>

          <input type="text" id="apellidos" placeholder="Apellidos" required />
          <div class="error" id="error-apellidos"></div>

          <input type="number" id="edad" placeholder="Edad" required />
          <div class="error" id="error-edad"></div>

          <input type="email" id="email" placeholder="Correo electrónico" required />
          <div class="error" id="error-email"></div>

          <input type="password" id="password" placeholder="Contraseña" required />
          <div class="error" id="error-password"></div>

          <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" required />
          <div class="error" id="error-confirm"></div>

          <button type="submit" id="registerBtn" disabled>Registrarse</button>
          <div id="spinner" class="hidden">⏳ Procesando...</div>
        </form>
        <p>¿Ya tienes cuenta? 
          <a href="/login" id="goToLogin">Inicia sesión</a>
        </p>
      </div>
      <div id="toast" class="toast hidden">Cuenta creada con éxito</div>
    </div>
  `;
}

export function addRegisterLogic() {
  const form = document.getElementById("registerForm");
  const btn = document.getElementById("registerBtn");
  const spinner = document.getElementById("spinner");
  const toast = document.getElementById("toast");

  const inputs = {
    nombres: form.nombres,
    apellidos: form.apellidos,
    edad: form.edad,
    email: form.email,
    password: form.password,
    confirm: form.confirmPassword,
  };

  // Validar un campo específico (muestra/oculta error SOLO de ese campo)
  function validateField(field) {
    if (field === "nombres") {
      if (inputs.nombres.value.trim() === "") {
        return showError("nombres", "Ingrese sus nombres"), false;
      } else hideError("nombres");
    }

    if (field === "apellidos") {
      if (inputs.apellidos.value.trim() === "") {
        return showError("apellidos", "Ingrese sus apellidos"), false;
      } else hideError("apellidos");
    }

    if (field === "edad") {
      const edad = parseInt(inputs.edad.value, 10);
      if (isNaN(edad) || edad < 13) {
        return showError("edad", "Edad ≥ 13"), false;
      } else hideError("edad");
    }

    if (field === "email") {
      if (!/\S+@\S+\.\S+/.test(inputs.email.value)) {
        return showError("email", "Correo inválido"), false;
      } else hideError("email");
    }

    if (field === "password") {
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passRegex.test(inputs.password.value)) {
        return showError("password", "Mínimo 8 caracteres, mayúscula, número y carácter especial"), false;
      } else hideError("password");
    }

    if (field === "confirm") {
      if (inputs.password.value !== inputs.confirm.value || inputs.confirm.value === "") {
        return showError("confirm", "Las contraseñas no coinciden"), false;
      } else hideError("confirm");
    }

    return true;
  }

  // Verifica si todo el formulario es válido (pero sin mostrar errores masivos)
  function isFormValid() {
    return (
      inputs.nombres.value.trim() !== "" &&
      inputs.apellidos.value.trim() !== "" &&
      parseInt(inputs.edad.value, 10) >= 13 &&
      /\S+@\S+\.\S+/.test(inputs.email.value) &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(inputs.password.value) &&
      inputs.password.value === inputs.confirm.value &&
      inputs.confirm.value !== ""
    );
  }

  // Mostrar error
  function showError(field, msg) {
    document.getElementById(`error-${field}`).innerText = msg;
  }

  // Ocultar error
  function hideError(field) {
    document.getElementById(`error-${field}`).innerText = "";
  }

  // Validación en tiempo real → SOLO campo editado + estado del botón
  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      validateField(key);       // valida ese campo
      btn.disabled = !isFormValid(); // habilita solo si todo está correcto
    });
  });

  // Enviar formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    spinner.classList.remove("hidden");
    btn.disabled = true;

    // Simular backend (2s, máx 3s)
    setTimeout(() => {
      spinner.classList.add("hidden");
      toast.classList.remove("hidden");

      console.log("Usuario creado:", {
        id: Date.now(),
        nombres: inputs.nombres.value,
        apellidos: inputs.apellidos.value,
        edad: inputs.edad.value,
        email: inputs.email.value,
      });

      setTimeout(() => {
        toast.classList.add("hidden");

        // Redirigir a login
        history.pushState({}, "", "/login");
        document.getElementById("app").innerHTML = renderLogin();
        addLoginLogic();
      }, 500); // redirección ≤ 500 ms
    }, 2000);
  });

  // Botón para ir a login
  document.getElementById("goToLogin").addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState({}, "", "/login");
    document.getElementById("app").innerHTML = renderLogin();
    addLoginLogic();
  });
}
