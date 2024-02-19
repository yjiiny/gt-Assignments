package HW8;
import java.util.Iterator;
import java.util.NoSuchElementException;

public class MyLinkedList<T> implements Iterable<T> {
		// 리스트의 시작 - head Node
		// 리스트의 크기 - size 변수
    private Node<T> head;
    private int size;

		// Node 정의하는 내부 클래스
		// 데이터, 다음 노드를 가리키는 참조
    private static class Node<T> {
        T data;
        Node<T> next;

				// Node 생성자
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }

		// MyLinkedList 생성자 (빈 상태로 초기화)
    public MyLinkedList() {
        head = null;
        size = 0;
    }

		// 리스트 마지막에 데이터 추가하는 메소드
    public void add(T data) {
				// 리스트가 비어있으면
        if (head == null) {
            head = new Node<>(data);    // head에 새 노드를 할당
        } 
				// 리스트가 비어있지 않으면
				else {
						// 마지막 노드를 찾아서
            Node<T> current = head;
            while (current.next != null) {
                current = current.next;
            }
						// 새 노드 연결
            current.next = new Node<>(data);
        }
        size++;   // 리스트 크기 증가
    }

		// 주어진 인덱스의 노드 데이터를 반환하는 메서드
    public T get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        Node<T> current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }

		// 주어진 인덱스의 노드를 삭제하는 메서드
    public void delete(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
				// 첫 번째 노드를 삭제하는 경우
        if (index == 0) {
						// head를 다음 노드로 변경
            head = head.next;
        } else {
            Node<T> current = head;
						// 삭제할 노드의 바로 이전 노드를 찾아서
            for (int i = 0; i < index - 1; i++) {
                current = current.next;
            }
						// 해당 노드의 next를 삭제할 노드의 다음 노드로 변경
            current.next = current.next.next;
        }
        size--;   // 리스트 크기 감소
    }

		// Iterable 인터페이스 구현을 통해 for-each 루프 사용 가능
    @Override
    public Iterator<T> iterator() {
				// Iterator 인터페이스를 구현하는 익명 클래스 인스턴스를 반
        return new Iterator<T>() {
						// 현재 순회 중인 노드를 추적하기 위한 private 필드
            private Node<T> current = head;

						// 리스트에 순회할 다음 요소(노드)가 있는지 확인
            @Override
            public boolean hasNext() {
                return current != null;
            }

						// 순회 중인 다음 요소를 반환
            @Override
            public T next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
								// 현재 노드의 데이터를 반환하기 전,
								// 반환할 데이터 임시 저장
                T data = current.data;
								// current를 다음 노드로 이동
                current = current.next;
								// 임시 저장했던 데이터를 반환
                return data;
            }
        };
    }

    public int size() {
        return size;
    }
}