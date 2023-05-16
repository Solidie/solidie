import React from "react";
import * as Form from "@radix-ui/react-form";
import { Select } from "../common";
import { Input, Textarea, DatePicker, UploadImage } from "../ui";

const selectFieldItemsList = [
  "Apple",
  "Banana",
  "Blueberry",
  "Strawberry",
  "Grapes",
];
const selectFieldDisableItemsList = ["Grapes", "Apple"];
const selectFieldDefaultValue = "blueberry";
const selectFieldAriaLabel = "Food";

const FormDemo = () => (
  <>
    <UploadImage />

    <Form.Root className=" bg-lightest-version p-4 rounded-2xl shadow-md flex flex-col gap-3">
      <div className="flex justify-between gap-4 flex-wrap sm:flex-nowrap w-full h-full">
        <div className="flex gap-4 flex-wrap w-full">
          <Form.Field
            name="select-version"
            className="flex flex-col gap-1 w-full  sm:max-w-xs"
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
          <Form.Field
            name="upload-application-zip-file"
            className="flex flex-col gap-1 w-full sm:max-w-xs"
          >
            <div className="flex items-base justify-between">
              <Form.Label className="Label">
                Upload Application Zip File
              </Form.Label>
              <Form.Message match="valueMissing" className="FieldMessage">
                Please upload one
              </Form.Message>
              <Form.Message match="typeMismatch" className="FieldMessage">
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className="w-full">
              <Input type="file" />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="version"
            className="flex flex-col gap-1 w-full sm:max-w-xs"
          >
            <div className="flex items-base justify-between">
              <Form.Label className="Label">version</Form.Label>
              <Form.Message match="valueMissing" className="FieldMessage">
                Please enter Version Number
              </Form.Message>
            </div>
            <Form.Control asChild className="w-full">
              <Input type="number" placeholder="Version ..." required />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="releaseDate"
            className="flex flex-col gap-1 w-full sm:max-w-xs"
          >
            <div className="flex items-base justify-between">
              <Form.Label className="Label">Release Date</Form.Label>
              <Form.Message match="valueMissing" className="FieldMessage">
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className="FieldMessage">
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className="w-full">
              <DatePicker />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="stage"
            className="flex flex-col gap-1 w-full sm:max-w-xs"
          >
            <div className="flex items-base justify-between">
              <Form.Label className="Label">Stage</Form.Label>
              <Form.Message match="valueMissing" className="FieldMessage">
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className="FieldMessage">
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className="w-full">
              <Select
                ariaLabel={selectFieldAriaLabel}
                defaultValue={selectFieldDefaultValue}
                disableItemsList={selectFieldDisableItemsList}
                itemsList={selectFieldItemsList}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="status"
            className="flex flex-col gap-1 w-full sm:max-w-xs"
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
                ariaLabel={selectFieldAriaLabel}
                defaultValue={selectFieldDefaultValue}
                disableItemsList={selectFieldDisableItemsList}
                itemsList={selectFieldItemsList}
              />
            </Form.Control>
          </Form.Field>
        </div>
        <Form.Field
          name="change-log"
          className="flex flex-col gap-1 w-full sm:max-w-md h-auto"
        >
          <div className="flex items-base justify-between">
            <Form.Label className="Label">Change Log</Form.Label>
            <Form.Message match="valueMissing" className="FieldMessage">
              Please enter a ChangeLog
            </Form.Message>
          </div>
          <Form.Control asChild className="w-full h-full">
            <Textarea
              className="h-full min-h-[6rem]"
              placeholder="ChangeLog ..."
              required
            />
          </Form.Control>
        </Form.Field>
      </div>
      <Form.Submit asChild>
        <button className="Button mt-2">Create / Edit Applications</button>
      </Form.Submit>
    </Form.Root>
  </>
);

export default FormDemo;
