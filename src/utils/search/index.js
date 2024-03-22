export function searchByName(array, searchTerm) {
  const searchTermLower = searchTerm?.toLowerCase();
  const filteredItems = array.filter((item) =>
    item.txt?.toLowerCase().includes(searchTermLower)
  );
  return filteredItems;
}
