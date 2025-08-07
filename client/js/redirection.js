export const changeContent = (seccion, students, courses, payments, users) => {
    students = students || Number(localStorage.getItem("students")) || 0;
    courses = courses || Number(localStorage.getItem("course")) || 0;
    users = users || Number(localStorage.getItem("users")) || 0;

    payments = payments || JSON.parse(localStorage.getItem("payment") || '{"format":"COP", "total":0}');

    let main = document.getElementById("content");

    if (seccion === "Home") {
        main.innerHTML = "<h2>Página de Home</h2>";
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
