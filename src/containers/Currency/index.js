import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import CurrencyCard from "../../components/CurrencyCard";

const mockedDataHashTable = {
  // Add react context instead
  111: {
    r030: "111",
    txt: "First currency",
    rate: 38.1,
  },
  222: {
    r030: "222",
    txt: "First currency 2",
    rate: 38.2,
  },
  333: {
    r030: "333",
    txt: "First currency 3",
    rate: 38.3,
  },
};

function CurrencyPage() {
  const { id } = useParams();
  const data = useMemo(() => {
    return mockedDataHashTable[id];
  }, [id]);
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
      {content}
    </Layout>
  );
}

export default CurrencyPage;
