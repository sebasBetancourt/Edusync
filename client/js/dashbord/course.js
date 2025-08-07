// course.js
export const findAllCourse = async () => {
    try {
        const response = await fetch("https://your-api-endpoint/courses");
        if (!response.ok) throw new Error("Error al obtener cursos");
        return await response.json();
    } catch (error) {
        console.error("Error en findAllCourse:", error);
        return [];
    }
};