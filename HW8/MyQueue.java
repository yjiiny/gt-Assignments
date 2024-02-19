package HW8;

import java.util.NoSuchElementException;

// 제네릭 타입 T를 사용하는 MyQueue 클래스 정의
public class MyQueue<T> {
  private MyLinkedList<T> list = new MyLinkedList<>();

  // 큐에 데이터를 추가하는 메서드
  public void enqueue(T data) {
      list.add(data);    // 리스트의 끝에 데이터 추가
  }

  // 큐에서 데이터를 제거하고 반환하는 메서드
  // 리스트의 첫 번째 데이터를 제거하고 반환
  public T dequeue() {
      if (list.size() == 0) {
          throw new NoSuchElementException("Queue is empty");
      }
      T data = list.get(0);
      list.delete(0);
      return data;
  }

  // 큐가 비어있는지 확인하는 메서드
  public boolean isEmpty() {
      return list.size() == 0;
  }

  // 큐의 크기를 반환하는 메서드
  public int size() {
      return list.size();
  }
}