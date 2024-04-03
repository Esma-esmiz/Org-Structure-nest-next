// "use client";

import loadApi from "../services/AppService";
import store from "./store";

let lastId = 0;
const initialState = {
  id: "",
  name: "",
  description: "",
  managing_id: "",
  resolved: false,
};
export default function reducer(state = [], action: any) {
  if (action.type === "ADD_DEPARTMENT") {
    return [
      ...state,
      {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        managing_id: action.payload.managing_id,
        resolved: false,
      },
    ];
  } else if (action.type === "UPDATE_DEPARTMENT") {
    console.log("dep state updating..");
   
    return state;
  } else if (action.type === "DELETE_DEPARTMENT") {
    console.log("dep state deleting..");
    // return state.filter(dep => dep.id !== action.payload.id);
    //      state.filter((todo, i) => i !== action.payload.index)
    // return state;
  } else if (action.type === "RESET_STATE") {
    return (state = []);
  }

  return state;
}
