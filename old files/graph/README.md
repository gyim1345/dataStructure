## 이해

- graph는 vertex와 edges로 구성되어 있다.
- vertex는 노드 같은 것이고 edges는 그 것들을 연결 하는 것들이다.
- graph의 메서드들은 vertex를 추가하는 addVertex(vertex),.edge를 추가하는 addEdge(vertex1, vertex2), edge에 방향성을 추가하는 addDirectedEdge(from, to) vertex 가 존재 하는지 hasVertex(vertex),vertex를 연결 하는 edge가 존재하는지 isConnected(from,to), 모든 vertex를 반환하는  getGraph()

- BFS breath fist search는 거리에 따라 탐색을 하는데 최소 거리 부터 queue에 넣고 그 넣은것들의 vertices를 넣어 준다 queue의 순서에 따라.
- DFS depth first search 는 binary search와 비슷하게 모든곳을 방문한다. 

## 계획 

- class를 만들어서 this.edge 와 this.vertex를 만든다.
- 거기에 그것들을 조작하는 메서드들을 만든다.
- addVertex(vertex)는 this.edge에 새로운 edge를 추가한다. 
- addEdge(v1,v2)는 두 엣지에 연결을 하는데 v1에 key 값을 줘서 그 value는 배열로 줘서 안에 연결 되는 vertex 를 넣는다.
그리고 this.edges에 v1: v2, v2:v1를 해서 표현한다.
- addDirectedEdge는 위와 달리 v1:v2 만 넣는다.
- hasVertex는 this.vertices에 그 해당되는 vertex 의 키값이 있는지 확인 후 반환.
- isConnected는 this.Edge를 확인해서 있는지 확인후 반환.
- getGraph는 this.vertices와 this.edge 반환.

- BFS 는 찾는 vertex 부터 시작해서 그 vertex를 넣어서 그 vertex에 edge로 연결된 vertex를 queue에 넣어 준다. 반복한다.

- DFS는 binary search 처럼 stack 에 vertex를 넣어서 edge로 연결된 vertices를 넣으면서 재귀로 돌리자.