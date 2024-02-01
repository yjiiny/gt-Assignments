import React, { useEffect, useState } from 'react';

export default function Input({onAddItem, onEditItem, editingItem}){

  // 지출 항목 입력 값 관리를 위한 상태
  const [inputItemName, setInputName] = useState("");
  // 지출 비용 입력 값 관리를 위한 상태
  const [inputCost, setInputCost] = useState('0');
  // 수정 중인 상태
  const [isEditing, setIsEditing] = useState(false);

  // editingItem이 변경될 때마다 실행되어 입력 필드를 초기화합니다.
  useEffect(() => {
    if (editingItem) {
      setInputName(editingItem.title[1]);
      setInputCost(editingItem.title[0]);
      setIsEditing(true);
    }
  }, [editingItem]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputItemName || !inputCost) return; // 입력값 검증

    const newItemData = {
      id: isEditing ? editingItem.id : Date.now(),
      title: [inputCost, inputItemName],
    };

    if (isEditing) {
      onEditItem(newItemData);
    } else {
      onAddItem(newItemData);
    }

    // 입력 필드 초기화
    setInputCost('');
    setInputName('');
    setIsEditing(false); // 수정 모드 해제
  };

  return (
    <div>
      <div className="flex text-yellow-500 mb-4">
        <span className="flex-grow text-left ml-1">지출 항목</span>
        <span className="flex-grow text-left">비용</span>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex">
          <input
            type="text"
            name="itemName"
            style={{ flexGrow: 1, padding: '5px'}}
            placeholder="예) 렌트비"
            value={inputItemName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            type="number"
            name="cost"
            style={{ flexGrow: 1, padding: '5px', marginLeft: '25px'}}
            value={inputCost}
            onChange={(e) => setInputCost(e.target.value)}
          />
        
        </div>
        <button type="submit" className="bg-orange-500 text-white p-2 mt-4 ml-1 rounded">
        {isEditing ? '수정' : '제출'}
        </button>
      </form>
    </div>
  )
}
