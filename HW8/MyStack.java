package HW8;

import java.util.NoSuchElementException;

public class MyStack<T> {
  private MyLinkedList<T> list = new MyLinkedList<>();

  // 스택에 데이터를 추가하는 메서드. 리스트의 끝에 데이터를 추가함
  public void push(T data) {
      list.add(data);
  }

  // 스택에서 데이터를 제거하고 반환하는 메서드
  public T pop() {
      // 리스트의 마지막 데이터를 제거하고 반환함
      if (list.size() == 0) {
          throw new NoSuchElementException("Stack is empty");
      }
      T data = list.get(list.size() - 1);
      list.delete(list.size() - 1);
      return data;
  }

  // 스택이 비어있는지 확인하는 메서드
  public boolean isEmpty() {
      return list.size() == 0;
  }

  // 스택의 크기를 반환하는 메서드
  public int size() {
      return list.size();
  }
}