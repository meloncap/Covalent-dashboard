import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../../../AppContext";
import AppLayout from "../../../../components/layout/AppLayout";
import Portfolio from "../../../../components/shared/Portfolio";
import Sales from "../../../../components/shared/sales";
import {
  reqNFTmetadata,
  reqNFTTransactions,
  reqNFTSales,
} from "../../../../services/httpReq";

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
    gas_offered: number;
    gas_price: number;
    gas_quote: number;
    gas_quote_rate: number;
    gas_spent: number;
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
  const router = useRouter();
  const { token, id } = router.query;
  const ref = useRef();
  useEffect(() => {
    setIsloading(true);
    Promise.all([
      reqNFTTransactions(selectedChainId, id as string, token as string),
      reqNFTmetadata(selectedChainId, id as string, token as string),
      reqNFTSales(selectedChainId, id as string, token as string),
    ])
      .then(values => {
        setNFTTransactions(values[0].data?.items || []);
        setDetails(values[1].data?.items[0]);
        setSales(values[2]?.data?.items || []);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [token, id]);

  return (
    <AppLayout
      title="Dashboard / Get tokens balance of any address"
      desc="Dashboard / Get tokens balance of any address"
    >
      <div className="my-2">
        <Link href={`/nft/${id}`}>
          <a className="flex items-center transition-colors duration-200 cursor-pointer hover:underline hover:text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
            <img src="/images/right.svg" className="rotate-180" />
            <span className="mx-4 text-lg text-gray-500">
              Back to collection
            </span>
          </a>
        </Link>
        {details && (
          <div className="flex items-start gap-6">
            <div className="relative flex w-2/3 gap-6 p-4 bg-white shadow rounded-xl dark:bg-gray-700">
              <img
                src={details.nft_data[0].external_data.image}
                className="w-1/4 rounded-xl"
              />
              <div className="flex flex-col justify-between ">
                <div>
                  <a
                    target="_blank"
                    href={details.nft_data[0].token_url}
                    className="text-3xl text-gray-800 text-bold"
                  >
                    {details.contract_name}#{details.nft_data[0].token_id}
                  </a>
                  <p className="text-sm text-gray-500">
                    Owned by{" "}
                    <span className="text-blue-500">
                      {details.nft_data[0].owner}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 italic text-gray-400">
                  {details.nft_data[0].description ||
                    "No description returned by WS"}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">Contract address</p>
                    <p>{details.contract_address.substring(0, 15)}...</p>
                  </div>
                  <div className="flex flex-col justify-items-end">
                    <p className="w-full text-sm text-right text-gray-500">
                      Token ID
                    </p>
                    <p>{details.nft_data[0].token_id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/3">
              {details?.nft_data[0]?.external_data?.attributes ? (
                <div className="w-full p-4 mb-4 bg-white shadow rounded-xl">
                  <div className="flex items-center w-full gap-4 mb-4">
                    <img src="/images/transaction.svg" />
                    <p className="text-lg text-gray-500">Attributes</p>
                  </div>
                  <div className="grid w-full grid-cols-3 gap-4 ">
                    {details.nft_data[0].external_data.attributes.map(attr => {
                      return (
                        <div className="flex flex-col p-1 border-2 border-gray-200 rounded-xl">
                          <p className="text-sm text-zinc-400 ">
                            {attr.trait_type}
                          </p>
                          <p className="w-full p-6 text-xl text-center text-gray-700">
                            {" "}
                            {attr.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="w-full p-4 mb-4 bg-white shadow rounded-xl">
                  <div className="flex items-center w-full gap-4 mb-4">
                    <img src="/images/transaction.svg" />
                    <p className="text-lg text-gray-500">Attributes</p>
                  </div>
                  <p className="italic">No attributes</p>
                </div>
              )}

              {sales.length > 0 ? (
                <div className="w-full bg-white shadow rounded-xl" ref={ref}>
                  <div className="flex items-center w-full gap-4 p-4">
                    <img src="/images/transaction.svg" />
                    <p className="text-lg text-gray-500">Sales</p>
                  </div>
                  <Sales
                    items={sales.map(sale => {
                      return {
                        date: sale.block_signed_at,
                        dollars: sale.nft_price_quote.toString(),
                        [sale.purchase_token_name]:
                          sale.purchase_token_quote_rate.toString(),
                        total: "1000",
                      };
                    })}
                    //@ts-ignore
                    width={ref?.current?.clientWidth || 600}
                    height={400}
                  />
                </div>
              ) : (
                <div className="w-full p-4 bg-white shadow rounded-xl ">
                  <div className="flex items-center w-full gap-4 mb-4">
                    <img src="/images/transaction.svg" />
                    <p className="text-lg text-gray-500">Sales</p>
                  </div>
                  <p className="italic">No sales</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default IndexPageNFT;
