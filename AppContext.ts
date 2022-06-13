import React from "react";

interface ChainInfo {
  name: string;
  chain_id: string;
  is_testnet: boolean;
  logo_url: string;
  synced_block_height: number;
  synced_blocked_signed_at: string;
}

export interface AppState {
  address?: string;
  allChains: ChainInfo[];
  isLoadingChains?: boolean;
  selectedChainId?: string;
  setSelectedChainId: (id: string) => void;
  setAddress: (address: string) => void;
}

export default React.createContext<AppState>({
  allChains: [],
  isLoadingChains: false,
  selectedChainId: undefined,
  setSelectedChainId: (loading: string) => {},
  setAddress: (address: string) => {},
});
