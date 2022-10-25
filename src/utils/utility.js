export function setLocalStorageData(data) {
  localStorage.setItem("library", JSON.stringify(data));
}

export function getLocalStorageData() {
  return JSON.parse(localStorage.getItem("library"));
}

export function localStorageDataClear() {
  localStorage.clear();
}
