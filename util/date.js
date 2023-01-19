export function getFormatedDate(date){
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${date.getFullYear()}-${month}-${day}`;
}

export function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}