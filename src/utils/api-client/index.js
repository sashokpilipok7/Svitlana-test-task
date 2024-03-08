export const RESPONSE_STATUSES = {
  UNAUTORIZED: 401,
};

export class ApiClient {
  constructor() {
    this.baseUrl = process.env.API_URL;
    this.baseUrl =
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
  }

  _request({ method, url, data, config = {} }) {
    return new Promise((resolve, reject) => {
      let payload = {
        method,
        headers: {
          ...config.headers,
        },
        ...config,
      };

      fetch(this.baseUrl + url, payload)
        .then((response) => {
          return Promise.all([
            response.json(),
            response.status === RESPONSE_STATUSES.UNAUTORIZED,
          ]);
        })
        .then((values) => {
          const [json, isUnAutorized] = values;
          if (!isUnAutorized) {
            resolve(json);
          }
        })
        .catch((err) => {
          //   toast.error(err);
          reject(err);
        });
    });
  }

  get(url, params, config) {
    return this._request({
      method: "GET",
      url,
      data: params,
      config,
    });
  }
}

export default new ApiClient();
