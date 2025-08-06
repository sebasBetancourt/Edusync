export const findAllStudent = ()=>{
    const DB = (localStorage.getItem("students")) ? localStorage.getItem("students") : 0;
    return DB;
}