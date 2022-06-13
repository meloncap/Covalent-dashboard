import Link from "next/link";

export const Navbar = () => {
  const sections = [
    {
      title: "ADDRESS",
      links: [
        {
          icon: (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 2048 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#5e72e4"
                d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"
              ></path>
            </svg>
          ),
          label: "Balance checker",
          link: "/address-balance",
        },
        {
          icon: (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 2048 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#5e72e4"
                d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"
              ></path>
            </svg>
          ),
          label: "Transactions",
          link: "/transactions",
        },
      ],
    },
    {
      title: "NFT",
      links: [
        {
          icon: (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 2048 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#5e72e4"
                d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"
              ></path>
            </svg>
          ),
          label: "NFT market",
          link: "/nft",
        },
      ],
    },
  ];

  return (
    <nav className="h-screen px-6 bg-white w-72 rounded-2xl dark:bg-gray-700">
      <div className="flex items-center justify-center px-8 py-2 mb-8">
        <svg
          width="205"
          height="41"
          viewBox="0 0 205 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_0_281)">
            <path
              d="M70.9014 12.01C72.5314 12.01 73.9814 12.34 75.2514 13C76.5314 13.65 77.5614 14.54 78.3414 15.67C79.1314 16.8 79.5964 18.075 79.7364 19.495H75.1464C75.0064 18.745 74.7514 18.08 74.3814 17.5C74.0114 16.91 73.5264 16.45 72.9264 16.12C72.3264 15.78 71.6064 15.61 70.7664 15.61C69.7564 15.61 68.8864 15.855 68.1564 16.345C67.4264 16.835 66.8664 17.625 66.4764 18.715C66.0864 19.805 65.8914 21.245 65.8914 23.035C65.8914 25.735 66.3214 27.69 67.1814 28.9C68.0514 30.1 69.2464 30.7 70.7664 30.7C71.6064 30.7 72.3264 30.51 72.9264 30.13C73.5264 29.74 74.0114 29.23 74.3814 28.6C74.7514 27.96 75.0064 27.26 75.1464 26.5H79.7364C79.6064 27.53 79.3564 28.515 78.9864 29.455C78.6164 30.385 78.0914 31.215 77.4114 31.945C76.7314 32.675 75.8564 33.25 74.7864 33.67C73.7164 34.09 72.4214 34.3 70.9014 34.3C68.8814 34.3 67.1364 33.83 65.6664 32.89C64.1964 31.95 63.0614 30.63 62.2614 28.93C61.4714 27.23 61.0764 25.245 61.0764 22.975C61.0764 20.695 61.4714 18.74 62.2614 17.11C63.0514 15.47 64.1814 14.21 65.6514 13.33C67.1214 12.45 68.8714 12.01 70.9014 12.01ZM92.1365 34.3C90.0865 34.3 88.3115 33.855 86.8115 32.965C85.3215 32.065 84.1665 30.79 83.3465 29.14C82.5365 27.48 82.1315 25.5 82.1315 23.2C82.1315 20.89 82.5415 18.9 83.3615 17.23C84.1915 15.56 85.3565 14.275 86.8565 13.375C88.3565 12.465 90.1165 12.01 92.1365 12.01C94.1465 12.01 95.8965 12.46 97.3865 13.36C98.8765 14.26 100.027 15.545 100.837 17.215C101.657 18.885 102.067 20.88 102.067 23.2C102.067 25.49 101.662 27.465 100.852 29.125C100.052 30.785 98.9065 32.065 97.4165 32.965C95.9265 33.855 94.1665 34.3 92.1365 34.3ZM92.1365 30.7C93.1965 30.7 94.1115 30.45 94.8815 29.95C95.6615 29.44 96.2615 28.64 96.6815 27.55C97.1015 26.45 97.3115 25.02 97.3115 23.26C97.3115 21.45 97.0965 19.985 96.6665 18.865C96.2465 17.745 95.6465 16.925 94.8665 16.405C94.0965 15.875 93.1865 15.61 92.1365 15.61C91.0865 15.61 90.1715 15.875 89.3915 16.405C88.6115 16.925 88.0065 17.75 87.5765 18.88C87.1465 20 86.9315 21.46 86.9315 23.26C86.9315 25.03 87.1465 26.46 87.5765 27.55C88.0065 28.64 88.6115 29.44 89.3915 29.95C90.1715 30.45 91.0865 30.7 92.1365 30.7ZM105.466 12.31C105.576 12.31 105.881 12.31 106.381 12.31C106.891 12.31 107.486 12.31 108.166 12.31C108.856 12.31 109.541 12.315 110.221 12.325C110.911 12.325 111.486 12.33 111.946 12.34C114.576 12.4 116.721 12.87 118.381 13.75C120.041 14.63 121.256 15.86 122.026 17.44C122.806 19.02 123.196 20.89 123.196 23.05C123.196 25.3 122.786 27.245 121.966 28.885C121.146 30.515 119.891 31.775 118.201 32.665C116.521 33.555 114.386 34 111.796 34H105.466V12.31ZM109.876 15.85V30.46H111.886C113.126 30.46 114.251 30.22 115.261 29.74C116.281 29.26 117.096 28.475 117.706 27.385C118.316 26.295 118.621 24.84 118.621 23.02C118.621 21.33 118.351 19.96 117.811 18.91C117.271 17.85 116.501 17.075 115.501 16.585C114.501 16.095 113.316 15.85 111.946 15.85H109.876ZM124.008 34L131.778 12.31H136.398L144.153 34H139.788L138.018 28.975H130.218L128.403 34H124.008ZM131.193 25.15H136.968L134.103 16.54L131.193 25.15ZM154.637 34.3C153.567 34.3 152.517 34.165 151.487 33.895C150.457 33.625 149.517 33.22 148.667 32.68C147.817 32.14 147.112 31.465 146.552 30.655C146.002 29.845 145.672 28.895 145.562 27.805H150.047C150.197 28.465 150.482 29.02 150.902 29.47C151.322 29.92 151.852 30.265 152.492 30.505C153.132 30.745 153.842 30.865 154.622 30.865C155.422 30.865 156.152 30.765 156.812 30.565C157.472 30.365 158.002 30.065 158.402 29.665C158.802 29.255 159.002 28.745 159.002 28.135C159.002 27.585 158.837 27.135 158.507 26.785C158.187 26.435 157.752 26.15 157.202 25.93C156.652 25.71 156.027 25.53 155.327 25.39L151.577 24.625C149.937 24.315 148.637 23.665 147.677 22.675C146.717 21.675 146.222 20.345 146.192 18.685C146.182 17.325 146.542 16.15 147.272 15.16C148.012 14.16 149.012 13.39 150.272 12.85C151.542 12.31 152.962 12.04 154.532 12.04C156.402 12.04 157.972 12.335 159.242 12.925C160.522 13.505 161.492 14.295 162.152 15.295C162.822 16.285 163.167 17.39 163.187 18.61H158.792C158.712 17.85 158.482 17.245 158.102 16.795C157.722 16.345 157.232 16.02 156.632 15.82C156.042 15.62 155.367 15.52 154.607 15.52C154.027 15.52 153.497 15.585 153.017 15.715C152.547 15.845 152.147 16.03 151.817 16.27C151.487 16.5 151.232 16.775 151.052 17.095C150.872 17.415 150.782 17.775 150.782 18.175C150.782 18.805 150.992 19.315 151.412 19.705C151.832 20.095 152.617 20.415 153.767 20.665L157.487 21.43C158.817 21.69 159.872 22.075 160.652 22.585C161.442 23.095 162.032 23.67 162.422 24.31C162.822 24.95 163.082 25.605 163.202 26.275C163.332 26.935 163.397 27.545 163.397 28.105C163.397 29.275 163.027 30.33 162.287 31.27C161.557 32.2 160.537 32.94 159.227 33.49C157.917 34.03 156.387 34.3 154.637 34.3ZM180.646 24.685H171.151V34H166.786V12.31H171.151V21.01H180.646V12.31H185.026V34H180.646V24.685Z"
              fill="#566A7F"
            />
            <path
              opacity="0.7"
              d="M18.9499 13.143V38.6073C18.9499 38.9681 18.843 39.2777 18.6264 39.5288C18.4127 39.7823 18.0978 39.9091 17.6848 39.9091C17.3931 39.9091 17.11 39.8506 16.8327 39.736L4.84022 34.6777C4.47918 34.5339 4.17301 34.2901 3.92461 33.9513C3.6791 33.61 3.5549 33.2736 3.5549 32.9421V8.19446C3.5549 7.90437 3.64155 7.65817 3.81197 7.45584C3.98527 7.25351 4.23367 7.15112 4.56005 7.15112C4.79979 7.15112 5.17816 7.26082 5.69518 7.47778L18.8748 13.0358C18.9239 13.0772 18.9499 13.1138 18.9499 13.143V13.143Z"
              fill="#696CFF"
            />
            <path
              opacity="0.3"
              d="M20.6021 15.337L34.3738 34.1342L20.6021 28.3617V15.337ZM49.7688 15.727V38.6074C49.7688 38.9681 49.6475 39.2631 49.4077 39.4874C49.168 39.7116 48.8416 39.8238 48.4286 39.8238C48.0155 39.8238 47.6112 39.7287 47.2155 39.541L35.8411 34.7655L49.7688 15.727Z"
              fill="#696CFF"
            />
            <path
              opacity="0.7"
              d="M49.6908 13.1211C49.6908 13.165 47.487 16.1999 43.0764 22.2284C38.6659 28.2568 36.0837 31.7842 35.3269 32.8105L25.2697 19.0472L33.6257 7.60699C33.9174 7.20233 34.3651 7 34.9659 7C35.2056 7 35.4309 7.04388 35.636 7.1292L49.5868 12.9895C49.6561 13.0211 49.6908 13.0626 49.6908 13.1211V13.1211Z"
              fill="#696CFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_281">
              <rect width="205" height="41" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {sections.map(section => {
        return (
          <div>
            <p className="w-full pb-2 mb-4 ml-2 font-normal text-gray-500 border-b-2 border-gray-100 text-md">
              {section.title}
            </p>

            {section.links.map(link => {
              return (
                <Link
                  className="flex items-center justify-start font-thin text-gray-500"
                  href={link.link}
                >
                  <a className="flex items-center p-2 my-4 transition-colors duration-200 cursor-pointer hover:text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                    <span className="text-left">{link.icon}</span>
                    <span className="mx-4 font-normal text-md">
                      {link.label}
                    </span>
                  </a>
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
};
