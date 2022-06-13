import qs from "query-string";
import fetch from "./request";

const covalent_api = "https://api.covalenthq.com/v1/";
const API_KEY = "ckey_c5bbcbbcd1a148b4bb84669df97";

export const sendRequest = (config: {
  query?: any;
  url: string;
  type?: string;
  headers?: any;
  body?: any;
}) => {
  return fetch(
    qs.stringifyUrl({ url: covalent_api + config.url, query: config.query }),
    {
      method: config.type || "GET",
      body: config.body,
      headers: config.headers,
    }
  );
};

export const reqChains = () => {
  return sendRequest({
    url: `chains/status/?key=${API_KEY}&format=JSON`,
  });
};

export const reqBalanceOfAddress = (chainId: string, address: string) => {
  return sendRequest({
    url: `${chainId}/address/${address}/balances_v2/?key=${API_KEY}&format=JSON`,
  });
};

export const reqFolio = (chainId: string, address: string) => {
  return sendRequest({
    url: `${chainId}/address/${address}/portfolio_v2/?key=${API_KEY}&format=JSON`,
  });
};

export const reqTransactions = (
  chainId: string,
  address: string,
  pageNumber: number = 0
) => {
  return sendRequest({
    url: `${chainId}/address/${address}/transactions_v2/?key=${API_KEY}&format=JSON&&page-number=${pageNumber}`,
  });
};

export const reqNFTs = (chainId: string, contract: string) => {
  return sendRequest({
    url: `${chainId}/tokens/${contract}/nft_token_ids/?key=${API_KEY}&format=JSON`,
  });
};

export const reqAllNFTs = (chainId: string) => {
  return sendRequest({
    url: `${chainId}/nft_market/?key=${API_KEY}&format=JSON`,
  });
};
