import { useEffect, useState } from "react";
import ApiClient from "../../utils/api-client";
import Loader from "../../components/Loader";

import "./styles.scss";

function App() {
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
      <main className="app">
        <ul>
          {loading && <Loader />}
          {data.map((item) => (
            <div className="p-4">
              <p className="text-orange-500">{item.rate}</p>
              <p className="text-orange-500">{item.cc}</p>
              <p className="text-orange-500">{item.txt}</p>
              <hr />
            </div>
          ))}
        </ul>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          <p className="text-blue-500 font-bold">Hello, Tailwind CSS!</p>
        </div>
        <button className="text-red-500 bg-cyan-600 p-6">HaAA</button>
      </main>
    </>
  );
}

export default App;
