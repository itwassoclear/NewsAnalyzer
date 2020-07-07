export default class DataStorage {
  setRequest(request) {
    localStorage.setItem('searchRequest', JSON.stringify(request))
  }
  setArray(data) {
    localStorage.setItem('data.articles', JSON.stringify(data.articles));
  }
  setData(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  getRequest() {
    return JSON.parse(localStorage.getItem('searchRequest'));
  }
  getArray() {
    return JSON.parse(localStorage.getItem('data.articles'));
  }
  getData() {
    return JSON.parse(localStorage.getItem('data'));
  }
}