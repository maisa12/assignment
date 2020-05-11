let search = function (array, value){
    let high = array.length - 1;
    let low = 0;
    let mid = 0;
    while(low<=high){
        mid = Math.floor((high+low) / 2);
        if(array[mid].employeeNo==value){
            return array[mid]
        }else if(value > array[mid]){
            low = mid+1;
        }
        else{
            high = mid -1;
        }
    }
    return -1 
};
module.exports = search;
