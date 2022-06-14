import Link from "next/link";
import React from "react";
import { NFTCollection } from "../../../pages/nft/index";

interface Props {
  isLoading?: boolean;
  collection: NFTCollection;
}
export const NFTHorizontal = ({ isLoading, collection }: Props) => {
  if (isLoading || !collection) {
    return (
      <div className="relative w-full px-4 py-6 bg-gray-200 shadow animate-pulse rounded-xl h-44 dark:bg-gray-700"></div>
    );
  }

  return (
    <Link href={`/nft/${collection.collection_address}`}>
      <a className="relative flex w-full gap-6 p-4 transition bg-white shadow hover:scale-105 hover:shadow-xl rounded-xl dark:bg-gray-700">
        <img src={collection.first_nft_image} className="w-1/4 rounded-xl" />
        <div>
          <p className="text-lg text-gray-800 text-bold">
            {collection.collection_name}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Floor price </p>
              <p>{collection.floor_price_quote_7d}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
