import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants";
import { getQuery } from "../../utils/get-query";
import ApiClient from "../../utils/api-client";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";

function MainPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let data = await ApiClient.get("");
      console.log(data, "data");
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
    return Math.trunc(data?.length / ITEMS_PER_PAGE);
  }, [page, data]);

  console.log(filteredData, "filteredData");
  return (
    <Layout>
      <main className="text-center">
        <ul>
          <div className="">
            <h1 className="text-xl text-yellow-500 font-semibold">
              Курс валют НБУ
            </h1>
          </div>
          {loading && <Loader />}
          <div className="flex flex-wrap items-center py-8">
            {filteredData.map(({ r030, txt, cc, rate }) => (
              <Link
                key={r030}
                to={`/currency/${r030}`}
                className="w-[100%] md:w-[50%] block text-xl py-2"
              >
                <p className="text-blue-500 font-semibold">{txt}</p>
                <p className="text-yellow-500 font-bold">
                  {rate.toFixed(2)}грн. - {cc}
                </p>
              </Link>
            ))}
          </div>
        </ul>
        <Pagination
          currentPage={page}
          allPages={allPagesCount}
          allDataLength={data?.length}
        />
      </main>
    </Layout>
  );
}

export default MainPage;
