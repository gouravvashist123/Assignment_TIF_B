import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import React from "react";

// interface PreviewCardProps {
//   details: {
//     requisitionTitle: string;
//     noOfOpenings: number;
//     urgency: string;
//     gender: string;
//   };
// }

const DataCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Box mt="1rem" bg="white" width="100%" p="16px 24px" borderRadius="10px">
      <Text fontSize="1rem" as="h6" fontWeight="600" mb="12px">
        {title}
      </Text>
      <Grid gap="16px" templateColumns="1fr 1fr">
        {children}
      </Grid>
    </Box>
  );
};

const KeyValue: React.FC<{
  title: string;
  value?: string;
}> = ({ title, value }) => {
  return (
    <Box w="100%">
      <Text fontSize=".875rem" color="gray" mb="8px">
        {title}
      </Text>
      <Text fontSize=".875rem" mb="8px">
        {value || "-"}
      </Text>
    </Box>
  );
};

const PreviewCard: React.FC<{ requisitionDetails: any, jobDetails: any, interviewSettings: any }> = ({ requisitionDetails, jobDetails, interviewSettings }) => {
  if (!requisitionDetails) {
    return <div>No details available</div>; // Add a fallback to avoid undefined errors
  }

  return (
    // <Box p="1rem">
    //   <Box borderRadius="10px" bgColor="gray.100" height="fit-content">
    //     <Flex justifyContent="space-between">
    //       <Text fontWeight="bold" fontStyle="italic" m="0.4rem 2rem">
    //         Draft
    //       </Text>
    //       <Box
    //         bgColor="#EE5353"
    //         color="white"
    //         p="0.4rem 2rem"
    //         borderTopRightRadius="10px"
    //       >
    //         <Text fontStyle="italic">Preview</Text>
    //       </Box>
    //     </Flex>
    //     <Box w="100%" p="16px 24px">
    //       <Box
    //         width="100%"
    //         bgColor="#432B7D"
    //         color="white"
    //         p="1rem"
    //         borderRadius="10px"
    //       >
    //         <Flex
    //           fontFamily="Poppins"
    //           justifyContent="space-between"
    //           alignItems="center"
    //         >
    //           <Text fontSize="0.9rem" fontWeight="500">
    //             {requisitionDetails.requisitionTitle || 'No title'}
    //           </Text>
    //           <Flex justifyContent="space-around" alignItems="center">
    //             <Text fontSize="0.8rem" mr="0.4rem" fontWeight="200" as="p">
    //               OPENINGS
    //             </Text>
    //             <Text fontSize="1rem" fontWeight="bold" as="span">
    //               {requisitionDetails.noOfOpenings || 0}
    //             </Text>
    //           </Flex>
    //         </Flex>
    //       </Box>
    //     </Box>
    //     <Box maxH="50rem" overflowY="auto" px="24px" pb="24px" >
    //       <Box>
    //         <Text fontSize="1rem" fontWeight="600" mb="12px">Requisition Details</Text>
    //         <Text>Urgency: {requisitionDetails.urgency || '-'}</Text>
    //         <Text>Gender: {requisitionDetails.gender || '-'}</Text>
    //       </Box>
    //     </Box>

    //     <Box maxH="50rem" overflowY="auto" px="24px" pb="24px">
    //       <Box>
    //         <Text fontSize="1rem" fontWeight="600" mb="12px">Job Details</Text>
    //         <Text>Job Title: {jobDetails.jobTitle || '-'}</Text>
    //         <Text>Job Details: {jobDetails.jobDetails || '-'}</Text>
    //         <Text>Job Location: {jobDetails.jobLocation || '-'}</Text>
    //       </Box>
    //     </Box>

    //     <Box maxH="50rem" overflowY="auto" px="24px" pb="24px">
    //       <Box>
    //         <Text fontSize="1rem" fontWeight="600" mb="12px">Interview Settings</Text>
    //         <Text>Interview Mode: {interviewSettings.interviewMode || '-'}</Text>
    //         <Text>Interview Duration: {interviewSettings.interviewDuration || '-'}</Text>
    //         <Text>Interview Language: {interviewSettings.interviewLanguage || '-'}</Text>
    //       </Box>
    //     </Box>

    //   </Box>
    // </Box>
    <Box p="1rem">
      <Box borderRadius="10px" bgColor="gray.100" height="fit-content">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontStyle="italic" m="0.4rem 2rem">
            Draft
          </Text>
          <Box
            bgColor="#EE5353"
            color="white"
            p="0.4rem 2rem"
            borderTopRightRadius="10px"
          >
            <Text fontStyle="italic">Preview</Text>
          </Box>
        </Flex>
        <Box w="100%" p="16px 24px">
          <Box
            width="100%"
            bgColor="#432B7D"
            color="white"
            p="1rem"
            borderRadius="10px"
          >
            <Flex
              fontFamily="Poppins"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="0.9rem" fontWeight="500">{requisitionDetails.requisitionTitle}</Text>
              <Flex justifyContent="space-around" alignItems="center">
                <Text fontSize="0.8rem" mr="0.4rem" fontWeight="200" as="p">
                  OPENINGS
                </Text>
                <Text fontSize="1rem" fontWeight="bold" as="span">{requisitionDetails.noOfOpenings}</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box maxH="50rem" overflowY="auto" px="24px" pb="24px">
          <DataCard title="Requisition Details">
            <KeyValue title="Urgency" value={requisitionDetails.urgency} />
            <KeyValue title="Gender" value={requisitionDetails.gender} />
          </DataCard>
          <DataCard title="Job Detail">
            <KeyValue title="Job Title" value={jobDetails.jobTitle} />
            <KeyValue title="Job Details" value={jobDetails.jobDetails} />
            <KeyValue title="Job Location" value={jobDetails.jobLocation} />
          </DataCard>
          <DataCard title="Interview Settings">
            <KeyValue title="Interview Duration" value={interviewSettings.interviewDuration} />
            <KeyValue title="Interview Language" value={interviewSettings.interviewLanguage} />
            <KeyValue title="Interview Mode" value={interviewSettings.interviewMode} />
          </DataCard>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewCard;
