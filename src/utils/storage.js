export const getUserStorageKey = (
  userId,
  key
) => {

  return `focusflow-${key}-${userId}`;

};

/* =========================
   SAVE DATA
========================= */

export const saveUserData = (
  userId,
  key,
  data
) => {

  const storageKey =
  getUserStorageKey(
    userId,
    key
  );

  localStorage.setItem(

    storageKey,

    JSON.stringify(data)

  );

};

/* =========================
   LOAD DATA
========================= */

export const loadUserData = (
  userId,
  key
) => {

  const storageKey =
  getUserStorageKey(
    userId,
    key
  );

  const storedData =
  localStorage.getItem(
    storageKey
  );

  return storedData
    ? JSON.parse(storedData)
    : [];

};