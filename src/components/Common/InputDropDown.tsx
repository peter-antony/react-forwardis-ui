import { useState } from "react";

interface QcInputComboProps {
  label: string;
  dropdownOptions: string[];
  value: string;
  onValueChange: (value: string) => void;
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

export function InputDropDown({
  label,
  dropdownOptions,
  value,
  onValueChange,
  selectedOption,
  onOptionChange,
}: QcInputComboProps) {
  return (
    <div >
      {/* <label className="text-sm text-gray-600 font-medium">{label}</label> */}
      <div  className="relative flex border border-gray-300 rounded-md overflow-hidden bg-white text-sm">
        <select
          className="px-3 py-2 bg-white border-r border-gray-300 text-gray-700 focus:outline-none"
          value={selectedOption}
          onChange={(e) => onOptionChange(e.target.value)}
        >
          {dropdownOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter Value"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="flex-1 px-3 py-1 focus:outline-none text-gray-800"
        />
      </div>
    </div>
  );
}
