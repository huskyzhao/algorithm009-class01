var numDecodings = function(s) {
   return DFS(s,0)
};
//s为字符串，index为当前的开始位置
function DFS(s,index){
    //终止条件
    if(index>=s.length){
        return 0
    }
    if(index==s.length-1){
        console.log("dp1")
        return s[index]=="0"?0:1
    }
    //处理当前条件
    
    // while(s[index]=="0"){
    //     index++
    // }
    // let one = s[index]
    let oneCount = DFS(s,index+1)
    let two = s[index]+s[index+1]
    let twoCount = 0
    if(two<=26){
        twoCount = DFS(s,index+2)
    }
    console.log("dp"+index,oneCount+twoCount)
    return (oneCount+twoCount)

}

console.log(numDecodings("226"))