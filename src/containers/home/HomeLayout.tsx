import React, { useState } from "react";
import { Container, Tabs, TabList, TabPanels, TabPanel, Heading, Box, Flex, Button } from "@chakra-ui/react";
import RequisitionDetailsForm from "./RequisitionDetailsForm";
import JobDetailsForm from "./JobDetailsForm";
import InterviewSettingsForm from "./InterviewSettingsForm";
import PreviewCard from "./PreviewCard";
import { useData } from "./DataProvider";

const HomeLayout: React.FC = () => {
  const { state } = useData();
  const [currentTab, setCurrentTab] = useState(0);
  const { jobDetails, requisitionDetails } = state;

  const isRequisitionDetailsValid = () => {
    return requisitionDetails.requisitionTitle && requisitionDetails.noOfOpenings > 0 &&
           requisitionDetails.urgency && requisitionDetails.gender;
  };

  const isJobDetailsValid = () => {
    return jobDetails.jobTitle && jobDetails.jobDetails && jobDetails.jobLocation;
  };

  const handleTabChange = (index: number) => {
    if (index === 1 && !isRequisitionDetailsValid()) {
      return; // Prevent moving to the next tab if the current one is not valid
    }
    if (index === 2 && !isJobDetailsValid()) {
      return; // Prevent moving to the next tab if the current one is not valid
    }
    setCurrentTab(index);
  };

  const handleNextClick = () => {
    if (currentTab === 0 && isRequisitionDetailsValid()) {
      setCurrentTab(1); // Move to the Job Details tab
    } else if (currentTab === 1 && isJobDetailsValid()) {
      setCurrentTab(2); // Move to the Interview Settings tab
    } else if (currentTab === 2) {
      // Handle form submission or final actions here
    }
  };

  const handlePrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1); // Move to the previous tab
    }
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy index={currentTab} onChange={handleTabChange}>
          <TabList>
            <Button onClick={() => handleTabChange(0)}>Requisition Details</Button>
            <Button onClick={() => handleTabChange(1)}>Job Details</Button>
            <Button onClick={() => handleTabChange(2)}>Interview Settings</Button>
          </TabList>
          <Box display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionDetailsForm />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm />
              </TabPanel>
            </TabPanels>
            <PreviewCard details={requisitionDetails} />
            {/* <PreviewCard details={jobDetails} /> */}
          </Box>
        </Tabs>

        <Flex w="100%" justify="space-between" mt="2rem">
          {currentTab > 0 && (
            <Button colorScheme="gray" onClick={handlePrevious}>
              Previous
            </Button>
          )}

          <Button colorScheme="red" onClick={handleNextClick}>
            {currentTab === 2 ? "Submit" : "Next"}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default HomeLayout;
