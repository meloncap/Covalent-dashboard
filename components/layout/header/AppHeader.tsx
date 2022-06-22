import React, { FormEvent, useContext, useState } from "react";
import { useTheme } from "next-themes";
import { Select } from "../../shared/form/Select";
import AppContext from "../../../AppContext";
import { Button } from "../../shared/form/Button";
import { sections } from "../navbar/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

const AppHeader = () => {
  const { theme, setTheme } = useTheme();
  const {
    allChains,
    selectedChainId,
    setSelectedChainId,
    setAddress,
    address,
  } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const isMatch = (path: string) => {
    if (path === "/") {
      return router.asPath === path;
    }
    return (
      router.asPath.includes(path) &&
      (router.asPath.length === path.length || router.asPath !== "/")
    );
  };
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
      {isOpen && (
        <ul className="fixed top-0 bottom-0 left-0 right-0 z-30 p-4 bg-white menu">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="flex p-2 ml-auto text-lg text-right border border-gray-300 rounded-xl justify-items-end"
          >
            Close
          </button>
          {sections.map(section => {
            return (
              <div key={section.title}>
                <p className="w-full pb-2 mb-4 ml-2 font-normal text-gray-400 border-b-2 border-gray-100 text-md">
                  {section.title}
                </p>

                {section.links.map(link => {
                  return (
                    <Link
                      className="relative flex items-center justify-start font-thin text-gray-500"
                      href={link.link}
                      key={link.label}
                    >
                      <a
                        className={`${
                          isMatch(link.link)
                            ? "bg-indigo-100 text-indigo-700 "
                            : "hover:text-gray-800 dark:text-gray-400 hover:bg-gray-100"
                        } flex items-center p-3 my-4 rounded-xl transition-colors duration-200 cursor-pointer  dark:hover:text-white dark:hover:bg-gray-600`}
                      >
                        <span className="text-left">{link.icon}</span>
                        <span className="mx-4 text-lg font-normal">
                          {link.label}
                        </span>
                        {isMatch(link.link) && (
                          <img
                            src="/images/selected.svg"
                            className="absolute right-0"
                          />
                        )}
                      </a>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </ul>
      )}

      <div className="relative z-20 flex flex-col justify-center h-full mx-auto lg:px-3 flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex justify-between w-full h-full lg:w-4/5">
            <form
              className="flex items-center w-3/4 gap-4 ml-4 lg:w-3/4"
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                  fill="#8592A3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                  fill="black"
                  fillOpacity="0.2"
                />
              </svg>

              <input
                value={addressInput}
                onChange={e => setAddressInput(e.target.value)}
                type="text"
                id="rounded-email"
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 border-transparent appearance-none dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border border-b-gray-200"
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
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                          fill="#8592A3"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.57895 15.1579C9.32779 15.1579 10.9355 14.5563 12.2182 13.5587L16.3828 17.7234L17.7224 16.3838L13.5578 12.2192C14.5563 10.9355 15.1579 9.32779 15.1579 7.57895C15.1579 3.40011 11.7578 0 7.57895 0C3.40011 0 0 3.40011 0 7.57895C0 11.7578 3.40011 15.1579 7.57895 15.1579ZM7.57895 1.89474C10.7138 1.89474 13.2632 4.44411 13.2632 7.57895C13.2632 10.7138 10.7138 13.2632 7.57895 13.2632C4.44411 13.2632 1.89474 10.7138 1.89474 7.57895C1.89474 4.44411 4.44411 1.89474 7.57895 1.89474ZM9.47368 7.57895C9.47368 7.07495 9.27568 6.59937 8.91663 6.23937C8.20042 5.52505 6.95937 5.52316 6.23937 6.24126L4.90168 4.89979C6.33505 3.46737 8.8219 3.46737 10.2562 4.89979C10.9743 5.61884 11.3684 6.57 11.3684 7.57895H9.47368Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
          <div className="relative flex items-center justify-end w-1/4 lg:hidden sm:mr-0 sm:right-auto">
            <div className="z-10 flex flex-row-reverse ml-4 mr-4 text-gray-800">
              <button
                className="hamburger"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="w-8 h-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative items-center justify-end hidden w-1/2 lg:flex lg:w-1/4 sm:mr-0 sm:right-auto">
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
