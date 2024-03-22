import React from "react";
import { useForm } from "react-hook-form";

import {
  getChangedCurrencies,
  setNewCurrency,
} from "../../utils/edit-currency"; // FIXME: to other route

function CurrencyForm({ data: { r030, txt, rate } = {} }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { txt, rate } = data;
    setNewCurrency({ r030, txt, rate });
    console.log("Form data:", data);
  };

  return (
    <div
      key={r030}
      to={`/currency/${r030}`}
      className="w-[100%] md:w-[50%] block text-xl py-2"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-2"
      >
        <input
          type="text"
          className="text-blue-500 font-semibold text-center"
          placeholder={txt}
          required
          {...register("txt")}
        />
        <input
          className="text-yellow-500 font-bold text-center"
          type="number"
          required
          placeholder={rate?.toFixed(2)}
          {...register("rate")}
        />
        <input
          className="mt-2 border-2 border-gray-300 hover:bg-gray-300 hover:text-white cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
}

export default CurrencyForm;
