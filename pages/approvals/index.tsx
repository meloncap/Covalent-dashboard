import { FormEvent, useContext, useState } from "react";
import AppContext from "../../AppContext";
import AppLayout from "../../components/layout/AppLayout";
import moment from "moment";
import { reqApprovals, reqEvents } from "../../services/httpReq";
import { formatBalance, getMappingCurrency } from "../../utils/index";
import { Button } from "../../components/shared/form/Button";

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

const approvalTopic =
  "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";

export const IndexPage = () => {
  const { selectedChainId } = useContext(AppContext);
  const [items, setItems] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasmore] = useState(false);
  const [spenderAddress, setSpenderAddress] = useState("");
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startingBlock && spenderAddress && endingBlock) {
      setPageNumber(1);
      setError(undefined);
      fetchEvents(1);
    } else {
      setError("All fields are required");
    }
  };

  const fetchEvents = async (page: number) => {
    let data = [];
    if (page === 1) {
      setItems([]);
    }
    setIsLoading(true);
    reqApprovals(
      selectedChainId,
      spenderAddress,
      startingBlock,
      endingBlock,
      page
    )
      .then(response => {
        if (page > 1) {
          data = items.concat(response?.data?.items || []);
        } else {
          data = response?.data?.items;
        }
        setHasmore(response?.data?.pagination?.has_more || false);
        setItems(data || []);

        //@ts-ignore
        setError(response?.data?.error_message);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(err => {
        setError(
          "An error occured, please verify the contract address, starting block, endind block and selected chain."
        );
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
          className="flex w-full gap-4 lg:w-2/3"
          onSubmit={e => onSubmit(e)}
        >
          <input
            value={spenderAddress}
            onChange={e => setSpenderAddress(e.target.value)}
            type="text"
            id="rounded-email"
            className="flex-1 w-full px-6 py-3 text-base text-gray-700 placeholder-gray-400 bg-white border-transparent shadow appearance-none rounded-xl border-b-gray-200"
            placeholder="Enter a contract address"
          />
          <input
            value={startingBlock}
            onChange={e => setStartingBlock(parseInt(e.target.value))}
            type="number"
            id="rounded-email"
            className="flex-1 w-full px-6 py-3 text-base text-gray-700 placeholder-gray-400 bg-white border-transparent shadow appearance-none rounded-xl border-b-gray-200"
            placeholder="Starting block"
          />
          <input
            value={endingBlock}
            onChange={e => setEndingBlock(parseInt(e.target.value))}
            type="number"
            id="rounded-email"
            className="flex-1 w-full px-6 py-3 text-base text-gray-700 placeholder-gray-400 bg-white border-transparent shadow appearance-none rounded-xl border-b-gray-200"
            placeholder="Ending block"
          />
          <Button
            disabled={!endingBlock || !startingBlock || !spenderAddress}
            type="submit"
            label="Search"
          />
        </form>

        <div className="flex flex-col w-full gap-4 mt-4">
          <div className="overflow-x-auto bg-white rounded-xl">
            <div className="flex items-center w-full gap-4 p-4 border-b-2 border-gray-200">
              <img src="/images/transaction.svg" />
              <p className="text-lg text-gray-500">Events</p>
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
                      } px-6 py-4 text-left font-normal text-gray-700  bg-white text-xs lg:text-md`}
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
                      className="bg-white border-b border-gray-200 rounded-xl"
                    >
                      <td className="px-5 py-5 text-sm bg-white ">
                        {item.tx_hash.substr(0, 10)}...
                      </td>
                      <td className="px-5 py-5 text-sm bg-white">
                        <div className="flex items-center justify-between ">
                          <p
                            className={`p-2 text-xs text-gray-800 rounded-xl ${
                              colors[item.decoded.name] || "bg-gray-500"
                            }`}
                          >
                            {item.decoded.name}
                          </p>
                        </div>
                      </td>
                      <td className="flex flex-col gap-2 px-5 py-2 text-sm bg-white ">
                        {item.decoded.params.slice(0, 2).map(param => {
                          return (
                            <div className="flex flex-col">
                              <p className="text-xs text-gray-500">
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

                      <td className="px-5 py-5 text-sm bg-white">
                        {item.decoded?.params[2] && (
                          <div className="flex flex-col">
                            <p className="text-xs text-gray-500">
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
                      <td className="px-5 py-5 text-sm bg-white">
                        <p>
                          {item.sender_name}
                          <span className="text-xs text-gray-400">
                            ({item.sender_contract_ticker_symbol})
                          </span>
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white">
                        <p>{moment(item.block_signed_at).fromNow()}</p>
                        <p className="text-xs text-gray-500">
                          {moment(item.block_signed_at).toLocaleString()}
                        </p>
                      </td>
                    </tr>
                  );
                })}
                {items?.length === 0 && !isLoading && (
                  <tr className="bg-white border-b border-gray-200 rounded-xl">
                    <td
                      colSpan={headers.length}
                      className="px-8 py-8 text-sm text-center text-gray-400 bg-white"
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
                  <tr className="bg-white border-b border-gray-200 rounded-xl">
                    <td
                      colSpan={headers.length}
                      className="px-8 py-8 text-sm text-center text-gray-400 bg-gray-200 animate-pulse"
                    >
                      -
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
                className="p-4 m-auto my-8 text-gray-700 bg-white shadow w-44 rounded-xl hover:drop-shadow-xl"
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
