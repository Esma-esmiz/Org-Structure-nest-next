// "use client";
import { useEffect } from "react";
import store from "../state/store";

export const deleteDepartment = async (id: number) => {
  console.log("before delete");
  fetch(`http://localhost:3000/api/v1/department/${id}`, { method: "DELETE" })
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());

      if (response.ok) {
        store.dispatch({
          type: "DELETE_DEPARTMENT",
          payload: {
            id: id,
          },
        });
      }
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      return response;
      // return 'Delete successful';
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export function loadApi() {
  
    const fetchData = async () => {
      try {
        await fetch("http://localhost:3000/api/v1/department")
          .then((response) => response.json())
          .then((data) => {
            data.map((dep) => {
              store.dispatch({
                type: "ADD_DEPARTMENT",
                payload: {
                  id: dep.id,
                  name: dep.name,
                  description: dep.description,
                  managing_id: dep.managing_id,
                },
              });
            });
          });
      } catch (err) {
        console.log(err);
      }
    }; 
    fetchData();

}
