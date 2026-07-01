export interface TreeNodeInterface<Key, Value> {
  key: Key;
  value: Value;
  get isLeaf(): boolean;
  get hasChildren(): boolean;
}

export interface LinkedListNode<Type> {
  value: Type;
  next: LinkedListNode<Type> | null;
}

export interface DoublyLinkedListNode<Type> {
  value: Type;
  next: DoublyLinkedListNode<Type> | null;
  previous: DoublyLinkedListNode<Type> | null;
}

export interface GraphNode<Key, Value> {
  key: Key;
  value: Value;
}

export interface GraphEdge<Key, Value> {
  startingNode: GraphNode<Key, Value>;
  targetNode: GraphNode<Key, Value>;
  weight: number;
}