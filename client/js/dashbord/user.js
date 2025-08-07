// user.js
export const findAllUsers = async () => {
    try {
        const response = await fetch("https://your-api-endpoint/users");
        if (!response.ok) throw new Error("Error al obtener usuarios");
        return await response.json();
    } catch (error) {
        console.error("Error en findAllUsers:", error);
        return [];
    }
};