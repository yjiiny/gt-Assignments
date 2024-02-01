import React from 'react';
import List from './List';

function Lists({itemData, onDeleteItem, onClearAll, onEditItem}) {

  const handleClearAll = () => {
    onClearAll();
  };

  return (
    <div className="mt-9">
      {itemData.map((item) => (
          <List 
            key={item.id}
            item={item}
            onDelete={onDeleteItem}
            onEditItem={onEditItem} />
        ))}
        <button 
          type="button"
          className="bg-orange-500 text-white p-2 mt-1 ml-3 rounded"
          onClick={handleClearAll}>
            목록 지우기
        </button>
    </div>
  );
}

export default Lists;