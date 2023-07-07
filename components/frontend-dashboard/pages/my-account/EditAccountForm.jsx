import React from "react";
import * as Form from "@radix-ui/react-form";
import { Input, Textarea } from "../../ui";
import UploadProfileImage from "../../../utilities/commons/UpdateProfileImage.jsx";
import InputPassword from "../../ui/Password.jsx";

const FormDemo = () => (
  <>
    <Form.Root className={" min-h-max bg-tertiary/20 lightest-version p-4 rounded-2xl shadow-md flex flex-col gap-3".classNames()}>
      <div className={"flex justify-between flex-wrap sm:flex-nowrap gap-4 max-w-full".classNames()}>
        <div className={"flex flex-col gap-y-4 flex-wrap max-w-2xl w-auto".classNames()}>
          <div className={"flex flex-wrap justify-between items-center gap-4 h-max max-w-full w-auto".classNames()}>
            <Form.Field
              name="firstName"
              className={"flex flex-col gap-1 w-full sm:max-w-xs min-w-full  sm:min-w-max".classNames()}
            >
              <div className={"flex items-base justify-between".classNames()}>
                <Form.Label className={"Label".classNames()}>First Name</Form.Label>
                <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                  Please enter First Name
                </Form.Message>
              </div>
              <Form.Control asChild className={"w-full".classNames()}>
                <Input type="text" placeholder="First Name ..." required />
              </Form.Control>
            </Form.Field>
            <Form.Field
              name="lastName"
              className={"flex flex-col gap-1 w-full sm:max-w-xs min-w-full  sm:min-w-max".classNames()}
            >
              <div className={"flex items-base justify-between".classNames()}>
                <Form.Label className={"Label".classNames()}>Last Name</Form.Label>
                <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                  Please enter Last Name
                </Form.Message>
              </div>
              <Form.Control asChild className={"w-full".classNames()}>
                <Input type="text" placeholder="Last Name ..." required />
              </Form.Control>
            </Form.Field>
            <Form.Field
              name="displayName"
              className={"flex flex-col gap-1 w-full sm:max-w-xs min-w-full  sm:min-w-max".classNames()}
            >
              <div className={"flex items-base justify-between".classNames()}>
                <Form.Label className={"Label".classNames()}>Display Name</Form.Label>
                <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                  Please enter Display Name
                </Form.Message>
              </div>
              <Form.Control asChild className={"w-full".classNames()}>
                <Input type="text" placeholder="Display Name ..." required />
              </Form.Control>
            </Form.Field>
            <Form.Field
              name="email"
              className={"flex flex-col gap-1 w-full sm:max-w-xs min-w-full  sm:min-w-max".classNames()}
            >
              <div className={"flex items-base justify-between".classNames()}>
                <Form.Label className={"Label".classNames()}>Email Name</Form.Label>
                <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                  Please enter Email Name
                </Form.Message>
              </div>
              <Form.Control asChild className={"w-full".classNames()}>
                <Input type="text" placeholder="Email Name ..." required />
              </Form.Control>
            </Form.Field>
          </div>
          <Form.Field name="description" className={"flex flex-col gap-1 ".classNames()}>
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Description</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter Description
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <Textarea placeholder="Description ..." required />
            </Form.Control>
          </Form.Field>
        </div>
        <Form.Field
          name="profilePicture"
          className={"flex flex-col gap-1 w-full sm:max-w-xs".classNames()}
        >
          <div className={"flex items-base justify-between".classNames()}>
            <Form.Label className={"Label".classNames()}>Profile Picture</Form.Label>
            <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
              Please enter Profile Picture
            </Form.Message>
          </div>
          <div className={"hover:bg-primary/60 bg-primary/20 border-2 border-dashed border-tertiary/60 w-auto max-w-full rounded-lg p-10".classNames()}>
            <UploadProfileImage />
          </div>
        </Form.Field>
      </div>
      <div className={"space-y-2 py-4".classNames()}>
        <h4 className={"text-xl font-bold".classNames()}>Change Password</h4>
        <div className={"w-full h-[.5px] bg-tertiary/30".classNames()}></div>
      </div>
      <div className={"flex flex-col gap-y-4 flex-wrap lg:max-w-2xl w-auto".classNames()}>
        <Form.Field name="currentPassword" className={"flex flex-col gap-1".classNames()}>
          <div className={"flex items-base justify-between".classNames()}>
            <Form.Label className={"Label".classNames()}>Current Password</Form.Label>
            <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
              Please enter Current Password
            </Form.Message>
          </div>
          <Form.Control asChild className={"w-full".classNames()}>
            <InputPassword placeholder="Current Password ..." required />
          </Form.Control>
        </Form.Field>
        <div className={"flex flex-col md:flex-row justify-between items-center gap-3 h-max flex-wrap sm:flex-nowrap max-w-full w-full".classNames()}>
          <Form.Field
            name="newPassword"
            className={"flex flex-col gap-1 max-h-max h-max w-full sm:max-w-full md:max-w-xs min-w-full  sm:min-w-max".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>New Password</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter New Password
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <InputPassword placeholder="New Password ..." required />
            </Form.Control>
          </Form.Field>

          <Form.Field
            name="confirmPassword"
            className={"flex flex-col gap-1 max-h-max h-max w-full sm:max-w-full md:max-w-xs min-w-full  sm:min-w-max".classNames()}
          >
            <div className={"flex items-base justify-between".classNames()}>
              <Form.Label className={"Label".classNames()}>Confirm Password</Form.Label>
              <Form.Message match="valueMissing" className={"FieldMessage".classNames()}>
                Please enter Confirm Password
              </Form.Message>
            </div>
            <Form.Control asChild className={"w-full".classNames()}>
              <InputPassword placeholder="Confirm Password ..." required />
            </Form.Control>
          </Form.Field>
        </div>
      </div>
      <Form.Submit asChild>
        <button className={"Button mt-2".classNames()}>Submit</button>
      </Form.Submit>
    </Form.Root>
  </>
);

export default FormDemo;
