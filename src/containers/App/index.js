import { createContext, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants/index.js";
import ApiClient from "../../utils/api-client";
import { getQuery } from "../../utils/get-query/index.js";

import MainPage from "../Main/index.js";
import ChangedCurrencyPage from "../ChangedCurrency/index.js";
import CurrencyPage from "../Currency/index.js";
import SearchPage from "../Search/index.js";

// FIXME: have to do, Pagination, search logic

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

  const location = useLocation();
  const [page, setPage] = useState(getQuery(location, "page") || 1);

  const filteredData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  }, [page, data]);
  const allPagesCount = useMemo(() => {
    return Math.ceil(data?.length / ITEMS_PER_PAGE);
  }, [data]);

  function onNext() {
    if (page !== allPagesCount) {
      setPage(page + 1);
    }
  }

  function onPrev() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  function onSpecificPage(pageNumber) {
    setPage(pageNumber);
  }
  return (
    <CurrencyContext.Provider
      value={{
        wholeData: data,
        data: filteredData,
        dataHashTable,
        isLoading: loading,
        page,
        allPagesCount,
        onNext,
        onPrev,
        onSpecificPage,
        changeCurrency: () => console.log("Currency was changed!"),
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
