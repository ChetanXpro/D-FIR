import React, { useCallback, useEffect } from "react";

interface SelectProps {
  list: { label: string; value: string }[];
  label: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (value: string) => void;
}

const Select = ({ list, label, isOpen, setIsOpen, onSelect }: SelectProps) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <div ref={dropdownRef} className="flex relative">
      <button
        onClick={e => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {label}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className={`  absolute z-50 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
        >
          <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
            {list.map((item: any) => (
              <li key={item.label}>
                <div
                  onClick={() => {
                    onSelect(item);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100  "
                >
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
