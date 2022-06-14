import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import AppLayout from "../../components/layout/AppLayout";
import { reqDetailsNFT, reqNFTs } from "../../services/httpReq";

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
  const [items, setItems] = useState<NFTitem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    reqNFTs(selectedChainId, id as string).then(data =>
      setItems(data?.data?.items || [])
    );
    reqDetailsNFT(selectedChainId, id as string).then(response =>
      setData(response.data)
    );
  }, [id]);

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
        <div className="flex items-center justify-between w-full">
          <h1 className="my-6 text-3xl font-bold text-gray-800">{id}</h1>
        </div>
        {data && (
          <div className="relative flex flex-col justify-between w-full gap-6 p-4 transition bg-white shadow hover:scale-105 hover:shadow-xl rounded-xl dark:bg-gray-700">
            <img src={item.logo_url} className="h-3/4 rounded-xl" />
            <div>
              <p className="text-lg text-gray-800 text-bold">
                {item.contract_name}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Volume (24h)</p>
                  {/* <p>{formatNumber(collection.avg_volume_quote_24h)}$</p> */}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Floor (7d average) </p>
                  {/* <p>{formatNumber(collection.floor_price_quote_7d / 7)}$</p> */}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-4 gap-4">
          {items?.length > 0 &&
            items.slice(0, 10).map(nft => {
              return (
                <Link
                  href={`/nft/${id}/token/${nft.token_id}`}
                  key={nft.token_id}
                >
                  <a className="relative flex flex-col justify-between w-full gap-6 p-4 transition bg-white shadow hover:scale-105 hover:shadow-xl rounded-xl dark:bg-gray-700">
                    <img src={nft.logo_url} className="h-3/4 rounded-xl" />
                    <div>
                      <p className="text-lg text-gray-800 text-bold">
                        {nft.token_id}
                      </p>
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    </AppLayout>
  );
};

export default IndexPageNFT;
