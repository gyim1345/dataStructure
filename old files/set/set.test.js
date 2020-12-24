// - add(value), delete(value), getValues(), has(value), 
// size(), equals(other) 메서드가 있다. 작성.

// - 합집합은 두개의 집합에서 A,B를 정렬후 서로 비교하면서 넣는데 동일한 값이 있으면 그냥 리턴

// - 교집합은 두개의 집합에서 같은것을 찾아서 새로운 배열에 넣는다.

// - 차집합은 해당 배열의 교집합에 해당 되는 것들을 뺸것을 반환.

// - 부분집합 A가 C의 부분집합인지 확인 할때 C가 A 보다 크면 바로 false 아닐 시에  안에 값들을 비교한다. c.foreach(x=> x.find(A)) 대충 비슷하게.


class Set {
    constructor( ...values) {
        this.values = [...values];
    }
    
    add(value) {
        if(this.has(value)){
            return
        }
        this.values.push(value);
    }
    
    union(set) {
        set.values.forEach(value => this.add(value));   
        return this.values;
    }

    has(value) {
        return !!this.values.find(v=> v === value);
    }

    size() {
        return this.values.length;
    }

    getValues() {
        return this.values;
    }

    delete(value) {
        this.values = this.values.filter(e=> e != value);
    }

    equals(set){
        if(this.size() !== set.size()) {
            return false;
        }
        return this.values.every(v => set.has(v));
    }

    intersection(set) {
        return this.values.filter(e=> set.has(e));
    }

    difference(set) {
        return this.values.filter(e=> !set.has(e));
    }

    isSubset(set) {
        if(this.size() > set.size()) {
            return false
        }
        return  this.values.every(v => set.has(v));
    }

}

test('isSubset', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    set.add(6);
    
    const set2 = new Set();
    set2.add(5);
    set2.add(6);
    set2.add(7);
    set2.add(8);

    expect(set2.isSubset(set)).toBe(false);

    const set3 = new Set();
    set3.add(5);

    expect(set3.isSubset(set)).toBe(true);

    const set4 = new Set();
    set4.add(5);
    set4.add(2);

    set4.add(5);
    expect(set4.isSubset(set)).toBe(false);

    
    // const set3 = new Set();
    // set3.add(5);
    // set3.add(2);
    // set3.add(6);

    // expect(set.isSubset(set3)).toBe(false);

    
})
test('add', () => {
    const set = new Set();
    set.add(5);
    expect(set.has(5)).toBe(true);

    set.add(6);
    expect(set.has(6)).toBe(true);
    expect(set.has(2)).toBe(false);

    // set.add(6);
    // expect(set.has(6)).toBe(true);
    // expect(set.size()).toBe(2); 

})

test('size', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    expect(set.size()).toBe(1);
    set.add(6);
    expect(set.size()).toBe(2);
    
})

test('getValues', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    set.add(6);
    expect(set.getValues()).toEqual([5,6]);

})


test('delete', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    set.add(6);
    set.delete(5);
    expect(set.has(5)).toBe(false);

}
)

test('equals', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    set.add(6);

    const set2 = new Set();
    set2.add(5);
    set2.add(5);
    set2.add(6);

    expect(set.equals(set2)).toBe(true);

    const set3 = new Set();
    set3.add(5);
    set3.add(2);
    set3.add(6);

    expect(set.equals(set3)).toBe(false);

})


test('union', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    set.add(6);
    const set3 = new Set();
    set3.add(5);
    set3.add(2);
    set3.add(6);
    
    expect(set.union(set3)).toEqual([5,6,2]);

})

test('intersection', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    set.add(6);
    const set3 = new Set();
    set3.add(5);
    set3.add(2);
    set3.add(6);

    expect(set.intersection(set3)).toEqual([5,6]);
})

test('difference', () => {
    const set = new Set();
    set.add(5);
    set.add(5);
    set.add(6);
    const set3 = new Set();
    set3.add(5);
    set3.add(2);
    set3.add(6);

    expect(set.difference(set3)).toEqual([]);
    expect(set3.difference(set)).toEqual([2]);

})

