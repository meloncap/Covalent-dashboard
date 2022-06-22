import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { reqChains } from "../services/httpReq";

export const useFetchChains = () => {
  const [selectedChainId, setSelectedChainId] = useState("1");
  const [allChains, setAllChains] = useState([]);
  const [isLoadingChains, setIsLoadingChains] = useState(false);

  useEffect(() => {
    setIsLoadingChains(true);
    reqChains()
      .then(response => {
        console.log(response);
        setAllChains(response?.data?.items || []);
        setSelectedChainId("1");
      })
      .finally(() => {
        setIsLoadingChains(false);
      });
  }, []);

  return { isLoadingChains, allChains, selectedChainId, setSelectedChainId };
};
