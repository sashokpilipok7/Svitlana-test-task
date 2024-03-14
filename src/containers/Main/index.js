import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants";
import { getQuery } from "../../utils/get-query";
import ApiClient from "../../utils/api-client";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import CurrencyCard from "../../components/CurrencyCard";

const mockedData = [
  // Add react context instead
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

function MainPage() {
  const [data, setData] = useState(mockedData); //FIXME
  const [loading, setLoading] = useState(false);

  // useEffect(() => { //FIXME
  //   async function getData() {
  //     setLoading(true);
  //     let data = await ApiClient.get("");
  //     console.log(data, "data");
  //     setLoading(false);
  //     setData(data);
  //   }
  //   getData();
  // }, []);

  const location = useLocation();
  const [page, setPage] = useState(getQuery(location, "page") || 1);

  const filteredData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  }, [page, data]);
  const allPagesCount = useMemo(() => {
    return Math.ceil(data?.length / ITEMS_PER_PAGE);
  }, [page, data]);

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

  console.log(filteredData, "filteredData");
  return (
    <Layout>
      <main className="text-center pb-10">
        <ul>
          <div className="">
            <h1 className="text-2xl md:text-3xl text-yellow-500 font-semibold">
              Курс валют НБУ
            </h1>
          </div>
          {loading && <Loader />}
          <div className="flex flex-wrap items-center py-8">
            {filteredData.map((currency) => (
              <CurrencyCard data={currency} />
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
