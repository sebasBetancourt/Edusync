// payments.js
export const findAllPayments = async () => {
    try {
        const response = await fetch("https://your-api-endpoint/payments");
        if (!response.ok) throw new Error("Error al obtener pagos");
        return await response.json(); // Suponiendo que devuelve un JSON serializado
    } catch (error) {
        console.error("Error en findAllPayments:", error);
        return '{"format":"COP", "total":0}';
    }
};