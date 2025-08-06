export const changeContent = (seccion, students, courses, payments, users) => {
    students = students || Number(localStorage.getItem("students")) || 0;
    courses = courses || Number(localStorage.getItem("course")) || 0;
    users = users || Number(localStorage.getItem("users")) || 0;

    payments = payments || JSON.parse(localStorage.getItem("payment") || '{"format":"COP", "total":0}');

    let main = document.getElementById("content");

    if (seccion === "Home") {
        main.innerHTML = `
            <div id="students" class="div__container">
                <div>
                    <img src="../storage/img/Student_Dashboard.svg">
                    <span>Students</span>
                </div>
                <strong>${students}</strong>
            </div>
            <div id="course" class="div__container">
                <div>
                    <img src="../storage/img/Course_Dashboard.svg">
                    <span>Course</span>
                </div>
                <strong>${courses}</strong>
            </div>
            <div id="payment" class="div__container">
                <div>
                    <img src="../storage/img/Payment_DashBoard.svg">
                    <span>Payments</span>
                </div>
                <strong data-format="${payments.format}">${payments.total}</strong>
            </div>
            <div id="user" class="div__container">
                <div>
                    <img src="../storage/img/Users_Dashboard.svg">
                    <span>Users</span>
                </div>
                <strong>${users}</strong>
            </div>
        `;
    } else if (seccion === "Course") {
        main.innerHTML = "<h2>Página de Course</h2>";
    } else if (seccion === "Students") {
        main.innerHTML = "<h2>Página de Students</h2>";
    } else if (seccion === "Payment") {
        main.innerHTML = "<h2>Página de Payment</h2>";
    } else if (seccion === "Report_menu_nav") {
        main.innerHTML = "<h2>Página de Report</h2>";
    } else if (seccion === "Settings") {
        main.innerHTML = "<h2>Página de Settings</h2>";
    }
};



document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu_nav");

    const activeSection = localStorage.getItem("activeSection");
    if (activeSection) {
        document.querySelector(`.menu_nav[data-section="${activeSection}"]`)?.classList.add("active");
    }

    menuItems.forEach(menu => {
        const button = menu.querySelector("button");
        if (button) {
            menu.setAttribute("data-section", button.getAttribute("data-section"));

            button.addEventListener("click", function () {
                menuItems.forEach(item => item.classList.remove("active"));

                menu.classList.add("active");

                if (menu.getAttribute("data-section") !== "Logout") {
                    localStorage.setItem("activeSection", menu.getAttribute("data-section"));
                }
            });
        }
    });
});
