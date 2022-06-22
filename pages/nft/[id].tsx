import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { NFTCollection } from ".";
import AppContext from "../../AppContext";
import AppLayout from "../../components/layout/AppLayout";
import { reqAllNFTs, reqDetailsNFT, reqNFTs } from "../../services/httpReq";
import { formatNumber } from "../../utils";

interface Data {
  contract_address: string;
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  items: {
    contract_metadata: {
      contract_decimals: number;
      contract_name: string;
      contract_ticker_symbol: string;
    };
    contract_address: string;
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    logo_url: string;
  }[];
  logo_url: string;
  date: string;
  price: null;
  quote_currency: string;
  update_at: string;
}

interface NFTitem {
  contract_address: string;
  contract_decimals: 0;
  contract_name: string;
  contract_ticker_symbol: string;
  logo_url: string;
  token_id: string;
}

export const IndexPageNFT = () => {
  const { selectedChainId, address } = useContext(AppContext);
  const [data, setData] = useState<Data[] | undefined>();
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [items, setItems] = useState<NFTitem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(15);
  const [errorImage, setErrorImage] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      reqNFTs(selectedChainId, id as string),
      reqDetailsNFT(selectedChainId, id as string),
      reqAllNFTs(selectedChainId, 0),
    ])
      .then(values => {
        setItems(values[0]?.data?.items || []);
        setData(values[1]?.data);
        setCollections(values[2]?.data?.items || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const dataItem = collections
    ? collections.find(item => item.collection_address === id)
    : undefined;
  const item = data ? data[0] : undefined;

  return (
    <AppLayout
      title="Dashboard / Get tokens balance of any address"
      desc="Dashboard / Get tokens balance of any address"
    >
      <div className="my-2">
        <Link href="/nft">
          <a className="flex items-center transition-colors duration-200 cursor-pointer hover:underline hover:text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
            <img src="/images/right.svg" className="rotate-180" />
            <span className="mx-4 text-lg text-gray-500 dark:text-gray-200">
              Back to collections
            </span>
          </a>
        </Link>

        {isLoading && (
          <div
            style={{ height: "300px" }}
            className="relative block w-full mt-4 mb-4 bg-gray-200 animate-pulse h-88 rounded-xl"
          ></div>
        )}
        {data && dataItem && (
          <div className="relative flex flex-col justify-between w-full mb-4 ">
            <img
              src={dataItem?.first_nft_image}
              className="flex items-center justify-center w-full m-auto rounded-t-lg lg:w-1/3 h-3/4"
            />
            <div className="right-0 flex gap-4 m-auto my-4 lg:flex-col lg:my-0 lg:absolute">
              <Link href={`/events?contract=${dataItem.collection_address}`}>
                <a className="flex items-center p-2 bg-white shadow dark:bg-gray-700 dark:text-white w-44 hover:shadow-xl rounded-xl">
                  <svg
                    className="mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 2C3.55228 2 4 2.44772 4 3V19C4 19.5523 4.44772 20 5 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 8C7.55228 8 8 8.44772 8 9V17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17V9C6 8.44772 6.44772 8 7 8Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 14C11.5523 14 12 14.4477 12 15V17C12 17.5523 11.5523 18 11 18C10.4477 18 10 17.5523 10 17V15C10 14.4477 10.4477 14 11 14Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15 4C15.5523 4 16 4.44772 16 5V17C16 17.5523 15.5523 18 15 18C14.4477 18 14 17.5523 14 17V5C14 4.44772 14.4477 4 15 4Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19 10C19.5523 10 20 10.4477 20 11V17C20 17.5523 19.5523 18 19 18C18.4477 18 18 17.5523 18 17V11C18 10.4477 18.4477 10 19 10Z"
                      fill="currentColor"
                    />
                  </svg>
                  Explore events
                </a>
              </Link>
              {selectedChainId === "1" && (
                <a
                  target="_blank"
                  href={`https://opensea.io/assets?search[query]=${dataItem.collection_address}`}
                  className="flex items-center p-2 bg-white shadow w-44 dark:bg-gray-700 dark:text-white hover:shadow-xl rounded-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 100 100"
                  >
                    <path
                      fill="#2081E2"
                      d="M100 50C100 77.6127 77.6127 100 50 100C22.3873 100 0 77.6127 0 50C0 22.3873 22.3873 0 50 0C77.6185 0 100 22.3873 100 50Z"
                    />
                    <path
                      fill="#fff"
                      d="M24.6679 51.6801L24.8836 51.341L37.8906 30.9932C38.0807 30.6953 38.5276 30.7261 38.6714 31.0497C40.8444 35.9196 42.7194 41.9762 41.841 45.7468C41.466 47.2982 40.4386 49.3992 39.2827 51.341C39.1338 51.6236 38.9694 51.901 38.7947 52.1681C38.7125 52.2914 38.5738 52.3633 38.4248 52.3633H25.048C24.6884 52.3633 24.4778 51.9729 24.6679 51.6801Z"
                    />
                    <path
                      fill="#fff"
                      d="M82.6444 55.461V58.6819C82.6444 58.8668 82.5314 59.0312 82.367 59.1031C81.3602 59.5346 77.9132 61.1168 76.48 63.11C72.8224 68.2008 70.0279 75.48 63.7812 75.48H37.721C28.4847 75.48 21 67.9697 21 58.7024V58.4045C21 58.1579 21.2003 57.9576 21.4469 57.9576H35.9745C36.2621 57.9576 36.4727 58.2247 36.4471 58.5072C36.3443 59.4524 36.519 60.4182 36.9659 61.2966C37.8289 63.0484 39.6166 64.1426 41.5481 64.1426H48.74V58.5278H41.6303C41.2656 58.5278 41.0499 58.1065 41.2605 57.8086C41.3375 57.6904 41.4249 57.5672 41.5173 57.4285C42.1903 56.473 43.1509 54.9884 44.1064 53.2983C44.7588 52.1579 45.3906 50.9404 45.8992 49.7178C46.002 49.4969 46.0841 49.2708 46.1663 49.0499C46.305 48.6595 46.4489 48.2948 46.5516 47.9301C46.6544 47.6218 46.7365 47.2982 46.8187 46.9951C47.0602 45.9574 47.1629 44.8581 47.1629 43.7177C47.1629 43.2708 47.1424 42.8033 47.1013 42.3564C47.0807 41.8684 47.0191 41.3803 46.9574 40.8923C46.9163 40.4608 46.8393 40.0344 46.7571 39.5875C46.6544 38.9351 46.5105 38.2879 46.3461 37.6354L46.2896 37.3889C46.1663 36.9419 46.0636 36.5156 45.9198 36.0687C45.5139 34.6662 45.0465 33.2998 44.5533 32.0207C44.3735 31.5121 44.168 31.0241 43.9625 30.5361C43.6595 29.8015 43.3512 29.1337 43.0687 28.5018C42.9249 28.2141 42.8016 27.9521 42.6783 27.685C42.5396 27.3819 42.3958 27.0788 42.2519 26.7912C42.1492 26.5703 42.031 26.3648 41.9488 26.1593L41.0704 24.536C40.9471 24.3151 41.1526 24.0531 41.394 24.1199L46.8907 25.6096H46.9061C46.9163 25.6096 46.9215 25.6148 46.9266 25.6148L47.6509 25.8151L48.4472 26.0412L48.74 26.1233V22.8562C48.74 21.2791 50.0037 20 51.5654 20C52.3462 20 53.0551 20.3185 53.5637 20.8373C54.0722 21.3562 54.3907 22.0651 54.3907 22.8562V27.7056L54.9764 27.8699C55.0226 27.8854 55.0688 27.9059 55.1099 27.9367C55.2538 28.0446 55.4592 28.2038 55.7212 28.3991C55.9267 28.5634 56.1476 28.7638 56.4147 28.9693C56.9438 29.3956 57.5757 29.9453 58.2692 30.5772C58.4541 30.7364 58.6339 30.9008 58.7983 31.0652C59.6922 31.8974 60.6939 32.8734 61.6494 33.9522C61.9165 34.2553 62.1785 34.5635 62.4456 34.8871C62.7127 35.2159 62.9953 35.5395 63.2418 35.8632C63.5655 36.2947 63.9148 36.7416 64.2179 37.2091C64.3617 37.43 64.5261 37.656 64.6648 37.8769C65.0552 38.4676 65.3994 39.079 65.7282 39.6903C65.8669 39.9728 66.0107 40.281 66.134 40.5841C66.4987 41.4009 66.7864 42.2331 66.9713 43.0653C67.0278 43.2451 67.0689 43.4403 67.0895 43.615V43.6561C67.1511 43.9026 67.1717 44.1646 67.1922 44.4317C67.2744 45.2845 67.2333 46.1372 67.0484 46.9951C66.9713 47.3599 66.8686 47.704 66.7453 48.0688C66.622 48.4181 66.4987 48.7828 66.3395 49.127C66.0313 49.841 65.6665 50.5551 65.235 51.2229C65.0963 51.4695 64.9319 51.7315 64.7675 51.9781C64.5877 52.24 64.4028 52.4866 64.2384 52.7281C64.0124 53.0363 63.771 53.3599 63.5244 53.6476C63.3035 53.9507 63.0775 54.2538 62.8309 54.5209C62.4867 54.9267 62.1579 55.312 61.8137 55.6819C61.6083 55.9233 61.3874 56.1699 61.1613 56.3908C60.9405 56.6373 60.7144 56.8582 60.5089 57.0637C60.1648 57.4079 59.8771 57.675 59.6356 57.8959L59.0706 58.4148C58.9884 58.4867 58.8805 58.5278 58.7675 58.5278H54.3907V64.1426H59.8976C61.1305 64.1426 62.3018 63.7059 63.247 62.9045C63.5706 62.622 64.9833 61.3994 66.6528 59.5552C66.7093 59.4935 66.7813 59.4473 66.8635 59.4268L82.0742 55.0295C82.3568 54.9473 82.6444 55.163 82.6444 55.461Z"
                    />
                  </svg>
                  See on OpenSea
                </a>
              )}
            </div>

            <div className="p-4 bg-white shadow dark:bg-gray-700 dark:text-white rounded-xl">
              <p className="w-full mb-4 text-2xl text-center text-gray-800 dark:text-white text-bold">
                {item.contract_name} #{item.contract_ticker_symbol}
              </p>

              <div className="flex items-center justify-between mt-8">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Volume (24h)
                  </p>
                  <p>{formatNumber(dataItem?.avg_volume_quote_24h || 0)}$</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Release date{" "}
                  </p>
                  <p>{new Date(dataItem?.opening_date).toDateString()}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Total transactions{" "}
                  </p>
                  <p>{dataItem?.transaction_count_alltime}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    MarketCap{" "}
                  </p>
                  <p>{formatNumber(dataItem?.market_cap_quote)}$</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Floor (7d average){" "}
                  </p>
                  <p>
                    {formatNumber((dataItem?.floor_price_quote_7d || 0) / 7)}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-5">
          {items?.length > 0 &&
            items.slice(0, offset).map(nft => {
              return (
                <Link
                  href={`/nft/${id}/token/${nft.token_id}`}
                  key={nft.token_id}
                >
                  <a className="relative flex flex-col justify-between w-full gap-4 p-4 bg-white shadow hover:shadow-lg rounded-xl dark:bg-gray-700">
                    <img
                      src={nft.logo_url}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dataItem?.first_nft_image;
                        setErrorImage(true);
                      }}
                      className={`${
                        errorImage ? "opacity-25" : ""
                      } h-3/4 rounded-xl`}
                    />
                    {errorImage && (
                      <p className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 text-md left-1/2">
                        Image not available
                      </p>
                    )}
                    <div>
                      <p className="text-lg text-gray-800 dark:text-white text-bold">
                        {item?.contract_name} #{nft.token_id}
                      </p>
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
        {items?.length > offset && (
          <div className="flex items-center justify-center w-full">
            <button
              onClick={() => {
                setOffset(offset + 15);
              }}
              type="button"
              className="p-4 m-auto my-8 text-gray-700 bg-white shadow w-44 rounded-xl hover:drop-shadow-xl"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default IndexPageNFT;
