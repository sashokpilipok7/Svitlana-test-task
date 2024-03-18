import React from "react";
import { Link } from "react-router-dom";

function CurrencyCard({ data: { r030, txt, rate } = {}, isEditing }) {
  if (!r030) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here, e.g., send data to server
    console.log("Form submitted:", event.target.value);
  };

  let content = null;

  content = isEditing ? (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-2"
    >
      <input
        className="text-blue-500 font-semibold text-center"
        placeholder={txt}
      />
      <input
        className="text-yellow-500 font-bold text-center"
        type="text"
        placeholder={rate.toFixed(2)}
      />
      <button
        type="submit"
        className="mt-2 border-2 border-gray-300 hover:bg-gray-300 hover:text-white"
      >
        Save
      </button>
      <button type="submit">Submit</button>
    </form>
  ) : (
    <>
      <p className="text-blue-500 font-semibold">{txt}</p>
      <p className="text-yellow-500 font-bold">{rate.toFixed(2)}грн.</p>
    </>
  );

  return (
    <Link
      key={r030}
      to={`/currency/${r030}`}
      className="w-[100%] md:w-[50%] block text-xl py-2"
    >
      {content}
    </Link>
  );
}

export default CurrencyCard;
