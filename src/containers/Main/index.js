import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  return (
    <Layout>
      <main className=" text-center">
        <ul>
          <div className="bg-gray-100 p-4 rounded-sm shadow-xs">
            <h1 className="text-blue-500 font-bold">Курс валют згідно НБУ</h1>
          </div>
          {loading && <Loader />}
          {data.map(({ r030, txt, cc, rate }) => (
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
        </ul>
      </main>
    </Layout>
  );
}

export default MainPage;
