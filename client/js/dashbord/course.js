export const findAllCourse = ()=>{
    const DB = (localStorage.getItem("course")) ? localStorage.getItem("course") : 0;
    return DB;
}