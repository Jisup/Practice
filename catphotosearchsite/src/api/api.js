const API_END_POINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (type, payload) => {
  var API_SUB_POINT = "";
  switch (type) {
    case "search":
      API_SUB_POINT = `/search?q=${payload}`;
      break;
    case "random":
      API_SUB_POINT = `/random50`;
      break;
    default:
      API_SUB_POINT = `/${payload}`;
  }
  const res = await fetch(`${API_END_POINT}${API_SUB_POINT}`);
  switch (res.status / 100) {
    case 3:
      return `Redirects Error with status code ${res.status}`;
    case 4:
      return `Client Error with status code ${res.status}`;
    case 5:
      return `Server Error with status code ${res.status}`;
    default:
      return res.json();
  }
};
