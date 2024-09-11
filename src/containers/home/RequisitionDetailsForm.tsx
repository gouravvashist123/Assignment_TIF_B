import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from "./DataProvider";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

interface RequisitionDetailsFormProps {
  onSubmit: (e: React.FormEvent) => void; // Just a trigger for submission (no arguments)
  onFormChange: (values: IRequisitionDetails) => void; // Pass form values to parent
}

const RequisitionDetailsForm: React.FC<RequisitionDetailsFormProps> = ({ onFormChange, onSubmit }) => {
 const { state, setState } = useData();
  const { requisitionDetails } = state;
  // console.log(requisitionDetails)

  const formik = useFormik<IRequisitionDetails>({
    initialValues: state.requisitionDetails,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      gender: Yup.string().required("Gender is required"),
      urgency: Yup.string().required("Urgency is required"),
    }),
    onSubmit: (values) => {
      setState((prevState) => ({
        ...prevState,
        requisitionDetails: values,
      }));
      onFormChange(values);
      // onSubmit();
    },
  });

  useEffect(() => {
    // console.log(formik.values);
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: formik.values,
    }));
  }, [formik.values, setState]);

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.handleChange(e)}
          onBlur={formik.handleBlur}
          value={formik.values?.requisitionTitle}
          error={formik.errors?.requisitionTitle}
          touched={formik.touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.handleChange(e)}
          onBlur={formik.handleBlur}
          value={formik.values?.noOfOpenings}
          error={formik.errors?.noOfOpenings}
          touched={formik.touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(value) => formik.setFieldValue('gender', value)}  // Corrected
          onBlur={formik.handleBlur}
          value={formik.values?.gender}
          error={formik.errors?.gender}
          touched={formik.touched?.gender}
        />

        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(value) => formik.setFieldValue('urgency', value)}  // Corrected
          onBlur={formik.handleBlur}
          value={formik.values?.urgency}
          error={formik.errors?.urgency}
          touched={formik.touched?.urgency}
        />
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
