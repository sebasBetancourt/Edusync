export const findAllUsers = ()=>{
    const DB = (localStorage.getItem("users")) ? localStorage.getItem("users") : 0;
    return DB;
}