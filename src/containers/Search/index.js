import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { searchByName } from "../../utils/search";
import { CurrencyContext } from "../App";
import ApiClient from "../../utils/api-client";

import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import CurrencyCard from "../../components/CurrencyCard";
import Pagination from "../../components/Pagination";

function SearchPage() {
  const {
    data,
    wholeData,
    isLoading,
    page,
    allPagesCount,
    onNextPage,
    onPrevPage,
    onSpecificPage,
    setLoading,
  } = useContext(CurrencyContext);
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

  const searchValue = watch("txt");
  const searchedData = !searchValue
    ? filteredData
    : searchByName(wholeData, searchValue);

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
            onNext={onNextPage}
            onPrev={onPrevPage}
            onSpecificPage={onSpecificPage}
          />
        </main>
      )}
    </Layout>
  );
}

export default SearchPage;
