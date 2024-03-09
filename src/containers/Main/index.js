import { useEffect, useState } from "react";
import ApiClient from "../../utils/api-client";
import Loader from "../../components/Loader";

import styles from "./styles.scss";

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
    <>
      <div className={styles.main}>
        <ul>
          <div className="bg-gray-100 p-4 rounded-sm shadow-xs">
            <h1 className="text-blue-500 font-bold">Курс валют згідно НБУ</h1>
          </div>
          {loading && <Loader />}
          {data.map(({ r030, txt, cc, rate }) => (
            <div key={r030} className="py-2 border-b">
              <p className="text-blue-500">{txt}</p>
              <p className="text-yellow-500">
                {rate.toFixed(2)}грн. - {cc}
              </p>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MainPage;
