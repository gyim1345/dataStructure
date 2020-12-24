class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.count += 1;
      return;
    }

    if (this.head === this.tail) {
      this.head.next = newNode;
    }

    if (this.head !== this.tail) {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.count += 1;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.count += 1;
      return;
    }

    if (this.head === this.tail) {
      this.head = newNode;
      this.head.next = this.tail;
      this.count += 1;
      return;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.count += 1;
  }

  getHeadValue() {
    return this.head ? this.head.value : null;
  }

  getTailValue() {
    return this.tail ? this.tail.value : null;
  }

  isEmpty() {
    return !this.count;
  }

  getSize() {
    return this.count;
  }

  remove(value) {
    if (!this.head) {
      return;
    }
    let currentNode = this.head;
    let prevNode;
    while (currentNode.value !== value) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      if (!currentNode) {
        break;
      }
    }
    if (!currentNode) {
      return;
    }

    if (currentNode === this.head && currentNode === this.tail) {
      this.head = null;
      this.tail = null;
      this.count = 0;
      return;
    }

    if (currentNode === this.head) {
      this.head = this.head.next;
      this.count -= 1;
      return;
    }
    if (currentNode === this.tail) {
      this.tail = prevNode;
      this.count -= 1;
      return;
    }

    prevNode.next = currentNode.next;
    this.count -= 1;
  }

  toArray() {
    if (!this.head) {
      return [];
    }

    let currentNode = this.head;
    let nodeValues = [];
    while (currentNode) {
      nodeValues = [...nodeValues, currentNode.value];
      currentNode = currentNode.next;
    }
    return nodeValues;
  }

  insert(index, value) {
    const newNode = new Node(value);
    //헤드 없을시
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.count += 1;
      return;
    }

    //인덱스가 범위 밖이면 뒤에다 붙이기
    if (index + 1 > this.count) {
      this.tail.next = newNode;
      this.tail = newNode;
      this.count += 1;
      return;
    }

    //인덱스 0 혹은 그 이하로 넣을시에
    if (index <= 0) {
      newNode.next = this.head;
      this.head = newNode;
      this.count += 1;
      return;
    }

    // 그외 케이스
    let currentIndex = 0;
    let currentNode = this.head;
    let prevNode;
    while (currentIndex < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      currentIndex += 1;
    }

    prevNode.next = newNode;
    newNode.next = currentNode;
    this.count += 1;
  }
}

test('append', () => {
  const list = new LinkedList();

  expect(list.isEmpty()).toBe(true);

  list.append(1);
  expect(list.isEmpty()).toBe(false);

  expect(list.getHeadValue()).toBe(1);
  expect(list.getTailValue()).toBe(1);

  list.append(2);
  expect(list.getTailValue()).toBe(2);
  expect(list.getHeadValue()).toBe(1);

  list.append(3);
  expect(list.getTailValue()).toBe(3);
});

test('prepend', () => {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  list.prepend(0);
  expect(list.getHeadValue()).toBe(0);
});

test('remove', () => {
  const list2 = new LinkedList();
  expect(list2.getHeadValue()).toBe(null);

  list2.append(2);
  list2.remove(2);

  expect(list2.getHeadValue()).toBe(null);
  expect(list2.isEmpty()).toBe(true);
  expect(list2.getTailValue()).toBe(null);

  list2.append(1);
  list2.append(2);
  list2.append(3);
  list2.remove(2);

  expect(list2.getHeadValue()).toBe(1);
  expect(list2.getTailValue()).toBe(3);
  expect(list2.isEmpty()).toBe(false);
  expect(list2.getSize()).toBe(2);
  expect(list2.toArray()).toEqual([1, 3]);
  list2.remove(12);
});

test('insert', () => {
  const list2 = new LinkedList();

  list2.append(1);
  list2.append(3);

  expect(list2.toArray()).toEqual([1, 3]);

  list2.insert(10, 4);
  expect(list2.toArray()).toEqual([1, 3, 4]);

  list2.insert(2, 3.5);
  expect(list2.toArray()).toEqual([1, 3, 3.5, 4]);

  list2.insert(4, 5);
  expect(list2.toArray()).toEqual([1, 3, 3.5, 4, 5]);

  list2.insert(0, 0.4);
  expect(list2.toArray()).toEqual([0.4, 1, 3, 3.5, 4, 5]);

  list2.insert(-100, 0);
  expect(list2.toArray()).toEqual([0, 0.4, 1, 3, 3.5, 4, 5]);
});
