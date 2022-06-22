import { FormEvent, useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import AppLayout from "../../components/layout/AppLayout";
import moment from "moment";
import { Select } from "../../components/shared/form/Select";
import { reqEvents } from "../../services/httpReq";
import { formatBalance } from "../../utils/index";
import { Button } from "../../components/shared/form/Button";
import { useRouter } from "next/router";

export interface Event {
  block_signed_at: string;
  block_height: number;
  tx_offset: number;
  log_offset: number;
  tx_hash: string;
  sender_contract_decimals: 0;
  sender_name: string;
  sender_contract_ticker_symbol: string;
  sender_address: string;
  sender_address_label: string;
  sender_logo_url: string;
  raw_log_data: string;
  decoded: {
    name: string;
    signature: string;
    params: { name: string; type: string; value: string }[];
  };
}

export interface TransfersResults {
  items: Event[];
  pagination?: {
    has_more: boolean;
    page_number: number;
    page_size: number;
    total_count: null;
  };
}

const colors = {
  Transfer: "bg-green-300",
  Approval: "bg-purple-300",
};

export const IndexPage = () => {
  const router = useRouter();
  const { selectedChainId } = useContext(AppContext);
  const [items, setItems] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasmore] = useState(false);
  const [contractAddress, setContractAddress] = useState(
    (router.query?.contract as string) || ""
  );
  const [eventType, setEventType] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState("");
  const [startingBlock, setStartingBlock] = useState<number | undefined>();
  const [endingBlock, setEndingBlock] = useState<number | undefined>();
  const headers = [
    { name: "Txs" },
    { name: "Type" },
    { name: "Logs" },
    { name: "Value" },
    { name: "Spender" },
    { name: "Date" },
  ];

  const topics = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Approval",
      value:
        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
    },
    {
      label: "ApprovalForAll",
      value:
        "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31",
    },
    {
      label: "DelegateChanged",
      value:
        "0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f",
    },

    {
      label: "DelegateVotesChanged",
      value:
        "0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724",
    },

    {
      label: "Deposit",
      value:
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
    },
    {
      label: "Paid",
      value:
        "0x39b0a0620bb668047ab7248973ddfd93d53dff1d4952bd2d56bbf5934edc1fd0",
    },

    {
      label: "RewardsClaimed",
      value:
        "0xd92c424393cb3ccdf7d5e36602e3bfa34f24490579ba47978f4bcfad496995f2",
    },
    {
      label: "SequencerBatchAppended",
      value:
        "0x127186556e7be68c7e31263195225b4de02820707889540969f62c05cf73525e",
    },

    {
      label: "StakeStart",
      value:
        "0xdc5a18c7d77c61a390e121362aef97759e74c60c7af28d64ab9b0317a06fe9d3",
    },

    {
      label: "Sync",
      value:
        "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1",
    },
    {
      label: "Swap",
      value:
        "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
    },
    {
      label: "TransactionBatchAppended",
      value:
        "0x127186556e7be68c7e31263195225b4de02820707889540969f62c05cf73525e",
    },

    {
      label: "Transfer",
      value:
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    },
    {
      label: "WithdrawalInitiated",
      value:
        "0xd9fbd8fe4451ae979e36c7923543e61b94e26b6f1510866805ee90023a61aa21",
    },

    ,
  ];
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startingBlock && contractAddress && endingBlock) {
      setPageNumber(1);
      setError(undefined);
      fetchEvents(1);
    } else {
      setError("All fields are required");
    }
  };

  useEffect(() => {
    if (startingBlock && contractAddress && endingBlock) {
      setPageNumber(1);
      setError(undefined);
      fetchEvents(1);
    }
  }, [selectedChainId]);

  const fetchEvents = async (page: number) => {
    let data = [];
    if (page === 1) {
      setItems([]);
    }
    setIsLoading(true);
    reqEvents(
      selectedChainId,
      contractAddress,
      startingBlock,
      endingBlock,
      page,
      eventType
    )
      .then(response => {
        if (page > 1) {
          data = items.concat(response?.data?.items || []);
        } else {
          data = response?.data?.items;
        }
        setHasmore(response?.data.pagination.has_more || false);
        setItems(data || []);

        //@ts-ignore
        setError(response?.data?.error_message);
      })
      .catch(() => {
        setItems([]);
        setError(
          "An error occured, please verify the contract address, starting block, endind block and selected chain."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const changePage = () => {
    fetchEvents(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  return (
    <AppLayout
      title="Dashboard / Get tokens balance of any address"
      desc="Dashboard / Get tokens balance of any address"
    >
      <div className="my-2">
        <form
          className="flex flex-wrap w-full gap-4"
          onSubmit={e => onSubmit(e)}
        >
          <input
            value={contractAddress}
            onChange={e => setContractAddress(e.target.value)}
            type="text"
            id="rounded-email"
            className="flex-1 w-full px-6 py-3 text-base text-gray-700 placeholder-gray-400 bg-white border-transparent shadow appearance-none lg:w-1/5 dark:text-white dark:bg-gray-700 rounded-xl border-b-gray-200"
            placeholder="Enter a contract address"
          />
          <input
            value={startingBlock}
            onChange={e => setStartingBlock(parseInt(e.target.value))}
            type="number"
            id="rounded-email"
            className="w-full px-6 py-3 text-base text-gray-700 placeholder-gray-400 bg-white border-transparent shadow appearance-none lg:w-1/5 dark:text-white dark:bg-gray-700 rounded-xl border-b-gray-200"
            placeholder="Starting block"
          />
          <input
            value={endingBlock}
            onChange={e => setEndingBlock(parseInt(e.target.value))}
            type="number"
            id="rounded-email"
            className="w-full px-6 py-3 text-base text-gray-700 placeholder-gray-400 bg-white border-transparent shadow appearance-none lg:w-1/5 dark:text-white dark:bg-gray-700 rounded-xl border-b-gray-200"
            placeholder="Ending block"
          />
          <Select
            defaultLabel="Select a topic"
            value={eventType}
            options={topics}
            onChange={id => setEventType(id)}
          />
          <Button
            disabled={!endingBlock || !startingBlock || !contractAddress}
            type="submit"
            label="Search"
          />
        </form>

        <div className="flex flex-col w-full gap-4 mt-4">
          <div className="overflow-x-auto bg-white dark:bg-gray-700 rounded-xl">
            <div className="flex items-center w-full gap-4 p-4 border-b-2 border-gray-200">
              <img src="/images/transaction.svg" />
              <p className="text-lg text-gray-500 dark:text-white">Events</p>
            </div>
            <table className="min-w-full mt-4 overflow-x-auto leading-normal rounded-xl">
              <thead>
                <tr className="rounded-xl">
                  {headers.map((hd, index) => (
                    <th
                      key={hd.name + index}
                      scope="col"
                      className={`${index === 0 ? "rounded-tl-xl xl" : ""} ${
                        index === headers.length - 1 ? "rounded-tr-xl xl" : ""
                      } px-6 py-4 text-left font-normal text-gray-700 dark:text-white  bg-white dark:bg-gray-700 text-xs lg:text-md`}
                    >
                      {hd.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items?.map((item, index) => {
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
                          <p
                            className={`p-2 text-xs text-gray-800 rounded-xl ${
                              colors[item.decoded.name] ||
                              "bg-gray-500 text-white"
                            }`}
                          >
                            {item.decoded.name}
                          </p>
                        </div>
                      </td>
                      <td className="flex flex-col gap-2 px-5 py-2 text-sm bg-white dark:bg-gray-700 ">
                        {item.decoded.params.slice(0, 2).map(param => {
                          return (
                            <div className="flex flex-col">
                              <p className="text-xs text-gray-500 dark:text-white">
                                {param.name}
                              </p>
                              <p className="text-gray-800">
                                {param.name === "value" &&
                                param.type === "uint256"
                                  ? `${formatBalance(
                                      param.value,
                                      item.sender_contract_decimals
                                    )} ${item.sender_name}`
                                  : param.value}
                              </p>
                            </div>
                          );
                        })}
                      </td>

                      <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700">
                        {item.decoded?.params[2] && (
                          <div className="flex flex-col">
                            <p className="text-xs text-gray-500 dark:text-white">
                              {item.decoded?.params[2].name}
                            </p>
                            <p className="text-gray-800">
                              {item.decoded?.params[2].name === "value" &&
                              item.decoded?.params[2].type === "uint256"
                                ? `${
                                    formatBalance(
                                      item.decoded?.params[2].value,
                                      item.sender_contract_decimals
                                    ).includes("Y")
                                      ? "∞"
                                      : formatBalance(
                                          item.decoded?.params[2].value,
                                          item.sender_contract_decimals
                                        )
                                  } `
                                : item.decoded?.params[2].value}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700">
                        <p>
                          {item.sender_name}
                          <span className="text-xs text-gray-500 dark:text-white">
                            ({item.sender_contract_ticker_symbol})
                          </span>
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700">
                        <p>{moment(item.block_signed_at).fromNow()}</p>
                        <p className="text-xs text-gray-500 dark:text-white">
                          {moment(item.block_signed_at).toLocaleString()}
                        </p>
                      </td>
                    </tr>
                  );
                })}
                {items?.length === 0 && !isLoading && (
                  <tr className="bg-white border-b border-gray-200 dark:bg-gray-700 rounded-xl">
                    <td
                      colSpan={headers.length}
                      className="px-8 py-8 text-sm text-center text-gray-500 bg-white dark:text-white dark:bg-gray-700"
                    >
                      {error ? (
                        <span className="text-red-600">{error}</span>
                      ) : (
                        "No data"
                      )}
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr className="bg-white border-b border-gray-200 dark:bg-gray-700 rounded-xl">
                    <td
                      colSpan={headers.length}
                      className="px-8 py-8 text-sm text-center text-gray-500 bg-gray-200 dark:text-white animate-pulse"
                    >
                      Fetching datas ....
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {hasMore && !isLoading && (
            <div className="flex items-center justify-center w-full">
              <button
                onClick={() => {
                  changePage();
                }}
                type="button"
                className="p-4 m-auto my-8 text-gray-700 bg-white shadow dark:text-white dark:bg-gray-700 w-44 rounded-xl hover:drop-shadow-xl"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default IndexPage;
