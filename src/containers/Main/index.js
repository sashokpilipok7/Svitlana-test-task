import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants";
import { getQuery } from "../../utils/get-query";
import ApiClient from "../../utils/api-client";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";

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
    debugger;
    return data.slice(startIndex, endIndex);
  }, [page, data]);

  console.log(filteredData, "filteredData");
  return (
    <Layout>
      <main className=" text-center">
        <ul>
          <div className="">
            <h1 className="text-xl text-grey-500">Курс валют НБУ</h1>
          </div>
          {loading && <Loader />}
          <div>
            {filteredData.map(({ r030, txt, cc, rate }) => (
              <Link
                key={r030}
                to={`/currency/${r030}`}
                className="block py-2 border-b"
              >
                <p className="text-blue-500">{txt}</p>
                <p className="text-yellow-500">
                  {rate.toFixed(2)}грн. - {cc}
                </p>
              </Link>
            ))}
          </div>
        </ul>
      </main>
    </Layout>
  );
}

export default MainPage;
