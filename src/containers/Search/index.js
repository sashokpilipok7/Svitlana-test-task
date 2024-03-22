import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";

import { searchByName } from "../../utils/search";
import { CurrencyContext } from "../App";

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
  } = useContext(CurrencyContext);

  const { register, watch } = useForm();

  const searchValue = watch("txt");
  const searchedData = !searchValue
    ? data
    : searchByName(wholeData, searchValue);
  console.log(searchedData, "searchedData");
  console.log(wholeData, data);

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
                className=" border-blue-500 bordered"
              />
              <input type="date" className=" border-blue-500 bordered" />
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
