import React, { useEffect, useState } from "react";
import './App.css';
import Alarm from "./components/Alarm";
import Input from "./components/Input";
import Lists from "./components/Lists";

export default function App() {

  const[itemData, setItemData] = useState([]);
  // 수정 중인 아이템 상태 추가
  const [editingItem, setEditingItem] = useState(null);

  // 총 비용 계산을 위한 상태 설정
  const [totalCost, setTotalCost] = useState(0);
  // 항목이 추가되거나 삭제될 때마다 총 비용을 계산합니다.
  useEffect(() => {
    const total = itemData.reduce((sum, item) => sum + parseInt(item.title[0], 10), 0);
    setTotalCost(total);
  }, [itemData]);

  // 알람 상태에 color 정보 추가
  const [alarm, setAlarm] = useState({ show: false, message: "", color: "" });

  // 알람을 트리거하는 함수에 알람 타입에 따른 색상 정보 추가
  const triggerAlarm = (message, color = "green") => {
    setAlarm({ show: true, message, color });
    setTimeout(() => {
      setAlarm({ show: false, message: "", color: "" });
    }, 3000); // 3초 후 알림 숨기기
  };

  const handleUpdateItem = (updatedItem) => {
    setItemData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    triggerAlarm("아이템이 수정되었습니다", "green");
    setEditingItem(null); // 수정 완료 후 editingItem 초기화
  };

  const onDeleteItem = (itemId) => {
    setItemData((prev) => prev.filter((item) => item.id !== itemId));
    triggerAlarm("아이템이 삭제되었습니다", "red"); // 삭제 시 빨간색 배경
  };

  const handleClearAll = () => {
    setItemData([]); // 모든 항목 데이터를 삭제
  };

  const handleAddItem = (newItem) => {
    setItemData(prev => [...prev, newItem]);
    triggerAlarm("아이템이 생성되었습니다", "green");
  }


  return (
    <div className="flex-col items-center justify-center w-screen h-screen bg-orange-300">
      {alarm.show && <Alarm message={alarm.message} color={alarm.color} />}
      <div className="text-2xl font-bold flex justify-between pt-4 pl-5">
        예산 계산기
      </div>
      <div className="font-bold text-xs w-9/10 p-5 m-4 bg-white shadow">
        <div className="m-2">
          <Input
            onAddItem={handleAddItem}
            onEditItem={handleUpdateItem}
            editingItem={editingItem}/>
        </div>
        <Lists itemData={itemData} onDeleteItem={onDeleteItem} onClearAll={handleClearAll} onEditItem={setEditingItem}/>
      </div>
      <div className="total-cost font-bold text-right mr-4 text-lg mt-4">
          총 지출: {totalCost}원
      </div>
    </div>
  );
}

// {itemData ? '수정' : '제출'}