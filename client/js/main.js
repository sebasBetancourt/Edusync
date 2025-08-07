export const changeContent = (section, students, courses, payments, users) => {
    const main = document.getElementById("content");
    if (!main) {
        console.error("Element #content not found");
        return;
    }

    // Mostrar estado de carga
    const loading = document.getElementById("loading");
    if (loading) {
        loading.style.display = "block";
    }

    // Usar datos de localStorage como respaldo
    students = students || Number(localStorage.getItem("students")) || 100;
    courses = courses || Number(localStorage.getItem("course")) || 23;
    users = users || Number(localStorage.getItem("users")) || 200;
    payments = payments || JSON.parse(localStorage.getItem("payment") || '{"format":"COP", "total":3000}');

    // Limpiar contenido existente
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    // Crear contenedor para el contenido
    const container = document.createElement("div");
    container.className = "section-container";

    // Generar contenido según la sección
    switch (section) {
        case "Home": {
            // Replicar el diseño exacto del HTML original
            const containerBox = document.createElement("div");
            containerBox.className = "section-box";
            container.appendChild(containerBox)
            const textDiv = document.createElement("div");
            textDiv.className = "text-home";
            textDiv.innerHTML = `<h1><strong>EduSync</strong> - Sincroniza tu Comunidad Educativa</h1>
                                <p>El Sistema de Gestión Académica es una aplicación web desarrollada con Node.js 
                                puro (sin frameworks como Express) y MongoDB (usando el driver oficial, sin Mongoose) 
                                para gestionar estudiantes, cursos, pagos y usuarios en una institución educativa. Utiliza JWT 
                                para autenticación, $jsonSchema para validaciones de datos, transacciones para operaciones críticas, 
                                y roles para control de acceso. La interfaz web se basa en una plantilla HTML proporcionada, 
                                con formularios para operaciones CRUD y gráficos generados con Chart.js. El proyecto aplica principios 
                                SOLID y los patrones de diseño Repository y Factory para garantizar un código modular, 
                                mantenible y escalable.</p>`;
            containerBox.appendChild(textDiv);
            const studentsDiv = document.createElement("div");
            studentsDiv.id = "students";
            studentsDiv.className = "div__container";
            studentsDiv.innerHTML = `
                <div>
                    <img src="../storage/img/Student_Dashboard.svg" alt="Students Icon">
                    <span>Students</span>
                </div>
                <strong>${students}</strong>
            `;
            containerBox.appendChild(studentsDiv);

            const courseDiv = document.createElement("div");
            courseDiv.id = "course";
            courseDiv.className = "div__container";
            courseDiv.innerHTML = `
                <div>
                    <img src="../storage/img/Course_Dashboard.svg" alt="Course Icon">
                    <span>Course</span>
                </div>
                <strong>${courses}</strong>
            `;
            containerBox.appendChild(courseDiv);

            const paymentDiv = document.createElement("div");
            paymentDiv.id = "payment";
            paymentDiv.className = "div__container";
            paymentDiv.innerHTML = `
                <div>
                    <img src="../storage/img/Payment_DashBoard.svg" alt="Payment Icon">
                    <span>Payments</span>
                </div>
                <strong data-format="${payments.format}">${payments.total}</strong>
            `;
            containerBox.appendChild(paymentDiv);

            const userDiv = document.createElement("div");
            userDiv.id = "user";
            userDiv.className = "div__container";
            userDiv.innerHTML = `
                <div>
                    <img src="../storage/img/Users_Dashboard.svg" alt="Users Icon">
                    <span>Users</span>
                </div>
                <strong>${users}</strong>
            `;
            containerBox.appendChild(userDiv);
            break;
        }
        case "Course": {
            const heading = document.createElement("h2");
            heading.textContent = "Courses";
            container.appendChild(heading);

            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Instructor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${getSimulatedCourses().map(course => `
                        <tr>
                            <td>${course.id}</td>
                            <td>${course.name}</td>
                            <td>${course.instructor}</td>
                            <td><button>Edit</button> <button>Delete</button></td>
                        </tr>
                    `).join("")}
                </tbody>
            `;
            container.appendChild(table);
            break;
        }
        case "Students": {
            const heading = document.createElement("h2");
            heading.textContent = "Students";
            container.appendChild(heading);

            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${getSimulatedStudents().map(student => `
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.email}</td>
                            <td><button>Edit</button> <button>Delete</button></td>
                        </tr>
                    `).join("")}
                </tbody>
            `;
            container.appendChild(table);
            break;
        }
        case "Payment": {
            const heading = document.createElement("h2");
            heading.textContent = "Payments";
            container.appendChild(heading);

            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${getSimulatedPayments().map(payment => `
                        <tr>
                            <td>${payment.id}</td>
                            <td>${payment.student}</td>
                            <td>${payment.format} ${payment.amount}</td>
                            <td>${payment.date}</td>
                            <td><button>View</button></td>
                        </tr>
                    `).join("")}
                </tbody>
            `;
            container.appendChild(table);
            break;
        }
        case "Report": {
            const heading = document.createElement("h2");
            heading.textContent = "Reports";
            container.appendChild(heading);

            const reportList = document.createElement("ul");
            reportList.style.listStyle = "none";
            reportList.style.padding = "0";
            getSimulatedReports().forEach(report => {
                const li = document.createElement("li");
                li.style.padding = "10px";
                li.style.borderBottom = "1px solid var(--color-7)";
                li.innerHTML = `
                    <strong>${report.title}</strong> - Generated on ${report.date}
                    <button style="margin-left: 10px;">Download</button>
                `;
                reportList.appendChild(li);
            });
            container.appendChild(reportList);
            break;
        }
        case "Settings": {
            const heading = document.createElement("h2");
            heading.textContent = "Settings";
            container.appendChild(heading);

            const form = document.createElement("form");
            form.innerHTML = `
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Enter username" value="Ana Gómez">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Enter email" value="ana.gomez@example.com">
                <label for="theme">Theme</label>
                <select id="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
                <button type="submit">Save Changes</button>
            `;
            container.appendChild(form);
            break;
        }
        default: {
            const heading = document.createElement("h2");
            heading.textContent = "Sección no encontrada";
            container.appendChild(heading);
        }
    }

    main.appendChild(container);
    if (loading) {
        loading.style.display = "none";
    }
};

// Datos simulados (reemplazar con API más tarde)
const getSimulatedCourses = () => [
    { id: 1, name: "Mathematics 101", instructor: "Prof. Smith" },
    { id: 2, name: "Programming Basics", instructor: "Dr. Jones" }
];

const getSimulatedStudents = () => [
    { id: 1, name: "Juan Pérez", email: "juan@example.com" },
    { id: 2, name: "María Gómez", email: "maria@example.com" }
];

const getSimulatedPayments = () => [
    { id: 1, student: "Juan Pérez", amount: 1500, format: "COP", date: "2025-08-01" },
    { id: 2, student: "María Gómez", amount: 2000, format: "COP", date: "2025-08-02" }
];

const getSimulatedReports = () => [
    { title: "Student Performance Q1", date: "2025-03-15" },
    { title: "Payment Summary", date: "2025-06-20" }
];

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Datos iniciales (simulados o de localStorage)
    const students = Number(localStorage.getItem("students")) || 100;
    const courses = Number(localStorage.getItem("course")) || 23;
    const users = Number(localStorage.getItem("users")) || 200;
    const payments = JSON.parse(localStorage.getItem("payment") || '{"format":"COP", "total":3000}');

    // Establecer "Home" como activo por defecto
    let activeSection = localStorage.getItem("activeSection") || "Home";
    localStorage.setItem("activeSection", activeSection);

    // Cargar contenido inicial
    changeContent(activeSection, students, courses, payments, users);

    // Configurar el menú
    const menuItems = document.querySelectorAll(".menu_nav");
    const activeMenu = document.querySelector(`.menu_nav[data-section="${activeSection}"]`);
    if (activeMenu) {
        activeMenu.classList.add("active");
    }

    menuItems.forEach(menu => {
        const button = menu.querySelector("button");
        if (button) {
            menu.setAttribute("data-section", button.getAttribute("data-section"));

            button.addEventListener("click", () => {
                menuItems.forEach(item => item.classList.remove("active"));
                menu.classList.add("active");

                const section = menu.getAttribute("data-section");
                if (section !== "Logout") {
                    localStorage.setItem("activeSection", section);
                    changeContent(section, students, courses, payments, users);
                } else {
                    localStorage.removeItem("activeSection");
                    window.location.href = "../index.html";
                }
            });
        }
    });
});