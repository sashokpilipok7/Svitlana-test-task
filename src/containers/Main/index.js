import { useContext } from "react";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants/index.js";
import { getQuery } from "../../utils/get-query/index.js";

import { CurrencyContext } from "../App";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import CurrencyCard from "../../components/CurrencyCard";

function MainPage() {
  const { data, isLoading } = useContext(CurrencyContext);

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
    <Layout>
      <main className="text-center pb-10">
        <ul>
          <div className="">
            <h1 className="text-2xl md:text-3xl text-yellow-500 font-semibold">
              Курс валют НБУ
            </h1>
          </div>
          {isLoading && <Loader />}
          <div className="flex flex-wrap items-center py-8">
            {filteredData.map((currency) => (
              <CurrencyCard key={currency.r030} data={currency} />
            ))}
          </div>
        </ul>
        <Pagination
          currentPage={page}
          allPages={allPagesCount}
          allDataLength={data?.length}
          onNext={onNext}
          onPrev={onPrev}
          onSpecificPage={onSpecificPage}
        />
      </main>
    </Layout>
  );
}

export default MainPage;
