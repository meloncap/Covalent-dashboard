import { FormEvent, useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import AppLayout from "../../components/layout/AppLayout";
import moment from "moment";
import { reqTransactions } from "../../services/httpReq";
import {
  countTotalFees,
  formatBalance,
  getIsOut,
  getMappingCurrency,
  getEventType,
  getLogo,
  getTo,
  countTotalInOut,
} from "../../utils/index";
import { SimpleCard } from "../../components/shared/SimpleCard";

export interface Transaction {
  block_signed_at: string;
  block_height: number;
  tx_hash: string;
  tx_offset: number;
  successful: true;
  from_address: string;
  from_address_label: string;
  to_address: string;
  to_address_label: string;
  value: string;
  value_quote: number;
  gas_offered: number;
  gas_spent: number;
  gas_price: number;
  fees_paid: string;
  gas_quote: number;
  gas_quote_rate: number;
  log_events: {
    sender_name: string;
    sender_contract_ticker_symbol: string;
    sender_address: string;
    sender_address_label: string;
    sender_logo_url: string;
    decoded: {
      name: string;
      params: {
        decoded: boolean;
        indexed: boolean;
        name: string;
        type: string;
        value: string;
      }[];
    };
  }[];
}

export interface TransfersResults {
  items: Transaction[];
  pagination?: {
    has_more: boolean;
    page_number: number;
    page_size: number;
    total_count: null;
  };
}

export const IndexPage = () => {
  const { selectedChainId, address } = useContext(AppContext);
  const [items, setItems] = useState<Transaction[]>([]);
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
    if (address) fetchTransaction();
  }, [address, selectedChainId]);

  const fetchTransaction = async () => {
    let data = [];
    let result: { data: TransfersResults } = { data: { items: [] } };

    let pageNumber = 0;
    setItems([]);
    setIsLoading(true);
    do {
      result = await reqTransactions(selectedChainId, address, pageNumber);
      data = data.concat(result?.data?.items || []);
      if (!result?.data?.pagination?.has_more) {
        setItems(data);
        setIsLoading(false);
      } else {
        pageNumber = pageNumber + 1;
      }
    } while (result?.data?.pagination?.has_more);
  };

  const getValue = (tx: Transaction) => {
    return tx.value;
  };

  const [totalIn, totalOut] = countTotalInOut(items, address);

  return (
    <AppLayout
      title="Dashboard / Get tokens balance of any address"
      desc="Dashboard / Get tokens balance of any address"
    >
      <div className="my-2">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full gap-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="w-full">
                <SimpleCard
                  isLoading={isLoading}
                  title={items.length}
                  subTitle="Total transactions"
                  icon={<img src="/images/transaction.svg" />}
                />
              </div>
              <div className="w-full">
                <SimpleCard
                  isLoading={isLoading}
                  title={countTotalFees(items)}
                  subTitle={`Total fees (${getMappingCurrency(
                    selectedChainId
                  )})`}
                  icon={<img src="/images/fees.svg" />}
                />
              </div>
              <div className="w-full">
                <SimpleCard
                  isLoading={isLoading}
                  title={totalIn}
                  subTitle={`Total value IN (${getMappingCurrency(
                    selectedChainId
                  )})`}
                  icon={<img src="/images/in.svg" />}
                />
              </div>
              <div className="w-full">
                <SimpleCard
                  isLoading={isLoading}
                  title={totalOut}
                  subTitle={`Total value OUT (${getMappingCurrency(
                    selectedChainId
                  )})`}
                  icon={<img src="/images/out.svg" />}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto bg-white dark:bg-gray-700 rounded-xl">
            <div className="flex items-center w-full gap-4 p-4 border-b-2 border-gray-200">
              <img src="/images/transaction.svg" />
              <p className="text-lg text-gray-500 dark:text-gray-200">
                Transactions
              </p>
            </div>
            <table className="min-w-full mt-4 overflow-x-auto leading-normal text-gray-500 dark:text-gray-200 rounded-xl">
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
                          <p>{item.from_address_label || item.from_address}</p>
                          {getIsOut(item, address) ? (
                            <span className="px-2 py-1 text-xs text-white bg-yellow-300 rounded ">
                              OUT
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs text-green-700 bg-green-200 rounded ">
                              IN
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="flex items-center px-5 py-5 text-sm bg-white dark:bg-gray-700 ">
                        <img
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                              "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSIzM3B4IiB2aWV3Qm94PSIwIDAgMzMgMzMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDYxLjIgKDg5NjUzKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5Ub2tlbnM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnlLvmnb8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzUuMDAwMDAwLCAtMzEuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJUb2tlbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ2My4wMDAwMDAsIDE4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ik1haW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0LjA5Mzc5NDEsOS42MTI5NjI4NiBDMTMuODI1MTcwNSw5LjIzMjgzNDcgMTMuMzU0NjM0MSw5LjAwMTM2MzM1IDEyLjg0Nzc5NjcsOSBMNC4xNTUyOTU4Niw5IEMzLjY0NTgzNTIxLDguOTk5MTE2MzYgMy4xNzE5MzgxMiw5LjIzMDg3MDA1IDIuOTAxOTI0ODUsOS42MTI5NjI4NyBMMC4yMjU2MTM1MjcsMTMuNDAxNDg4OCBDLTAuMTE4NTc4MzcxLDEzLjg4NjUyMzggLTAuMDY0NzQ2MDY4OCwxNC41MTMzOTYyIDAuMzU4MzIzMzY0LDE0Ljk0Njg4NyBMNy45Mzc1MjYzNCwyMi43NzE3MTM4IEM4LjIwMjE2NjI4LDIzLjA0NTQxMDcgOC42Njc1Njc0MywyMy4wNzc1NDY0IDguOTc3MDMwNTIsMjIuODQzNDkxNiBDOS4wMDYxNTA3MywyMi44MjE0NjcyIDkuMDMzMjg1MzEsMjIuNzk3NDY4NiA5LjA1ODE4NzY5LDIyLjc3MTcxMzggTDE2LjYzNzM5MDcsMTQuOTQ2ODg3IEMxNy4wNjI4MDQxLDE0LjUxNDg3ODIgMTcuMTE5NjMzNywxMy44ODc5MTQzIDE2Ljc3NzQ3MzIsMTMuNDAxNDg4OCBMMTQuMDkzNzk0MSw5LjYxMjk2Mjg2IFoiIGlkPSLot6/lvoQiIGZpbGw9IiNDNEM2RDIiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNi43Nzc2MDcyLDE4LjQ2NTY5MjYgQzI2LjU3MjE4OTIsMTguMTc2ODkzOSAyNi4yMTIzNjczLDE4LjAwMTAzNTggMjUuODI0Nzg1NywxOCBMMTkuMTc3NTc5MiwxOCBDMTguNzg3OTkxNiwxNy45OTkzMjg3IDE4LjQyNTU5OTcsMTguMTc1NDAxMyAxOC4yMTkxMTksMTguNDY1NjkyNiBMMTYuMTcyNTI4LDIxLjM0Mzk4ODIgQzE1LjkwOTMyMjQsMjEuNzEyNDg4OSAxNS45NTA0ODgzLDIyLjE4ODc0OSAxNi4yNzQwMTIsMjIuNTE4MDg5NCBMMjIuMDY5ODczMSwyOC40NjI5MjU0IEMyMi4yNzIyNDQ4LDI4LjY3MDg2NCAyMi42MjgxMzk4LDI4LjY5NTI3ODcgMjIuODY0Nzg4LDI4LjUxNzQ1NzkgQzIyLjg4NzA1NjQsMjguNTAwNzI1MSAyMi45MDc4MDY0LDI4LjQ4MjQ5MjQgMjIuOTI2ODQ5NCwyOC40NjI5MjU0IEwyOC43MjI3MTA1LDIyLjUxODA4OTQgQzI5LjA0ODAyNjYsMjIuMTg5ODc1IDI5LjA5MTQ4NDYsMjEuNzEzNTQ1MiAyOC44Mjk4MzI1LDIxLjM0Mzk4ODIgTDI2Ljc3NzYwNzIsMTguNDY1NjkyNiBaIiBpZD0i6Lev5b6EIiBmaWxsPSIjN0Y4Mjk2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuNTgwOTM0MiwzLjc0NDMxMjcyIEMyNS4yNjQ5MDY1LDMuMjgyNzI4MTEgMjQuNzExMzM0MywzLjAwMTY1NTQ5IDI0LjExNTA1NSwzIEwxMy44ODg1ODM0LDMgQzEzLjI4OTIxNzksMi45OTg5MjcwMSAxMi43MzE2OTE5LDMuMjgwMzQyNDYgMTIuNDE0MDI5MiwzLjc0NDMxMjc0IEw5LjI2NTQyNzY4LDguMzQ0NjY5ODMgQzguODYwNDk2MDMsOC45MzM2NDE0OSA4LjkyMzgyODE1LDkuNjk0ODQ0MzMgOS40MjE1NTY5LDEwLjIyMTIyNjUgTDE4LjMzODI2NjMsMTkuNzIyODEwNiBDMTguNjQ5NjA3NCwyMC4wNTUxNTcxIDE5LjE5NzEzODIsMjAuMDk0MTc5MSAxOS41NjEyMTI0LDE5LjgwOTk2OTUgQzE5LjU5NTQ3MTQsMTkuNzgzMjI1NSAxOS42MjczOTQ1LDE5Ljc1NDA4NDMgMTkuNjU2NjkxNCwxOS43MjI4MTA2IEwyOC41NzM0MDA4LDEwLjIyMTIyNjUgQzI5LjA3Mzg4NzEsOS42OTY2NDM5NSAyOS4xNDA3NDU2LDguOTM1MzI5ODggMjguNzM4MjAzOCw4LjM0NDY2OTgyIEwyNS41ODA5MzQyLDMuNzQ0MzEyNzIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iIzRDNEY2MCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9InNwYXJrIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyLjAwMDAwMCwgMTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgNC42MDAwMDApIHJvdGF0ZSg0Ny4wMDAwMDApIHRyYW5zbGF0ZSgtMTQuMDAwMDAwLCAtNC42MDAwMDApICIgeD0iMTAiIHk9IjQiIHdpZHRoPSI4IiBoZWlnaHQ9IjEuMiIgcng9IjAuNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgOC42MDAwMDApIHJvdGF0ZSg0Ny4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC04LjYwMDAwMCkgIiB4PSIwLjUiIHk9IjgiIHdpZHRoPSI3IiBoZWlnaHQ9IjEuMiIgcng9IjAuNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjI1MDAwMCwgMTUuNjAwMDAwKSByb3RhdGUoNDcuMDAwMDAwKSB0cmFuc2xhdGUoLTE5LjI1MDAwMCwgLTE1LjYwMDAwMCkgIiB4PSIxNyIgeT0iMTUiIHdpZHRoPSI0LjUiIGhlaWdodD0iMS4yIiByeD0iMC42Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9IuakreWchuW9oiIgY3g9IjEwIiBjeT0iMC41IiByPSIxIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2i5aSH5Lu9LTMiIGN4PSIwLjUiIGN5PSI1IiByPSIxIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2i5aSH5Lu9LTQiIGN4PSIxNi41IiBjeT0iMTIuNSIgcj0iMSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                          }}
                          src={
                            getLogo(item) ||
                            "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSIzM3B4IiB2aWV3Qm94PSIwIDAgMzMgMzMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDYxLjIgKDg5NjUzKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5Ub2tlbnM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnlLvmnb8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzUuMDAwMDAwLCAtMzEuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJUb2tlbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ2My4wMDAwMDAsIDE4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ik1haW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0LjA5Mzc5NDEsOS42MTI5NjI4NiBDMTMuODI1MTcwNSw5LjIzMjgzNDcgMTMuMzU0NjM0MSw5LjAwMTM2MzM1IDEyLjg0Nzc5NjcsOSBMNC4xNTUyOTU4Niw5IEMzLjY0NTgzNTIxLDguOTk5MTE2MzYgMy4xNzE5MzgxMiw5LjIzMDg3MDA1IDIuOTAxOTI0ODUsOS42MTI5NjI4NyBMMC4yMjU2MTM1MjcsMTMuNDAxNDg4OCBDLTAuMTE4NTc4MzcxLDEzLjg4NjUyMzggLTAuMDY0NzQ2MDY4OCwxNC41MTMzOTYyIDAuMzU4MzIzMzY0LDE0Ljk0Njg4NyBMNy45Mzc1MjYzNCwyMi43NzE3MTM4IEM4LjIwMjE2NjI4LDIzLjA0NTQxMDcgOC42Njc1Njc0MywyMy4wNzc1NDY0IDguOTc3MDMwNTIsMjIuODQzNDkxNiBDOS4wMDYxNTA3MywyMi44MjE0NjcyIDkuMDMzMjg1MzEsMjIuNzk3NDY4NiA5LjA1ODE4NzY5LDIyLjc3MTcxMzggTDE2LjYzNzM5MDcsMTQuOTQ2ODg3IEMxNy4wNjI4MDQxLDE0LjUxNDg3ODIgMTcuMTE5NjMzNywxMy44ODc5MTQzIDE2Ljc3NzQ3MzIsMTMuNDAxNDg4OCBMMTQuMDkzNzk0MSw5LjYxMjk2Mjg2IFoiIGlkPSLot6/lvoQiIGZpbGw9IiNDNEM2RDIiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNi43Nzc2MDcyLDE4LjQ2NTY5MjYgQzI2LjU3MjE4OTIsMTguMTc2ODkzOSAyNi4yMTIzNjczLDE4LjAwMTAzNTggMjUuODI0Nzg1NywxOCBMMTkuMTc3NTc5MiwxOCBDMTguNzg3OTkxNiwxNy45OTkzMjg3IDE4LjQyNTU5OTcsMTguMTc1NDAxMyAxOC4yMTkxMTksMTguNDY1NjkyNiBMMTYuMTcyNTI4LDIxLjM0Mzk4ODIgQzE1LjkwOTMyMjQsMjEuNzEyNDg4OSAxNS45NTA0ODgzLDIyLjE4ODc0OSAxNi4yNzQwMTIsMjIuNTE4MDg5NCBMMjIuMDY5ODczMSwyOC40NjI5MjU0IEMyMi4yNzIyNDQ4LDI4LjY3MDg2NCAyMi42MjgxMzk4LDI4LjY5NTI3ODcgMjIuODY0Nzg4LDI4LjUxNzQ1NzkgQzIyLjg4NzA1NjQsMjguNTAwNzI1MSAyMi45MDc4MDY0LDI4LjQ4MjQ5MjQgMjIuOTI2ODQ5NCwyOC40NjI5MjU0IEwyOC43MjI3MTA1LDIyLjUxODA4OTQgQzI5LjA0ODAyNjYsMjIuMTg5ODc1IDI5LjA5MTQ4NDYsMjEuNzEzNTQ1MiAyOC44Mjk4MzI1LDIxLjM0Mzk4ODIgTDI2Ljc3NzYwNzIsMTguNDY1NjkyNiBaIiBpZD0i6Lev5b6EIiBmaWxsPSIjN0Y4Mjk2IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuNTgwOTM0MiwzLjc0NDMxMjcyIEMyNS4yNjQ5MDY1LDMuMjgyNzI4MTEgMjQuNzExMzM0MywzLjAwMTY1NTQ5IDI0LjExNTA1NSwzIEwxMy44ODg1ODM0LDMgQzEzLjI4OTIxNzksMi45OTg5MjcwMSAxMi43MzE2OTE5LDMuMjgwMzQyNDYgMTIuNDE0MDI5MiwzLjc0NDMxMjc0IEw5LjI2NTQyNzY4LDguMzQ0NjY5ODMgQzguODYwNDk2MDMsOC45MzM2NDE0OSA4LjkyMzgyODE1LDkuNjk0ODQ0MzMgOS40MjE1NTY5LDEwLjIyMTIyNjUgTDE4LjMzODI2NjMsMTkuNzIyODEwNiBDMTguNjQ5NjA3NCwyMC4wNTUxNTcxIDE5LjE5NzEzODIsMjAuMDk0MTc5MSAxOS41NjEyMTI0LDE5LjgwOTk2OTUgQzE5LjU5NTQ3MTQsMTkuNzgzMjI1NSAxOS42MjczOTQ1LDE5Ljc1NDA4NDMgMTkuNjU2NjkxNCwxOS43MjI4MTA2IEwyOC41NzM0MDA4LDEwLjIyMTIyNjUgQzI5LjA3Mzg4NzEsOS42OTY2NDM5NSAyOS4xNDA3NDU2LDguOTM1MzI5ODggMjguNzM4MjAzOCw4LjM0NDY2OTgyIEwyNS41ODA5MzQyLDMuNzQ0MzEyNzIgWiIgaWQ9Iui3r+W+hCIgZmlsbD0iIzRDNEY2MCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9InNwYXJrIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyLjAwMDAwMCwgMTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjAwMDAwMCwgNC42MDAwMDApIHJvdGF0ZSg0Ny4wMDAwMDApIHRyYW5zbGF0ZSgtMTQuMDAwMDAwLCAtNC42MDAwMDApICIgeD0iMTAiIHk9IjQiIHdpZHRoPSI4IiBoZWlnaHQ9IjEuMiIgcng9IjAuNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgOC42MDAwMDApIHJvdGF0ZSg0Ny4wMDAwMDApIHRyYW5zbGF0ZSgtNC4wMDAwMDAsIC04LjYwMDAwMCkgIiB4PSIwLjUiIHk9IjgiIHdpZHRoPSI3IiBoZWlnaHQ9IjEuMiIgcng9IjAuNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2i5aSH5Lu9LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjI1MDAwMCwgMTUuNjAwMDAwKSByb3RhdGUoNDcuMDAwMDAwKSB0cmFuc2xhdGUoLTE5LjI1MDAwMCwgLTE1LjYwMDAwMCkgIiB4PSIxNyIgeT0iMTUiIHdpZHRoPSI0LjUiIGhlaWdodD0iMS4yIiByeD0iMC42Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9IuakreWchuW9oiIgY3g9IjEwIiBjeT0iMC41IiByPSIxIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2i5aSH5Lu9LTMiIGN4PSIwLjUiIGN5PSI1IiByPSIxIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2i5aSH5Lu9LTQiIGN4PSIxNi41IiBjeT0iMTIuNSIgcj0iMSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                          }
                          alt="Logo"
                          className="w-8 mr-2 rounded-full"
                        />

                        {getTo(item)}
                      </td>
                      <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700 ">
                        {getEventType(item)}
                      </td>
                      <td className="px-5 py-5 text-sm font-bold text-gray-800 bg-white dark:text-white dark:bg-gray-700 ">
                        {formatBalance(getValue(item), 18)}{" "}
                        {getMappingCurrency(selectedChainId)}
                      </td>
                      <td className="px-5 py-5 text-sm bg-white dark:bg-gray-700">
                        {}
                        {moment(item.block_signed_at).fromNow()}
                      </td>
                    </tr>
                  );
                })}
                {items?.length === 0 && !isLoading && (
                  <tr className="bg-white border-b border-gray-200 dark:bg-gray-700 rounded-xl">
                    <td
                      colSpan={headers.length}
                      className="px-8 py-8 text-sm text-center text-gray-400 bg-white dark:text-gray-200 dark:bg-gray-700"
                    >
                      No data
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr className="bg-white border-b border-gray-200 dark:bg-gray-700 rounded-xl">
                    <td
                      colSpan={headers.length}
                      className="px-8 py-8 text-sm text-center text-gray-400 bg-gray-200 dark:text-gray-200 animate-pulse"
                    >
                      -
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IndexPage;
