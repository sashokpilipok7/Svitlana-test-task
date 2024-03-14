import React from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout";

function CurrencyPage() {
  const { id } = useParams();
  let content = null;

  if (isNaN(id)) {
    content = (
      <h1 className="text-2xl md:text-3xl text-yellow-500 font-semibold text-center">
        Oops. Wrong id type
      </h1>
    );
  } else {
    content = <div>Currency page</div>;
  }

  return <Layout>{content}</Layout>;
}

export default CurrencyPage;
