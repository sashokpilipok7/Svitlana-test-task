import React, { useMemo, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  getChangedCurrencies,
  setNewCurrency,
} from "../../utils/edit-currency"; // FIXME: to other route

import Loader from "../../components/Loader";
import { CurrencyContext } from "../App";
import Layout from "../../components/Layout";
import CurrencyCard from "../../components/CurrencyCard";
import CurrencyForm from "../../components/CurrencyForm";

function CurrencyPage() {
  const { id } = useParams();
  const { isLoading, dataHashTable } = useContext(CurrencyContext);

  const data = useMemo(() => {
    return dataHashTable[id];
  }, [id, dataHashTable]);

  let content = null;

  if (isNaN(id)) {
    content = (
      <h1 className="text-2xl md:text-3xl text-yellow-500 font-semibold text-center">
        Oops. Wrong id type
      </h1>
    );
  } else {
    content = <CurrencyCard data={data} />;
  }

  return (
    <Layout className="text-center flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className=" text-gray-500">Prev value:</h3>
          {content}
          <br />
          <h3 className=" text-gray-500">New value:</h3>
          <CurrencyForm data={data} />
        </>
      )}
    </Layout>
  );
}

export default CurrencyPage;
