const quickSort = (arr) => {

    if(!arr[0]){
        return [];
    }
    const pivot = getPivot(arr);
    arr.pop();
    const [left, right] = distribute(arr,pivot);
    console.log(pivot,"piv", left,"lef",right,"ri")
    return [...quickSort(left), pivot, ...quickSort(right)]
}

const distribute = (arr,pivot) => {
    let left = [];
    let right = [];
    arr.forEach(x=> {
        if(x.phone > pivot.phone) {
            right.push(x);
            return;
        }
        left.push(x);
    });

    return [left,right];
}
 
const getPivot = (arr) => {
    return arr[arr.length-1];
}





describe('quickSort', () => {
    it('returns sorted array', () => {
      const phoneBook = [
        { name: 'f', phone: 6 },
        { name: 'b', phone: 2 },
        { name: 'd', phone: 4 },
        { name: 'c', phone: 3 },
        { name: 'a', phone: 1 },
        { name: 'e', phone: 5 },
      ];
  
      const expectResult = [
        { name: 'a', phone: 1 },
        { name: 'b', phone: 2 },
        { name: 'c', phone: 3 },
        { name: 'd', phone: 4 },
        { name: 'e', phone: 5 },
        { name: 'f', phone: 6 },
      ];
  
      expect(quickSort(phoneBook)).toEqual(expectResult);
    });
  });
  