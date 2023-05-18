import React from "react";
import * as Form from "@radix-ui/react-form";
import { Input, UploadImage, Select, MultiSelect } from "../ui";

const selectFieldItemsList = ["Unpublished", "Published"];
const selectFieldDisableItemsList = [];
const selectFieldAriaLabel = "Application Status";

const FormDemo = () => (
  <>
    <Form.Root className=" min-h-max bg-lightest-version p-4 rounded-2xl shadow-md flex flex-col gap-3">
      <div className="flex flex-col w-full gap-4">
        <div className="flex gap-4 flex-wrap w-full">
          <Form.Field
            name="appName"
            className="flex flex-col gap-1 w-full sm:max-w-xs min-w-full  sm:min-w-max"
          >
            <div className="flex items-base justify-between">
              <Form.Label className="Label">App Name</Form.Label>
              <Form.Message match="valueMissing" className="FieldMessage">
                Please enter App Name
              </Form.Message>
            </div>
            <Form.Control asChild className="w-full">
              <Input type="text" placeholder="App Name ..." required />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="status"
            className="flex flex-col gap-1 w-full sm:max-w-xs min-w-full sm:min-w-max"
          >
            <div className="flex items-base justify-between">
              <Form.Label className="Label">Status</Form.Label>
              <Form.Message match="valueMissing" className="FieldMessage">
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className="FieldMessage">
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className="w-full">
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
            className="flex flex-col gap-1 w-full  sm:max-w-xs min-w-full  sm:min-w-max"
          >
            <div className="flex items-base justify-between">
              <Form.Label className="Label">Logo</Form.Label>
              <Form.Message match="valueMissing" className="FieldMessage">
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className="FieldMessage">
                Please provide a valid email
              </Form.Message>
            </div>
            {/* <Form.Control asChild={false} className="w-full"> */}
            <UploadImage />
            {/* </Form.Control> */}
          </Form.Field>
        </div>
        <Form.Field
          name="plansForApps"
          className="flex flex-col gap-1 sm:max-w-full w-max"
        >
          <div className="flex items-base justify-between">
            <Form.Label className="Label">Plans For App</Form.Label>
            <Form.Message match="valueMissing" className="FieldMessage">
              Please enter your email
            </Form.Message>
            <Form.Message match="typeMismatch" className="FieldMessage">
              Please provide a valid email
            </Form.Message>
          </div>
          {/* <Form.Control asChild={false} className="w-full"> */}
          <MultiSelect />
          {/* </Form.Control> */}
        </Form.Field>
      </div>
      <Form.Submit asChild>
        <button className="Button mt-2">Submit</button>
      </Form.Submit>
    </Form.Root>
  </>
);

export default FormDemo;
