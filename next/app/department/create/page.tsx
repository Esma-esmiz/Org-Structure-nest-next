"use client";
import React, { FormEvent } from "react";
import Header from "../../components/header";
import SideNave from "../../components/sideNave";
import store from "../../state/store";
import { useRouter } from "next/router";
import { permanentRedirect, redirect } from "next/navigation";
import mockRouter from "next-router-mock";

import {
  Box,
  Button,
  MantineProvider,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function page() {
  const department = store.getState().department;
  console.log("store changes ", department);

  const form = useForm({
    initialValues: { name: "", description: "", managing_id: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2
          ? "Department Name must have at least 2 letters"
          : null,
      description: (value) =>
        value.length < 2
          ? "Department Name must have at least 2 letters"
          : null,
      managing_id: (value) =>
        value == null ? "You must select the managing department" : null,
    },
  });

  async function onSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form_value = Object.fromEntries(formData);
    try {
      const managing_dep = parseInt(form_value.managing_id.toString());
      console.log(typeof managing_dep);
      // formData.set("managing_id", managing_dep);
      const response = await fetch("http://localhost:3000/api/v1/department", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(form_value),
      });

      // Handle response if necessary
      // const data = await response.json();
      if (response.ok) {
        const data = await response.json();
        console.log("id=", form_value.managing_id);
        store.dispatch({
          type: "ADD_DEPARTMENT",
          payload: {
            id: data.id,
            name: data.name,
            description: data.description,
            managing_id: data.managing_id,
          },
        });
        form.reset();
        mockRouter.push("/department");
      }
    } catch (err) {
      console.log("err=", err);
    }
  }

  let department1 = [
    {
      value: "",
      label: "",
    },
  ];
  department1 = department.map((dep) => ({
    value: dep.id,
    label: dep.name,
  }));
  return (
    <div className="w-1/3">
      <Box mx="auto">
        <form onSubmit={onSubmit}>
          <TextInput
            label="Name"
            placeholder="Name"
            name="name"
            {...form.getInputProps("name")}
          />
          <TextInput
            mt="sm"
            label="Description"
            placeholder="Description"
            name="description"
            {...form.getInputProps("description")}
          />
          <Select
            mt="sm"
            label="Managing_id"
            placeholder="pick department"
            searchable
            name="managing_id"
            data={department.map((dep) => ({
              value: dep.id.toString(),
              label: dep.name,
            }))}
            allowDeselect
            nothingFoundMessage="Department not Found..."
            // {...form.getInputProps("managing_id")}
          />
          {/* <option  > -- Select a Managing Department -- </option>
             {department.map((dep)=> <option value={dep.id} > {dep.name} </option>)}
            </Select> */}
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default page;
