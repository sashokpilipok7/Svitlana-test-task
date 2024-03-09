export function getQuery(location, name) {
  const params = new URLSearchParams(location.search);
  const paramValue = params.get(name);
  return paramValue ? paramValue : undefined;
}
