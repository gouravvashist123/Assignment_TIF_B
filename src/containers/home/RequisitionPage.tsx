import React, { useState } from "react";
import RequisitionDetailsForm from "./RequisitionDetailsForm";
import JobDetailsForm from "./JobDetailsForm";
import InterviewSettingsForm from "./InterviewSettingsForm";
import PreviewCard from "./PreviewCard";
import { IRequisitionDetails, IJobDetails, IInterviewSettingsValues } from "../../interface/forms";
import { Box, Button, Flex } from "@chakra-ui/react";

const RequisitionPage: React.FC = () => {
  // Step management: 0 = Requisition Details, 1 = Job Details, 2 = Interview Settings
  const [currentStep, setCurrentStep] = useState(0);

  // State for all form details
  const [formDetails, setFormDetails] = useState<{
    requisitionDetails: IRequisitionDetails;
    jobDetails: IJobDetails;
    interviewSettings: IInterviewSettingsValues;
  }>({
    requisitionDetails: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    jobDetails: {
      jobTitle: "",
      jobDetails: "",
      jobLocation: "",
    },
    interviewSettings: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Update the requisition form values in the state
  const handleRequisitionChange = (values: IRequisitionDetails) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      requisitionDetails: values,
    }));
    setIsFormValid(
      !!values.requisitionTitle && values.noOfOpenings > 0 && !!values.urgency && !!values.gender
    );
  };

  // Update the job details form values in the state
  const handleJobDetailsChange = (values: IJobDetails) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      jobDetails: values,
    }));
    setIsFormValid(!!values.jobTitle && !!values.jobDetails && !!values.jobLocation);
  };

  // Update the interview settings form values in the state
  const handleInterviewSettingsChange = (values: IInterviewSettingsValues) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      interviewSettings: values,
    }));
    setIsFormValid(!!values.interviewMode && !!values.interviewDuration && !!values.interviewLanguage);
  };

  // Handle form submission logic for each step
  const handleFormSubmit = () => {
    if (isFormValid) {
      if (currentStep < 2) {
        // Move to the next form step
        setCurrentStep(currentStep + 1);
      } else {
        // Final submission, handle form submission here
        console.log("Final submission: ", formDetails);
      }
    } else {
      alert("Please fill all required fields before moving to the next step.");
    }
  };

  // Navigate to the previous form
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  return (
    <Flex flexDirection="column" alignItems="center" p="2rem">
      {/* Preview Card displaying real-time data */}
      {/* <PreviewCard details={formDetails.requisitionDetails} /> */}
      <PreviewCard 
        requisitionDetails={formDetails.requisitionDetails}      // added
        jobDetails={formDetails.jobDetails}
        interviewSettings={formDetails.interviewSettings}
      />

      {/* Render the appropriate form based on the current step */}
      <Box w="100%" mt="2rem">
        {currentStep === 0 && (
          <RequisitionDetailsForm
            onFormChange={handleRequisitionChange}
            onSubmit={handleFormSubmit}
          />

        )}

        {currentStep === 1 && (
          <JobDetailsForm
            onFormChange={handleJobDetailsChange}
            onSubmit={handleFormSubmit}
          />
        )}
        {currentStep === 2 && (
          <InterviewSettingsForm
            onFormChange={handleInterviewSettingsChange}
            onSubmit={handleFormSubmit}
          />
        )}
      </Box>
      {/* Navigation buttons */}
      <Flex w="100%" justify="space-between" mt="2rem">
        {currentStep > 0 && (
          <Button colorScheme="gray" onClick={handlePrevious}>
            Previous
          </Button>
        )}

        <Button colorScheme="red" onClick={handleFormSubmit}>
          {currentStep === 2 ? "Submit" : "Next"}
        </Button>
      </Flex>
      {/* <Flex w="100%" justify="flex-end" mt="4rem">
        <Button colorScheme="red" type="submit">
          Next
        </Button>
      </Flex> */}
    </Flex>
  );
};

export default RequisitionPage;
