const map = () => {
    let newMap = [];
    
    set(21,33,newMap);
    console.log(newMap)
    set(33,44,newMap);
    console.log(newMap)
    set(33,45,newMap);
    console.log(newMap)
    set(33,46,newMap);
    console.log(newMap)
    console.log(getValue(newMap, 21))
    console.log(has(newMap, 33));
    console.log(has(newMap, 34));
    newMap = deleteMap(newMap,33);
    console.log(newMap)
    console.log(getValues(newMap));
}

const getValues = (newMap) => {
    let values = [];
    newMap.forEach(x=> values.push(x.value))
    return values
}

const deleteMap = (map, key) => {
    if(has(map,key)){
        return map.filter(x=> x.key !== key);
    }
}

const has = (map,key) => {
    return !!map.filter(x=> x.key === key)[0];
}

const getValue = (map,key) => {
    return map.filter(x=> x.key === key)[0].value;
}

const set = (key,value,map) => {
    if(has(map,key)){
        return map.map(x=> {
            if(x.key === key) {
               return x.value = value;
            }
            return x;
        })
    }
    return map.push({key:key, value: value})
}

test.only('map', () => {
    expect(map()).toBe();
})

