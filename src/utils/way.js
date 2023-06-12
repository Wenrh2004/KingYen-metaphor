// 时间方法
export const dateOne = (e) => {
    let date = new Date(e);
    let YYYY = date.getFullYear();
    let MM = date.getMonth() + 1;
    let DD = date.getDate();
    
    if (DD < 10) {
        DD = '0' + DD;
    }
    if (MM < 10) {
        MM = '0' + MM;
    }
    
    let dates = YYYY + '·' + MM + '·' + DD;
    return dates
}