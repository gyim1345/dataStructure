## 이해:

- hash table을 쓸때 값을 배열에 저장하는데 그 배열의 index 값을 hashfunction 을 써서 변환을 거쳐서 쓴다.
- hash 안에 hash(key), get(key), set(key, value), delete(key), has(key), getKeys() 라는 메세드들이 있다.
- hashFunction은 문자열들 하나하나를 ascii코드로 바까서 더한후 배열의 크기로 나눈 나머지의 값이 index입니다.
- hash(key) 할떄 그값은 리스트의 첫번째에 들어가고, 만약 중복되는 인덱스값을 가진 문자열이 나왔을 경우 그 같은 인덱스를 가진 리스트의 마지막 노드 뒤에 연결한다.
- get(key)는 key의 value 값을 가져온다.
- set(key, value) 는 키의 값에 value를 넣거나 변경을 한다.
- delete(key)는 key에 해당 되는 것을 삭제한다.
- has(key)는 그 키에 해당 되는 것이 있는지 확인하고 true/false 돌려준다.
- getKeys()는 그 key에 해당 되는 모든것을 돌려준다.

## 계획:

- hastable의 배열과 그 안에 있는 list를 new Array(버켓 길이).fill().map(e=> e =  new DoublyLinkedList()); 로 해서 만든다.
- hashFunction은 문자열들 하나하나를 charat로 ascii코드로 바꿔서 reduce를 써서 더한후  % 를 써서 나머지의 값을 얻는다.
- set은 hashFunction을 이용해 구한 인덱스에 해당하는 value 값을 넣을때 DoublyLinkedList의 append를 쓰자.
- delete는 DoublyLinkedList의 remove 쓰면됨
- has는 DoublyLinkedList의 find를 쓰면됨
- get(key)는 find를 조금 변형해서 쓰면됨
- getKeys()는 toArray를 쓰면됨