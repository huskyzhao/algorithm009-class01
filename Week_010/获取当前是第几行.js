//获取当前是第几行
function getCurRow(date){
    let one = getOne(date)
    let cur = date.getDate()
    return parseInt((cur+one)/7)
     
}
//获取当前一号是星期几/0表示周日，1表示周一
function getOne(date){
    let time  = date.getTime()
    let OneDay = new Date(new Date(time).setDate(1))
    return OneDay.getUTCDay()
}

console.log(getCurRow(new Date(1593533006000)))//1
console.log(getCurRow(new Date(1593878606000)))//5
console.log(getCurRow(new Date(1594742606000)))//15
console.log(getCurRow(new Date(1595606606000)))//25
console.log(getCurRow(new Date(1594483406000)))//12
console.log(getCurRow(new Date(1596125006000)))//31