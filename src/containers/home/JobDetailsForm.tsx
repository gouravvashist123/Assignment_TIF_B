import { Button, Flex, Box } from "@chakra-ui/react";
import React, {useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from "./DataProvider";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

interface JobDetailsFormProps {
  onFormChange: (values: IJobDetails) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onFormChange, onSubmit }) => {
  const {state, setState} = useData();
  const formik = useFormik<IJobDetails>({
    initialValues: state.jobDetails,
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details are required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
      onSubmit: (values) => {
        setState(prevState => ({
          ...prevState,
          jobDetails: values,
        }));
      },
    });

    useEffect(() => {
      setState(prevState => ({
        ...prevState,
        jobDetails: formik.values,
      }));
    }, [formik.values, setState]);

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
      <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.jobTitle}
          error={formik.errors.jobTitle}
          touched={formik.touched.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.jobDetails}
          error={formik.errors?.jobDetails}
          touched={formik.touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.jobLocation}
          touched={formik.touched.jobLocation}
          value={formik.values.jobLocation}
        />
        {/* <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => formik.resetForm()}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" disabled={!formik.isValid || !formik.dirty}>
            Next
          </Button>
        </Flex> */}
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
