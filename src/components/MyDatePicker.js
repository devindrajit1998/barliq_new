import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const MyDatePicker = (props) => {
  const {date, onChange} = props


  return (
    <div className="">
      <input
        type="date"
        id="date"
        // value={date}
        onChange={onChange}
        className="border border-gray-300 px-4 py-2 rounded-md w-full datepicker"
      />
    </div>
  );
};

export default MyDatePicker;
