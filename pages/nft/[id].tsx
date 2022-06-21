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
            <span className="mx-4 text-lg text-gray-500">
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
          <div className="relative flex flex-col justify-between w-full mb-4 dark:bg-gray-700">
            <img
              src={dataItem?.first_nft_image}
              className="flex items-center justify-center w-1/3 m-auto rounded-t-lg h-3/4"
            />
            <div className="p-4 bg-white shadow rounded-xl">
              <p className="w-full mb-4 text-2xl text-center text-gray-800 text-bold">
                {item.contract_name} #{item.contract_ticker_symbol}
              </p>

              <div className="flex items-center justify-between mt-8">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Volume (24h)</p>
                  <p>{formatNumber(dataItem?.avg_volume_quote_24h || 0)}$</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Release date </p>
                  <p>{new Date(dataItem?.opening_date).toDateString()}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Total transactions </p>
                  <p>{dataItem?.transaction_count_alltime}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">MarketCap </p>
                  <p>{formatNumber(dataItem?.market_cap_quote)}$</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Floor (7d average) </p>
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
                      <p className="text-lg text-gray-800 text-bold">
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
