import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import AppLayout from "../../components/layout/AppLayout";
import { NFTHero } from "../../components/shared/nft/NFTHero";
import { NFTHorizontal } from "../../components/shared/nft/NFTHorizontalCard";

import { reqAllNFTs } from "../../services/httpReq";

export interface NFTCollection {
  avg_volume_quote_24h: number;
  avg_volume_wei_24h: string;
  chain_id: 1;
  collection_address: string;
  collection_name: string;
  contract_deployment_at: string;
  first_nft_image: string;
  first_nft_image_256: string;
  first_nft_image_512: string;
  first_nft_image_1024: string;
  first_nft_image_token_id: string;
  floor_price_quote_7d: number;
  floor_price_wei_7d: string;
  gas_quote_rate: number;
  market_cap_quote: number;
  market_cap_wei: string;
  max_price_quote: number;
  max_price_wei: string;
  opening_date: string;
  quote_currency: string;
  transaction_count_alltime: number;
  unique_token_ids_sold_count_alltime: number;
  unique_wallet_purchase_count_alltime: number;
  volume_quote_24h: number;
  volume_wei_24h: string;
}

export const IndexPage = () => {
  const { selectedChainId, address } = useContext(AppContext);
  const [items, setItems] = useState<NFTCollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    { name: "Txs" },
    { name: "From" },
    { name: "To" },
    { name: "Type" },
    { name: "Value" },
    { name: "Date" },
  ];

  useEffect(() => {
    setIsLoading(true);
    setItems([]);
    reqAllNFTs(selectedChainId)
      .then(response => {
        setItems(response.data.items);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedChainId]);

  const trending = [...items].sort((a, b) => {
    return b.avg_volume_quote_24h - a.avg_volume_quote_24h;
  });

  const topFloor = [...items].sort((a, b) => {
    return b.floor_price_quote_7d - a.floor_price_quote_7d;
  });

  const max =
    items.length > 0
      ? items.reduce(function (prev, current) {
          return prev?.volume_quote_24h > current?.volume_quote_24h
            ? prev
            : current;
        })
      : null;

  return (
    <AppLayout
      title="Dashboard / Get tokens balance of any address"
      desc="Dashboard / Get tokens balance of any address"
    >
      <div className="my-2">
        <div className="flex w-full gap-12">
          <div className="flex flex-col w-3/4">
            <div className="flex items-center justify-between w-full">
              <h1 className="my-6 text-3xl font-bold text-gray-800">
                Trending collections
              </h1>
              <Link href="">
                <a className="flex items-center transition-colors duration-200 cursor-pointer hover:text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                  <span className="mx-4 text-lg text-gray-500">See all</span>
                  <img src="/images/right.svg" />
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {trending
                .slice(0, 4)
                .filter(col => col.first_nft_image)
                .map(collection => {
                  return (
                    <NFTHero collection={collection} isLoading={isLoading} />
                  );
                })}
            </div>
          </div>
          <div className="w-1/4">
            <div className="flex items-center justify-between w-full">
              <h2 className="my-6 text-xl font-bold text-gray-800">
                Top Floor
              </h2>
            </div>
            <div className="flex flex-col w-full gap-4">
              {topFloor
                .slice(0, 4)
                .filter(col => col.first_nft_image)
                .map(collection => {
                  return (
                    <NFTHorizontal
                      collection={collection}
                      isLoading={isLoading}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IndexPage;
