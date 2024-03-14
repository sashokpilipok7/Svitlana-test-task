import React from "react";
import { Link } from "react-router-dom";

function CurrencyCard({ data: { r030, txt, rate } = {} }) {
  if (!r030) {
    return null;
  }

  return (
    <Link
      key={r030}
      to={`/currency/${r030}`}
      className="w-[100%] md:w-[50%] block text-xl py-2"
    >
      <p className="text-blue-500 font-semibold">{txt}</p>
      <p className="text-yellow-500 font-bold">{rate.toFixed(2)}грн.</p>
    </Link>
  );
}

export default CurrencyCard;
