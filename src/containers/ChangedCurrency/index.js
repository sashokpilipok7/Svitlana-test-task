import React, { useEffect, useState } from "react";

import { getChangedCurrencies } from "../../utils/edit-currency";

import Layout from "../../components/Layout";
import CurrencyCard from "../../components/CurrencyCard";

function ChangedCurrencyPage() {
  const [list, setList] = useState(getChangedCurrencies);

  useEffect(() => {
    const data = getChangedCurrencies();
    setList(data);
  }, []);
  return (
    <Layout>
      <main className="text-center pb-10">
        <div className="flex flex-wrap items-center py-8">
          {list.map((currency) => (
            <CurrencyCard key={currency.r030} data={currency} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

export default ChangedCurrencyPage;
