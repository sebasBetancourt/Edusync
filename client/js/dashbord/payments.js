export const findAllPayments = ()=>{
    const DB = (localStorage.getItem("payment")) ? localStorage.getItem("payment") : JSON.stringify({format: "COP", total: 0});
    return DB;
}