const DoublyLinkedList = require('../doublyLinkedList.test.js');

// - hastable의 배열과 그 안에 있는 list를 new Array(버켓 길이).fill().map(e=> e =  new DoublyLinkedList()); 로 해서 만든다.
// - hashFunction은 문자열들 하나하나를 charat로 ascii코드로 바꿔서 reduce를 써서 더한후  % 를 써서 나머지의 값을 얻는다.
// - set은 hashFunction을 이용해 구한 인덱스에 해당하는 value 값을 넣을때 DoublyLinkedList의 append를 쓰자.
// - delete는 DoublyLinkedList의 remove 쓰면됨
// - has는 DoublyLinkedList의 find를 쓰면됨
// - get(key)는 find를 조금 변형해서 쓰면됨
// - getKeys()는 toArray를 쓰면됨
// class Hash {
//     constructor(index, value) {

//     }
// }

class HashTable extends DoublyLinkedList {
    constructor(size) {
        super();
        this.size = size;
        this.HashArray = new Array(size).fill().map( x=> x = []);
    }

    hashFunction (key) {
      return key.split('').reduce((prev, curr) => {
        return prev += curr.charCodeAt();
        },0)%this.size;
    }

    set(key, value) {
        this.HashArray[this.hashFunction(key)].push({ key, value });
        // console.log(this.hashFunction(key))
        // console.log(this.HashArray[0].push(1))
    }

    has(key) {
        const result = this.HashArray[this.hashFunction(key)].filter(x => x.key === key)[0]
        if(!result){
            return false
        }
        return !!result.value   
     }


    get(key) {
        return this.HashArray[this.hashFunction(key)].filter(x => x.key === key)[0].value
        // return this.HashArray[this.hashFunction(key)].findValue(key)
    }

    delete(key) {
        this.HashArray[this.hashFunction(key)] = this.HashArray[this.hashFunction(key)].filter(x=> x.key !== key)
        return;
    }

    getKeys(key) {
        return this.HashArray[this.hashFunction(key)]
    }
}





test('setHashTable', () => {
    
    const table = new HashTable(3);
    
    table.set('abc', 23)
    expect(table.get('abc')).toBe(23)
    table.set('acb', 25)
    expect(table.get('acb')).toBe(25)
    
})

test('has', () => {
    
    const table = new HashTable(3);
    
    table.set('abc', 23)
    expect(table.has('abc')).toBe(true)
    table.set('bcd', 25)
    expect(table.has('bcd')).toBe(true)
    expect(table.has('dca')).toBe(false)
    
})

test('delete', () => {
    const table = new HashTable(3);
    
    table.set('abc', 23);
    table.set('acb', 25);
    table.set('cba', 26);
    table.delete('cba');
    table.delete('acb');
    expect(table.has('acb')).toBe(false);
    expect(table.has('abc')).toBe(true);
    
    table.set('이영한', 10);
    expect(table.get('이영한')).toBe(10);
    
    table.delete('이영한');
    expect(table.has('이영한')).toBeFalsy();
    
    table.set('전우민', 11);
    expect(table.get('전우민')).toBe(11);
    
    table.delete('전우민');
    expect(table.has('전우민')).toBeFalsy();
})


test('getKeys', () => {
    const table = new HashTable(3);
    
    table.set('abc', 23);
    table.set('acb', 25);
    table.set('cba', 26);
    console.log(table.HashArray);

    expect(table.getKeys('abc')).toEqual([
        { key: 'abc', value: 23 },
        { key: 'acb', value: 25 },
        { key: 'cba', value: 26 }
      ])

})
    
    
    // class HashTable extends DoublyLinkedList {
        //     constructor(size) {
    //         super();
    //         this.size = size;
    //         this.HashArray = new Array(size).fill([]);
    //     }
    
    //     hashFunction (key) {
    //       return key.split('').reduce((prev, curr) => {
    //         return prev += curr.charCodeAt();
    //         },0)%this.size;
    //     }
    
    //     set(key, value) {
    //         this.HashArray[this.hashFunction(key)].append(value, key);
    //         this.key = this.hashFunction(key)
    //         this.head = value;
    
    //     }
    
    //     has(key) {
    //         return this.HashArray[this.hashFunction(key)].findKey(key)
    //     }
    
    //     get(key) {
    //         return this.HashArray[this.hashFunction(key)].findValue(key)
    //     }
    
    //     delete(key) {
            
    //         this.HashArray[this.hashFunction(key)].removeKey(key);
    //         console.log(this.HashArray[this.hashFunction(key)]);
    //         return;
    //     }
    
    // }