"use client"
import Image from "next/image";
import { createTheme, MantineProvider } from "@mantine/core";
import HomePage from "./department/page";
// core styles are required for all packages
import "@mantine/core/styles.css";
import Header from "./components/header";
import { useEffect } from "react";
import store from "./state/store";
import {loadApi} from "./services/AppService";


// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
const theme = createTheme({
  /** Your theme override here */
});
export default function Home() {
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetch("http://localhost:3000/api/v1/department")
  //         .then((response) => response.json())
  //         .then((data) => {
  //           data.map((dep) => {
  //             store.dispatch({
  //               type: "ADD_DEPARTMENT",
  //               payload: {
  //                 id: dep.id,
  //                 name: dep.name,
  //                 description: dep.description,
  //                 managing_id: dep.managing_id,
  //               },
  //             });
  //           });
  //         });

  //       // const ceo = departments.filter(dep =>{
  //       //   if( dep.managing_id ==null){
  //       //     return dep
  //       //   }p
  //       // } )
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // });
  loadApi();

  return (
    
      <div>home page</div>
    
  );
}
