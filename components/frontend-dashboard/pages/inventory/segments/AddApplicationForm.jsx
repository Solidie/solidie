import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Input, UploadImage, Select } from "../../../ui";
import PlansManagement from './PlansManagement.jsx';

const selectFieldItemsList = ["Unpublished", "Published"];
const selectFieldDisableItemsList = [];
const selectFieldAriaLabel = "Application Status";


const FormDemo = () => {
  const [plansDetail, setPlansDetail] = useState([
    {
      name: "Startup",
      cost: 0,
      selected: true,
    },
    {
      name: "Business",
      cost: 0,
      selected: false,
    },
    {
      name: "Enterprise",
      cost: 0,
      selected: true,
    },
  ]);

  return (
    <>
      <Form.Root className={" min-h-max bg-tertiary/20 -lightest-version p-4 rounded-2xl shadow-md flex flex-col gap-3".classNames()}>
        <div className={"flex gap-4 flex-wrap w-full".classNames()}>
          <Form.Field
            name="appName"
            className={"flex flex-col gap-1 w-full sm:max-w-xs min-w-full  sm:min-w-max".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>App Name</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter App Name
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <Input type="text" placeholder="App Name ..." required />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="status"
            className={"flex flex-col gap-1 w-full sm:max-w-xs min-w-full sm:min-w-max".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Status</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className={"FieldMessage".classNames()}>
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <Select
                placeholder="Pick a Status ..."
                defaultValue={selectFieldItemsList[0].toLowerCase()}
                ariaLabel={selectFieldAriaLabel}
                disableItemsList={selectFieldDisableItemsList}
                itemsList={selectFieldItemsList}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="logo"
            className={"flex flex-col gap-1 w-full  sm:max-w-xs min-w-full  sm:min-w-max".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Logo</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className={"FieldMessage".classNames()}>
                Please provide a valid email
              </Form.Message>
            </div>
            {/* <Form.Control asChild={false} className={"w-full".classNames()}> */}
            <UploadImage />
            {/* </Form.Control> */}
          </Form.Field>
          <Form.Field
            name="banner"
            className={"flex flex-col gap-1 w-full  sm:max-w-xs min-w-full  sm:min-w-max".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Banner</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter your email
              </Form.Message>
            </div>
            {/* <Form.Control asChild={false} className={"w-full".classNames()}> */}
            <UploadImage />
            {/* </Form.Control> */}
          </Form.Field>
        </div>
        <Form.Field
            name="plansForApps"
            className={"flex flex-col gap-1 sm:max- w-xs min-w-full  sm:min  -w-max".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Plans For App <pre className={"text-tertiary/60".classNames()}>Select a Box that you want to use!</pre></Form.Label>
            </div>
            <PlansManagement {...{ plansDetail }}  />
          </Form.Field>
        <Form.Submit asChild>
          <button className={"Button mt-2".classNames()}>Submit</button>
        </Form.Submit>
      </Form.Root>
    </>
  );
};

export default FormDemo;