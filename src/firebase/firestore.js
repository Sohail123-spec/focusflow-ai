import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";
/* SETTINGS */

import {
  setDoc,
  getDoc
} from "firebase/firestore";
/* LOAD TASKS */

export const loadTasks = async (
  userId
) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "tasks"
    )

  );

  return snapshot.docs.map(
    doc => ({
      firestoreId:doc.id,
      ...doc.data()
    })
  );

};

/* ADD TASK */

export const addTaskToFirestore =
async (

  userId,
  task

) => {

  await addDoc(

    collection(
      db,
      "users",
      userId,
      "tasks"
    ),

    task

  );

};

/* DELETE TASK */

export const deleteTaskFromFirestore =
async (

  userId,
  firestoreId

) => {

  await deleteDoc(

    doc(
      db,
      "users",
      userId,
      "tasks",
      firestoreId
    )

  );

};

/* UPDATE TASK */

export const updateTaskInFirestore =
async (

  userId,
  firestoreId,
  updatedTask

) => {

  await updateDoc(

    doc(
      db,
      "users",
      userId,
      "tasks",
      firestoreId
    ),

    updatedTask

  );

};
/* LOAD PLANS */

export const loadPlans = async (
  userId
) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "plans"
    )

  );

  return snapshot.docs.map(
    doc => ({
      firestoreId:doc.id,
      ...doc.data()
    })
  );

};

/* ADD PLAN */

export const addPlanToFirestore =
async (

  userId,
  plan

) => {

  await addDoc(

    collection(
      db,
      "users",
      userId,
      "plans"
    ),

    plan

  );

};

/* DELETE PLAN */

export const deletePlanFromFirestore =
async (

  userId,
  firestoreId

) => {

  await deleteDoc(

    doc(
      db,
      "users",
      userId,
      "plans",
      firestoreId
    )

  );

};

/* UPDATE PLAN */

export const updatePlanInFirestore =
async (

  userId,
  firestoreId,
  updatedPlan

) => {

  await updateDoc(

    doc(
      db,
      "users",
      userId,
      "plans",
      firestoreId
    ),

    updatedPlan

  );

};
/* LOAD FOCUS SESSIONS */

export const loadFocusSessions =
async (

  userId

) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "focusSessions"
    )

  );

  return snapshot.docs.map(
    doc => ({
      firestoreId:doc.id,
      ...doc.data()
    })
  );

};

/* ADD FOCUS SESSION */

export const addFocusSessionToFirestore =
async (

  userId,
  session

) => {

  await addDoc(

    collection(
      db,
      "users",
      userId,
      "focusSessions"
    ),

    session

  );

};
export const loadDashboardTasks =
async (userId) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "tasks"
    )

  );

  return snapshot.docs.map(
    doc => doc.data()
  );

};

export const loadDashboardPlans =
async (userId) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "plans"
    )

  );

  return snapshot.docs.map(
    doc => doc.data()
  );

};

export const loadDashboardFocusSessions =
async (userId) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "focusSessions"
    )

  );

  return snapshot.docs.map(
    doc => doc.data()
  );

};
/* ANALYTICS DATA */

export const loadAnalyticsTasks =
async (userId) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "tasks"
    )

  );

  return snapshot.docs.map(
    doc => doc.data()
  );

};

export const loadAnalyticsPlans =
async (userId) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "plans"
    )

  );

  return snapshot.docs.map(
    doc => doc.data()
  );

};

export const loadAnalyticsFocusSessions =
async (userId) => {

  const snapshot =
  await getDocs(

    collection(
      db,
      "users",
      userId,
      "focusSessions"
    )

  );

  return snapshot.docs.map(
    doc => doc.data()
  );

};
export const loadSettings =
async (userId) => {

  const settingsRef =
  doc(
    db,
    "users",
    userId,
    "preferences",
    "settings"
  );

  const snapshot =
  await getDoc(
    settingsRef
  );

  if(snapshot.exists()){

    return snapshot.data();

  }

  return null;

};

export const saveSettings =
async (

  userId,
  settings

) => {

  await setDoc(

    doc(
      db,
      "users",
      userId,
      "preferences",
      "settings"
    ),

    settings

  );

};