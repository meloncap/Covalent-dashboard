import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../../../AppContext";
import AppLayout from "../../../../components/layout/AppLayout";
import Portfolio from "../../../../components/shared/Portfolio";
import Sales from "../../../../components/shared/sales";
import Tree from "../../../../components/shared/Tree";
import {
  reqNFTmetadata,
  reqNFTTransactions,
  reqNFTSales,
} from "../../../../services/httpReq";
import { formatBalance } from "../../../../utils";

interface NFTdetails {
  contract_address: string;
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  logo_url: string;
  nft_data: {
    description: string;
    external_url: string;
    original_owner: string;
    owner: string;
    owner_address: string;
    token_balance: string;
    token_id: string;
    token_price_wei: string;
    token_quote_rate_eth: string;
    token_url: string;
    burned: boolean;
    external_data: {
      image: string;
      image_256: string;
      image_512: string;
      image_1024: string;
      animation_url: string;
      attributes: {
        trait_type: string;
        value: string;
      }[];
    };
  }[];
}

interface NFTTransaction {
  nft_transactions: {
    block_height: number;
    block_signed_at: string;
    fees_paid: null;
    from_address: string;
    from_address_label: null;
    to_address: string;
    gas_offered: number;
    gas_price: number;
    gas_quote: number;
    gas_quote_rate: number;
    tx_hash: string;
    gas_spent: number;
    value_quote: number;
    log_events: {
      raw_log_data: string;
      sender_address: string;
      sender_address_label: string;
      sender_contract_decimals: number;
      sender_contract_ticker_symbol: string;
      sender_logo_url: string;
      sender_name: string;
      tx_hash: string;
      tx_offset: number;
      decoded: {
        name: string;
        params: {
          name: string;
          type: string;
          indexed: boolean;
          decoded: boolean;
          value: string;
        }[];
      };
    }[];
  }[];
}

interface NFTSale {
  block_height: number;
  block_signed_at: string;
  chain_id: number;
  collection_address: string;
  collection_name: string;
  collection_token_id: number;
  from: string;
  gas_quote_rate: number;
  gas_spent_quote: number;
  gas_spent_wei: string;
  maker: string;
  market: string;
  nft_gas_token_price: number;
  nft_price_quote: number;
  nft_price_wei: string;
  purchase_token_address: string;
  purchase_token_decimals: number;
  purchase_token_name: string;
  purchase_token_quote_rate: number;
  purchase_token_ticker_symbol: string;
  quote_currency: string;
  taker: string;
  to: string;
  tx_hash: string;
}

