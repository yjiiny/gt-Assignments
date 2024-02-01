import React from 'react';

function Alarm({ message, color }) {
  // color 값에 따라 다른 스타일 적용
  const alarmStyle = `alarm ${color === "red" ? "bg-red-500" : "bg-green-500"} p-3 text-white font-bold items-center text-center`;

  return (
    <div className={alarmStyle}>
      {message}
    </div>
  );
}

export default Alarm;
