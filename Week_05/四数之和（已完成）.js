var fourSum = function(nums, target) {
    //先排序
    nums = nums.sort((a,b)=>{
        return a-b
    })
    //取出特殊值
    if(nums.length<4) return []
    let length = nums.length
 
  
    //结果值
    let res = []
    for (let i = 0; i <= length-4; i++) {
        for (let j = i+1; j <= length-3; j++) {
            let m = j+1
            let n = length-1
            let final = target-nums[i]-nums[j]
            while(m<n){
                let cur = nums[m]+nums[n]
                if(final==cur){
                    res.push([nums[i],nums[j],nums[m],nums[n]])
                  
                    m++
                    n--
                }else if(final>cur){
                    m++
                }else if(final<cur){
                    n--
                }
            }
            
        }
    }

    //去重
    if(res.length){
        let map = {}
       
        for(let item of res){
            let itemStr = item.join(",")
            if(!map[itemStr]){
                map[itemStr] = 1
            }
        }
        let keys = Object.keys(map)
        res =   keys.map(item=>item.split(","))
    }
    return res

};
