import { changeContent } from "../redirection.js";
import { findAllStudent } from "./students.js";
import { findAllCourse } from "./course.js";
import { findAllPayments } from "./payments.js";
import { findAllUsers } from "./user.js";

window.changeContent = changeContent;

document.addEventListener("DOMContentLoaded", () => {
    const students = findAllStudent();
    const courses = findAllCourse();
    const users = findAllUsers();
    const money = JSON.parse(findAllPayments());
    const payments = money;

    // Establecer "Home" como activo por defecto si no hay sección activa en localStorage
    let activeSection = localStorage.getItem("activeSection") || "Home";
    localStorage.setItem("activeSection", activeSection);

    // Actualizar el contenido inicial
    changeContent(activeSection, students, courses, payments, users);

    // Seleccionar todos los elementos del menú
    const menuItems = document.querySelectorAll(".menu_nav");

    // Establecer el botón activo según activeSection
    const activeMenu = document.querySelector(`.menu_nav[data-section="${activeSection}"]`);
    if (activeMenu) {
        activeMenu.classList.add("active");
    }

    // Agregar evento de clic a cada botón del menú
    menuItems.forEach(menu => {
        const button = menu.querySelector("button");
        if (button) {
            menu.setAttribute("data-section", button.getAttribute("data-section"));

            button.addEventListener("click", function () {
                // Remover la clase active de todos los elementos del menú
                menuItems.forEach(item => item.classList.remove("active"));

                // Agregar la clase active al elemento clicado
                menu.classList.add("active");

                // Obtener la sección del botón clicado
                const section = menu.getAttribute("data-section");

                // Guardar la sección activa en localStorage (excepto para Logout)
                if (section !== "Logout") {
                    localStorage.setItem("activeSection", section);
                    // Actualizar el contenido dinámico
                    changeContent(section, students, courses, payments, users);
                } else {
                    // Manejar el logout (por ejemplo, redirigir al login)
                    localStorage.removeItem("activeSection");
                    window.location.href = "../index.html"; // Redirigir al login
                }
            });
        }
    });
});