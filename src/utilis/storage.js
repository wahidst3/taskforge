// utils/storage.js
export const loadLists = () => JSON.parse(localStorage.getItem("lists") || "[]");
export const saveLists = (lists) =>
  localStorage.setItem("lists", JSON.stringify(lists));