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
    
    changeContent("Home", students, courses, payments, users);
});

