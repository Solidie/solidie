import React from "react";
import * as Form from "@radix-ui/react-form";
import { Input, Textarea, DatePicker, Select } from "../../../ui";

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
  <div className={"z-20 flex flex-col gap-5".classNames()}>
    <Form.Root className={" bg-tertiary/20 -lightest-version p-4 rounded-2xl shadow-md flex flex-col gap-3".classNames()}>
      <div className={"flex justify-between gap-4 flex-wrap sm:flex-nowrap w-full h-full".classNames()}>
        <div className={"flex gap-4 flex-wrap w-full".classNames()}>
          <Form.Field
            name="select-version"
            className={"flex flex-col gap-1 w-full  sm:max-w-xs".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Select Version</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className={"FieldMessage".classNames()}>
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full z-20".classNames()}>
              <Select
                ariaLabel={selectFieldAriaLabel}
                defaultValue={selectFieldDefaultValue}
                disableItemsList={selectFieldDisableItemsList}
                itemsList={selectFieldItemsList}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="upload-application-zip-file"
            className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>
                Upload Application Zip File
              </Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please upload one
              </Form.Message>
              <Form.Message match="typeMismatch" className={"FieldMessage".classNames()}>
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <Input type="file" />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="version"
            className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>version</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter Version Number
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <Input type="number" placeholder="Version ..." required />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="releaseDate"
            className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Release Date</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className={"FieldMessage".classNames()}>
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <DatePicker />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="stage"
            className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Stage</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter your email
              </Form.Message>
              <Form.Message match="typeMismatch" className={"FieldMessage".classNames()}>
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
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
            className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}
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
          className={"flex flex-col gap-1 w-full sm:max-w-md h-auto".classNames()}
        >
          <div className={"flex items-base justify-between".classNames()}>
            <Form.Label className={"Label".classNames()}>Change Log</Form.Label>
            <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
              Please enter a ChangeLog
            </Form.Message>
          </div>
          <Form.Control asChild className={"w-full h-full".classNames()}>
            <Textarea
              className={"h-full min-h-[6rem]".classNames()}
              placeholder="ChangeLog ..."
              required
            />
          </Form.Control>
        </Form.Field>
      </div>
      <Form.Submit asChild>
        <button className={"Button mt-2".classNames()}>Create / Update Version Release </button>
      </Form.Submit>
    </Form.Root>
  </div>
);

export default FormDemo;
