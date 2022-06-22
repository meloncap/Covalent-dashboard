import Link from "next/link";
import React from "react";

import { NFTCollection } from "../../../pages/nft/index";

import { formatNumber } from "../../../utils";

interface Props {
  isLoading?: boolean;
  collection?: NFTCollection;
}

export const NFTHero = ({ isLoading, collection }: Props) => {
  if (isLoading || !collection) {
    return (
      <div
        style={{ height: "300px" }}
        className="relative w-full px-4 py-6 bg-gray-200 shadow animate-pulse rounded-xl dark:bg-gray-700"
      ></div>
    );
  }

  return (
    <Link href={`/nft/${collection.collection_address}`}>
      <a className="relative flex flex-col justify-between w-full gap-6 p-4 transition bg-white shadow hover:scale-105 hover:shadow-xl rounded-xl dark:bg-gray-700">
        <img src={collection.first_nft_image} className="w-full rounded-xl" />
        <div>
          <p className="text-lg text-gray-800 dark:text-white text-bold">
            {collection.collection_name}
          </p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Volume (24h)
              </p>
              <p className="dark:text-white">
                {formatNumber(collection.avg_volume_quote_24h)}$
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Floor (7d average){" "}
              </p>
              <p className="dark:text-white">
                {formatNumber(collection.floor_price_quote_7d / 7)}$
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