export const IndexPageNFT = () => {
  const { selectedChainId, address } = useContext(AppContext);
  const [details, setDetails] = useState<NFTdetails | undefined>();
  const [sales, setSales] = useState<NFTSale[]>([]);
  const [transactions, setNFTTransactions] = useState<NFTTransaction[]>([]);
  const [loading, setIsloading] = useState(false);
  const [loadingSales, setIsloadingSales] = useState(false);
  const router = useRouter();
  const { token, id } = router.query;

  const headers = [
    { name: "Txs" },
    { name: "From" },
    { name: "To" },
    { name: "Value" },
    { name: "Date" },
  ];
  useEffect(() => {
    if (id) {
      setIsloading(true);
      setIsloadingSales(true);
      reqNFTSales(selectedChainId, id as string, token as string)
        .then(data => {
          setSales(data?.data?.items || []);
        })
        .finally(() => {
          setIsloadingSales(false);
        });
      Promise.all([
        reqNFTTransactions(selectedChainId, id as string, token as string),
        reqNFTmetadata(selectedChainId, id as string, token as string),
      ])
        .then(values => {
          setNFTTransactions(values[0]?.data?.items || []);
          setDetails(values[1]?.data?.items[0]);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }, [token, id]);
  console.log(transactions);
  const transacList = transactions[0]?.nft_transactions || [];
  return (
    <AppLayout
      title="Dashboard / Get tokens balance of any address"
      desc="Dashboard / Get tokens balance of any address"
    >
      <div className="my-2">
        {loading && (
          <div
            style={{ height: "600px" }}
            className="relative block w-full mt-4 mb-4 bg-gray-200 dark:bg-gray-700 animate-pulse h-88 rounded-xl"
          ></div>
        )}
        {details && (
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col w-full gap-4">
              <div className="flex items-start gap-4">
                <div className="relative flex flex-wrap w-full gap-4 p-4 bg-white shadow lg:flex-nowrap lg:flex-initial dark:bg-gray-700 rounded-xl">
                  <img
                    src={details.nft_data[0].external_data.image}
                    className="w-full lg:w-2/5 rounded-xl"
                  />
                  <div className="flex flex-col justify-between w-full lg:w-3/5">
                    <div className="flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <a
                            target="_blank"
                            href={details.nft_data[0].token_url}
                            className="text-5xl text-gray-800 dark:text-white text-bold"
                          >
                            {details.contract_name}#
                            {details.nft_data[0].token_id}
                          </a>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            Owned by{" "}
                            <span className="text-blue-500">
                              {details.nft_data[0].owner}
                            </span>
                          </p>
                        </div>
                        <Link href={`/nft/${id}`}>
                          <a className="flex items-center transition-colors duration-200 cursor-pointer rounded-xl hover:text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                            <img
                              src="/images/right.svg"
                              className="rotate-180"
                            />
                            <span className="mx-4 text-lg text-gray-500 dark:text-gray-300">
                              Back to collection
                            </span>
                          </a>
                        </Link>
                      </div>

                      <div className="flex items-center mt-4 text-gray-400 dark:text-gray-300">
                        {details?.nft_data[0]?.external_data?.attributes
                          ?.length > 0 ? (
                          <div className="w-full mb-4">
                            <div className="flex items-center w-full gap-4 mb-4">
                              <img src="/images/transaction.svg" />
                              <p className="text-lg text-gray-500 dark:text-gray-300">
                                Attributes
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                              {details.nft_data[0].external_data.attributes.map(
                                attr => {
                                  return (
                                    <div className="relative flex flex-col items-center w-24 h-24 p-1 border-2 border-gray-200 hover:shadow rounded-xl">
                                      <p className="absolute top-0 text-sm text-gray-400 dark:text-gray-300 left-2 ">
                                        {attr.trait_type}
                                      </p>
                                      <p className="flex items-center justify-center w-full h-full p-6 text-center text-gray-500 dark:text-gray-300 text-md">
                                        {" "}
                                        {attr.value}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full mb-4 ">
                            <div className="flex items-center w-full gap-4 mb-4">
                              <img src="/images/transaction.svg" />
                              <p className="text-lg text-gray-500 dark:text-gray-300">
                                Attributes
                              </p>
                            </div>
                            <p className="italic">No attributes</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-col text-gray-500 dark:text-white">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Contract address
                        </p>
                        <p>{details.contract_address}</p>
                      </div>
                      <div className="flex flex-col text-gray-500 justify-items-end dark:text-white">
                        <p className="w-full text-sm text-right text-gray-500 dark:text-gray-300">
                          Token ID
                        </p>
                        <p>{details.nft_data[0].token_id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center w-full gap-4 p-4 bg-white dark:bg-gray-700 rounded-t-xl">
                  <img src="/images/transaction.svg" />
                  <p className="text-lg text-gray-500 dark:text-gray-300">
                    Transaction / Sales
                  </p>
                </div>
                <table className="min-w-full overflow-x-auto leading-normal text-gray-700 rounded-xl dark:text-white">
                  <thead>
                    <tr className="r">
                      {headers.map((hd, index) => (
                        <th
                          key={hd.name + index}
                          scope="col"
                          className={`px-6 py-4 text-left font-normal text-gray-700 dark:text-gray-200  bg-white dark:bg-gray-700 text-md`}
                        >
                          {hd.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transacList?.map((item, index) => {
                      return (
                        <tr
                          key={item.tx_hash || ""}
                          className="bg-white border-b border-gray-200 dark:bg-gray-700 rounded-xl"
                        >
                          <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700 ">
                            {item.tx_hash.substr(0, 10)}...
                          </td>
                          <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700">
                            <div className="flex items-center justify-between ">
                              <p>
                                {item.from_address_label || item.from_address}
                              </p>

                              <span className="px-2 py-1 text-xs text-green-700 bg-green-200 rounded ">
                                Transfer
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700 ">
                            {item.to_address}
                          </td>

                          <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700">
                            {formatBalance(item.value_quote)}$
                          </td>
                          <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700">
                            {moment(item.block_signed_at).fromNow()}
                          </td>
                        </tr>
                      );
                    })}
                    {transacList?.length === 0 && !loading && (
                      <tr className="bg-white border-b border-gray-200 dark:bg-gray-700 rounded-xl">
                        <td
                          colSpan={headers.length}
                          className="px-8 py-8 text-sm text-center text-gray-400 bg-white dark:bg-gray-700 dark:text-gray-300"
                        >
                          No data
                        </td>
                      </tr>
                    )}
                    {loading && (
                      <tr className="bg-white border-b border-gray-200 dark:bg-gray-700 rounded-xl">
                        <td
                          colSpan={headers.length}
                          className="px-8 py-8 text-sm text-center text-gray-400 bg-gray-200 dark:text-gray-300 animate-pulse"
                        >
                          -
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col w-1/3 gap-6">
              <div className="w-full"></div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default IndexPageNFT;
