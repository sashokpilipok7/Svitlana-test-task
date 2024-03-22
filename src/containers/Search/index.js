import React, { useContext, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants/index.js";
import { getQuery } from "../../utils/get-query/index.js";
import { useForm } from "react-hook-form";

import { searchByName } from "../../utils/search";
import { CurrencyContext } from "../App";
import ApiClient from "../../utils/api-client";

import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import CurrencyCard from "../../components/CurrencyCard";
import Pagination from "../../components/Pagination";

function SearchPage() {
  const { data, wholeData, isLoading, setLoading } =
    useContext(CurrencyContext);
  const [filteredData, setFilteredData] = useState(data);

  const { register, watch, handleSubmit } = useForm();

  function onSubmit() {
    async function getData() {
      setLoading(true);
      let searchDateValue = watch("date");
      searchDateValue = searchDateValue.split("-").join("");
      let data = await ApiClient.get(`&date=${searchDateValue}`);
      setLoading(false);

      const hashedData = {};
      data.map((item) => (hashedData[item.r030] = item));

      setFilteredData(data);
    }
    getData();
  }

  const location = useLocation();
  const [page, setPage] = useState(getQuery(location, "page") || 1);

  const paginationData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  }, [page, data]);
  const allPagesCount = useMemo(() => {
    return Math.ceil(data?.length / ITEMS_PER_PAGE);
  }, [data]);

  const searchValue = watch("txt");
  const searchedData = !searchValue
    ? paginationData
    : searchByName(wholeData, searchValue);

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
      {isLoading ? (
        <Loader />
      ) : (
        <main className="text-center pb-10">
          <ul>
            <div className="flex flex-row justify-center gap-4">
              <input
                {...register("txt")}
                type="text"
                className="text-blue-500 font-semibold text-center"
                placeholder="Search by name"
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("date")}
                  type="date"
                  className=" border-blue-500 bordered"
                />
                <input type="submit" />
              </form>
            </div>
            {isLoading && <Loader />}
            <div className="flex flex-wrap items-center py-8">
              {searchedData.map((currency) => (
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
      )}
    </Layout>
  );
}

export default SearchPage;
