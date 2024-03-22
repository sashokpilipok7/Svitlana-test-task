const CHANGED_CURRENCY_FIELD = "CHANGED-CURRENCIES";

// export function formatUniqueData(data, newData) {
//   const formattedData = [...data];
//   let existingItem;

//   debugger;
//   formattedData.forEach((item) => {
//     existingItem = newData?.r030 === item?.r030;
//   });

//   if (existingItem) {
//     Object.assign(existingItem, newData);
//   } else {
//     formattedData.push(newData);
//   }
//   debugger;
//   return formattedData;
// }

export function formatUniqueData(data, newData) {
  const formattedData = [...data];

  for (let i = 0; i < formattedData.length; i++) {
    const currentItem = formattedData[i];
    if (currentItem.r030 === newData.r030) {
      Object.assign(currentItem, newData);
      return formattedData;
    }
  }

  formattedData.push(newData);
  return formattedData;
}

export function getChangedCurrencies() {
  let list = localStorage.getItem(CHANGED_CURRENCY_FIELD);
  list = JSON.parse(list) || [];
  list = list.map((item) => ({ ...item, rate: Number(item?.rate) }));
  return list;
}

export function setNewCurrency(changedCurrency) {
  let current_list_of_changed_currencies = getChangedCurrencies();
  current_list_of_changed_currencies = formatUniqueData(
    current_list_of_changed_currencies,
    changedCurrency
  );

  localStorage.setItem(
    CHANGED_CURRENCY_FIELD,
    JSON.stringify(current_list_of_changed_currencies)
  );
}
