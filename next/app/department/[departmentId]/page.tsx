"use client";
import React from "react";
import Header from "../../components/header";
import SideNave from "../../components/sideNave";
import store from "../../state/store";

import {
  Box,
  Button,
  MantineProvider,
  Notification,
  NumberInput,
  rem,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { getMaxAge } from "next/dist/server/image-optimizer";
import { modals } from "@mantine/modals";
import { IconX, IconCheck } from "@tabler/icons-react";
import { loadApi } from "@/app/services/AppService";

function page({ params }) {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const current_state = store.getState().department;
  const getDep = (value: any) => value.id === Number(params.departmentId);
  const dep = current_state.filter(getDep);

  const geManager = (value: any) =>
    value.id === dep.map((val) => val.managing_id)[0];
  const managerDep = current_state.filter(geManager);
  console.log(
    "dep manager",
    managerDep.map((vlaue) => vlaue.name),
    dep.map((val) => val.managing_id)
  );

  const form = useForm({
    initialValues: {
      name: dep.map((value) => value.name)[0],
      description: dep.map((value) => value.description)[0],
      managing_id: dep.map((value) => value.managing_id)[0],
    },

    validate: {
      name: (value) =>
        value.length < 2
          ? "Department Name must have at least 2 letters"
          : null,
      description: (value) =>
        value.length < 2
          ? "Department Name must have at least 2 letters"
          : null,
    },
  });

  let department1 = [
    {
      value: "",
      label: "",
    },
  ];

  department1 = current_state.map((dep) => ({
    value: dep.id,
    label: dep.name,
  }));

  async function onSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form_value = Object.fromEntries(formData);
    form.validate();
    if (form.isValid()) {
      const openModal = () =>
        modals.openConfirmModal({
          children: <Text size="sm">Are sure to update department</Text>,
          labels: { confirm: "Confirm", cancel: "Cancel" },
          onCancel: () => console.log("Cancel"),

          onConfirm: async () => {
            try {
              const managing_dep = parseInt(form_value.managing_id.toString());
              console.log(typeof managing_dep);
              // formData.set("managing_id", managing_dep);
              const response = await fetch(
                `http://localhost:3000/api/v1/department/${params.departmentId}`,
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  method: "PATCH",
                  body: JSON.stringify(form_value),
                }
              );

              // Handle response if necessary
              const data = await response.json();
              if (!response.ok) {
                return (
                  <Notification icon={xIcon} color="red" title="Bummer!">
                    notifif
                    {data.message}
                  </Notification>
                );
              }
              if (response.ok) {
                console.log("update response=", data);
                store.dispatch({
                  type: "RESET_STATE",
                });
                loadApi();
                form.setInitialValues({
                  name: "",
                  description: "",
                  managing_id: "",
                });
                form.reset();
              }
              console.log(store.getState(), "respo=", data);
            } catch (err) {
              console.log("err=", err);
            }
          },
        });
      openModal();
    }
  }

  console.log("loading..");
  // const load =()=> loadApi();

  return (
    <div className="w-1/3">
      <h3>Edit Department</h3>
      <Box mx="auto">
        {/* {dep.map((value) => ( */}
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
            data={current_state.map((depp) => ({
              value: depp.id.toString(),
              label: depp.name,
            }))}
            value={managerDep.map((value) => value.name)[0]}
            {...form.getInputProps("managing_id")}
          />

          <Button type="submit" mt="sm">
            update
          </Button>
        </form>

        {/* ))} */}
      </Box>
    </div>
  );
}

export default page;
