import { Button, Flex, Box } from "@chakra-ui/react";
import React,{useEffect} from "react";
import { useFormik } from "formik";
import { useData } from "./DataProvider";
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import { interviewDurationOptions, interviewLanguageOptions, interviewModeOptions } from "./constants";
import * as Yup from "yup";

const InterviewSettingsForm: React.FC = () => {
  const { state, setState } = useData();
  const formik = useFormik<IInterViewSettings>({
    initialValues: state.interviewSettings,
    validationSchema: Yup.object().shape({
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
      interviewMode: Yup.string().required("Interview Mode is required"),
    }),
    onSubmit: (values) => {
      setState(prevState => ({
        ...prevState,
        interviewSettings: values,
      }));
      alert("Form successfully submitted");
    },
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      interviewSettings: formik.values,
    }));
  }, [formik.values, setState]);

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(value: string) => formik.setFieldValue("interviewMode", value)}
          onBlur={() => formik.setFieldTouched("interviewMode")}
          value={formik.values?.interviewMode}
          error={formik.errors?.interviewMode}
          touched={formik.touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          // onChange={formik.handleChange}  
          onChange={(value: string) => formik.setFieldValue("interviewDuration", value)}
          onBlur={formik.handleBlur}
          // onBlur={() => formik.setFieldTouched("interviewDuration")}
          value={formik.values?.interviewDuration}
          error={formik.errors?.interviewDuration}
          touched={formik.touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(value: string) => formik.setFieldValue("interviewLanguage", value)}
          onBlur={() => formik.setFieldTouched("interviewLanguage")}
          error={formik.errors.interviewLanguage}
          touched={formik.touched.interviewLanguage}
          value={formik.values.interviewLanguage}
        />
        {/* <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => formik.resetForm()}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" disabled={!formik.isValid || !formik.dirty}>
            Submit
          </Button>
        </Flex> */}
      </Box>
    </Box>
  );
};

export default InterviewSettingsForm;
