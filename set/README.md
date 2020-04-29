## 이해

- add(value), delete(value), getValues(), has(value), size(), equals(other) 메서드가 있다. 
- 위의 메서드로 union(set), difference(set), intersection(set), isSubset(set) 를 작성 할 수 있다.

- union(set)은 두 집합의 중복을 없앤 합, difference(set)은 한 집합에서 다른 한 집합을 뺀 결과, intersection(set)은 두 집합의 같은 수를 가진 집합, isSubset(set)은 

## 계획

- add(value), delete(value), getValues(), has(value), size(), equals(other) 메서드가 있다. 작성.

- 합집합은 두개의 집합에서 A,B를 정렬후 서로 비교하면서 넣는데 동일한 값이 있으면 그냥 리턴

- 교집합은 두개의 집합에서 같은것을 찾아서 새로운 배열에 넣는다.

- 차집합은 해당 배열의 교집합에 해당 되는 것들을 뺸것을 반환.

- 부분집합 A가 C의 부분집합인지 확인 할때 C가 A 보다 크면 바로 false 아닐 시에  안에 값들을 비교한다. c.foreach(x=> x.find(A)) 대충 비슷하게.
