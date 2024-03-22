import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ApiClient from "../../utils/api-client";

import MainPage from "../Main/index.js";
import ChangedCurrencyPage from "../ChangedCurrency/index.js";
import CurrencyPage from "../Currency/index.js";
import SearchPage from "../Search/index.js";

export const CurrencyContext = createContext({
  isLoading: false,
  page: 1,
  data: [],
  dataHashTable: {},
  allPagesCount: 0,
  onNextPage: () => {},
  onPrevPage: () => {},
  onSpecificPage: () => {},
});

export default function App() {
  const [data, setData] = useState([]);
  const [dataHashTable, setDataHashTable] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let data = await ApiClient.get("");
      setLoading(false);

      const hashedData = {};
      data.map((item) => (hashedData[item.r030] = item));

      setDataHashTable(hashedData);
      setData(data);
    }
    getData();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        wholeData: data,
        data: data,
        dataHashTable,
        isLoading: loading,
        setData,
        setDataHashTable,
        setLoading,
      }}
    >
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/changed" element={<ChangedCurrencyPage />} />
        <Route path="/currency/:id" element={<CurrencyPage />} />
      </Routes>
    </CurrencyContext.Provider>
  );
}
