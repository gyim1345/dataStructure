const DoublyLinkedList = require('./doublyLinkedList.test.js');

class Stack extends DoublyLinkedList {
  constructor() {
    super();
  }
  
  peak() {
    return this.tail.value;
  }

  push(value) {
    this.append(value);
  }

  pop() {
    this.tail = this.tail.prev;
    this.tail.next = null;
  }
}

test('push', () => {
  const stack = new Stack();
  stack.push(1);
  stack.push(2);

  expect(stack.peak()).toBe(2);
});

test('pop', () => {
  const stack = new Stack();
  stack.push(1);
  stack.push(2);

  stack.pop();

  expect(stack.peak()).toBe(1);
});

test('isEmpty', () => {
  const stack = new Stack();
  expect(stack.isEmpty()).toBe(true);
})