import { useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useClickOutside";

interface Props {
  options: { value: string; label: string; img?: string }[] | [];
  defaultLabel?: string;
  isLoading?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

export const Select = ({
  value = "1",
  options,
  isLoading,
  onChange,
  defaultLabel,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  const selectedIem = options.find(item => item?.value === value);
  const finalOptions = options.filter(item => item?.value !== value);
  useOnClickOutside(ref, () => setIsOpen(false));
  if (isLoading) {
    return (
      <button
        disabled
        type="button"
        className="relative w-full py-3 pl-3 pr-10 text-left rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <span className="flex items-center">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2 animate-spin"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
          </svg>
          <span className="block ml-3 truncate">Loading</span>
        </span>
      </button>
    );
  }

  return (
    <div className="w-64" ref={ref}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="relative w-full px-6 py-4 text-xs text-left bg-white shadow dark:text-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {selectedIem ? (
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {selectedIem.img && (
                  <img
                    src={selectedIem.img}
                    alt="person"
                    className="flex-shrink-0 w-6 h-6 rounded-full"
                  />
                )}

                <span className="block ml-3 truncate">{selectedIem.label}</span>
              </span>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
              </svg>
            </div>
          ) : (
            <div>
              <span className="flex items-center">
                <span className="block ml-3 truncate">
                  {defaultLabel || "No item selected"}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          )}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-700">
            <ul
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {finalOptions.length > 0 ? (
                finalOptions.map(option => {
                  return (
                    <li
                      id="listbox-item-0"
                      role="option"
                      className="relative text-gray-900 cursor-default select-none dark:text-white hover:bg-indigo-500 hover:text-white pr-9"
                    >
                      <button
                        onClick={() => {
                          onChange(option.value);
                          setIsOpen(false);
                        }}
                        className="flex items-center w-full py-2 pl-3"
                      >
                        {option.img && (
                          <img
                            src={option.img}
                            alt="person"
                            className="flex-shrink-0 w-6 h-6 rounded-full"
                          />
                        )}

                        <span className="block ml-3 font-normal truncate">
                          {option.label}
                        </span>
                      </button>
                    </li>
                  );
                })
              ) : (
                <li
                  id="listbox-item-0"
                  role="option"
                  className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                >
                  No results
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
