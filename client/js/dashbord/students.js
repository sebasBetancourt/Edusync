// students.js
export const findAllStudent = async () => {
    try {
        const response = await fetch("https://your-api-endpoint/students");
        if (!response.ok) throw new Error("Error al obtener estudiantes");
        return await response.json(); // Suponiendo que devuelve un array de estudiantes
    } catch (error) {
        console.error("Error en findAllStudent:", error);
        return []; // Valor por defecto en caso de error
    }
};