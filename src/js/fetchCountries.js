const urlBase = 'https://restcountries.com/v3.1/name/';
const urlFilter = '?fields=name,capital,population,flags,languages';
export default class fetchCountries {
  constructor() {
    this.name = '';
  }
  fetchInfo() {
    const url = `${urlBase}${this.name}`;
    return fetch(url)
      .then(response => {
        if (response.status === 404) {
          error;
        }
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  get countryName() {
    return this.name;
  }
  set countryName(newName) {
    this.name = newName;
  }
}
