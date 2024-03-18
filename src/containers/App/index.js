import { createContext, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants/index.js";
import { ApiClient } from "../../utils/api-client/index.js";
import { getQuery } from "../../utils/get-query/index.js";

import MainPage from "../Main/index.js";
import ChangedCurrencyPage from "../ChangedCurrency/index.js";
import CurrencyPage from "../Currency/index.js";
import SearchPage from "../Search/index.js";

const mockedData = [
  //FIXME: remove mocked data after ending
  {
    r030: "111",
    txt: "First currency",
    rate: 38.1,
  },
  {
    r030: "222",
    txt: "First currency 2",
    rate: 38.2,
  },
  {
    r030: "333",
    txt: "First currency 3",
    rate: 38.3,
  },
];

export const CurrencyContext = createContext({
  isLoading: false,
  page: 1,
  data: [],
  allPagesCount: 0,
  onNextPage: () => {},
  onPrevPage: () => {},
  onSpecificPage: () => {},
  changeCurrency: () => {},
});

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let data = await ApiClient.get("");
      console.log(data, "data"); //FIXME: remove trash
      setLoading(false);
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
      data={filteredData}
      isLoading={loading}
      page={page}
      allPagesCount={allPagesCount}
      onNext={onNext}
      onPrev={onPrev}
      onSpecificPage={onSpecificPage}
      changeCurrency={() => {
        console.log("Currency was changed!");
      }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/changed" element={<ChangedCurrencyPage />} />
          <Route path="/currency/:id" element={<CurrencyPage />} />
        </Routes>
      </Router>
    </CurrencyContext.Provider>
  );
}
