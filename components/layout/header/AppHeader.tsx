import React, { FormEvent, useContext, useState } from "react";
import { useTheme } from "next-themes";
import { Select } from "../../shared/form/Select";
import AppContext from "../../../AppContext";
import { Button } from "../../shared/form/Button";

const AppHeader = () => {
  const { theme, setTheme } = useTheme();
  const {
    allChains,
    selectedChainId,
    setSelectedChainId,
    setAddress,
    address,
  } = useContext(AppContext);

  const [addressInput, setAddressInput] = useState(address);

  const chainsOptions = allChains.map(data => {
    return {
      value: data.chain_id,
      label: data.name,
      img: data.logo_url,
    };
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddress(addressInput);
  };
  return (
    <header className="z-40 items-center w-full h-16 bg-white shadow lg:ml-2 lg:mr-6 dark:bg-gray-700 rounded-2xl">
      <div className="relative z-20 flex flex-col justify-center h-full mx-auto lg:px-3 flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex justify-between w-1/2 h-full lg:w-3/4">
            <form
              className="flex items-center w-3/4 gap-4 ml-4 lg:w-1/2"
              noValidate
              onSubmit={e => onSubmit(e)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                className="hidden lg:visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                  fill="#8592A3"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                  fill="black"
                  fill-opacity="0.2"
                />
              </svg>

              <input
                value={addressInput}
                onChange={e => setAddressInput(e.target.value)}
                type="text"
                id="rounded-email"
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-transparent appearance-none focus:outline-none focus:ring-0 focus:border border-b-gray-200"
                placeholder="Search an address"
              />
              {addressInput && (
                <>
                  <div className="hidden lg:block">
                    <Button type="submit" label="Search" />
                  </div>
                  <div className="visible lg:hidden">
                    <button type="submit" className="text-gray-700">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        className="float-right"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                          fill="#8592A3"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                          fill="black"
                          fill-opacity="0.2"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <div className="relative flex items-center justify-end w-1/2 lg:w-1/4 sm:mr-0 sm:right-auto">
            <Select
              defaultLabel="Select a chain"
              value={selectedChainId}
              options={chainsOptions}
              onChange={id => setSelectedChainId(id)}
            />
            <button
              id="theme-toggle"
              data-tooltip-target="tooltip-toggle"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-500 ml-2 link focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                id="theme-toggle-dark-icon"
                className={`w-5 h-5 ${theme === "dark" ? "hidden" : null}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                className={`w-5 h-5 ${theme === "dark" ? null : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default AppHeader;
