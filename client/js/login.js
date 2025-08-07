document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    if (!form) {
        console.error("Formulario no encontrado");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        errorMessage.style.display = "none"; // Ocultar mensaje de error previo

        try {
            // Simular llamada a una API de autenticación
            const response = await loginUser(email, password);

            if (response.success) {
                // Guardar el token (si usas JWT) u otros datos en localStorage
                localStorage.setItem("token", response.token || "dummy-token");
                // Redirigir a workspace.html
                window.location.href = "./views/workspace.html";
            } else {
                throw new Error(response.message || "Credenciales inválidas");
            }
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
    });

    // Función para simular la llamada a la API de login
    async function loginUser(email, password) {
        // TODO: Reemplazar con la llamada real a tu API
        // Ejemplo: const response = await fetch("https://your-api-endpoint/login", { ... })
        return new Promise((resolve, reject) => {
            // Simulación: aceptar cualquier email/contraseña por ahora
            if (email && password) {
                resolve({ success: true, token: "dummy-token" });
            } else {
                reject({ success: false, message: "Por favor, completa todos los campos" });
            }
        });
    }
});