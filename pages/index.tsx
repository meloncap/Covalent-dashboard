import { useContext, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import AppContext from "../AppContext";

export const IndexPage = () => {
  const { selectedChainId } = useContext(AppContext);

  return (
    <AppLayout
      title="Conflux PoS Validators / Pools"
      desc="Find the best Pool / Validator to stake your CFX token on Conflux Network"
    >
      <div className="lg:px-0">{selectedChainId}</div>
    </AppLayout>
  );
};

export default IndexPage;
