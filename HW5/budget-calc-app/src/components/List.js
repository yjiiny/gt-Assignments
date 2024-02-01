import React from 'react';

export default function List({item, onDelete, onEditItem}) {

  const handleDelete = () => {
    onDelete(item.id);
  };

  // '수정' 버튼 클릭 핸들러 추가
const handleEdit = () => {
  onEditItem(item);
};

  return (
    <div className="mt-3 m-3 p-3 border rounded">
      <div className="flex justify-start items-center w-full">
        {/* 지출 항목과 비용을 왼쪽 정렬로 표시하고, 나머지 공간을 버튼들에게 할당하지 않도록 합니다. */}
        <div className="flex-1 flex">
          <span className="flex-1 text-left">{item.title[1]}</span> {/* 지출 항목 */}
          <span className="flex-1 text-left">{item.title[0]}</span> {/* 비용 */}
        </div>
        <div className="flex">
          {/* '수정' 버튼 추가. 실제 기능 구현을 위해 onClick에 적절한 핸들러 연결 필요 */}
          <button onClick={handleEdit} className="bg-blue-400 text-white p-1 mx-2 rounded">수정</button>
          {/* '삭제' 버튼을 맨 오른쪽으로 이동 */}
          <button onClick={handleDelete} className="bg-red-400 text-white p-1 rounded">삭제</button>
        </div>
      </div>
    </div>
  );
}

//{item.name}: {item.cost}원
// <button onClick={() => onEdit(item)}>수정</button>
//<button onClick={() => onDelete(item.id)}>삭제</button>