import React, { useContext } from "react";

import { searchByName } from "../../utils/search";
import { CurrencyContext } from "../App";

import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import CurrencyCard from "../../components/CurrencyCard";
import Pagination from "../../components/Pagination";

function SearchPage() {
  const {
    data,
    isLoading,
    page,
    allPagesCount,
    onNextPage,
    onPrevPage,
    onSpecificPage,
  } = useContext(CurrencyContext);

  // FIXEM: change condition to input or query value
  const searchedData = data ? searchByName(data, "") : searchByName(data, "");

  return (
    <Layout>
      <main className="text-center pb-10">
        <ul>
          <div className="flex flex-row justify-center gap-4">
            <input
              name="txt"
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
    </Layout>
  );
}

export default SearchPage;
