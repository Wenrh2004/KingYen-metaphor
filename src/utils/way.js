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

// 获取图片
export const getObjectURL = (file) => {
    var url = null;
    if (window.createObjectURL != undefined) {  //  basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {   //  mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {   //  webkit or chrome
        url = window.webkitURL.createObjectURL(file)
    }
    return url;
}