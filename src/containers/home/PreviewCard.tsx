import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import React from "react";

interface PreviewCardProps {
  details: {
    requisitionTitle: string;
    noOfOpenings: number;
    urgency: string;
    gender: string;
  };
}

const PreviewCard: React.FC<PreviewCardProps> = ({ details }) => {
  if (!details) {
    return <div>No details available</div>; // Add a fallback to avoid undefined errors
  }

  return (
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
              <Text fontSize="0.9rem" fontWeight="500">
                {details.requisitionTitle || 'No title'}
              </Text>
              <Flex justifyContent="space-around" alignItems="center">
                <Text fontSize="0.8rem" mr="0.4rem" fontWeight="200" as="p">
                  OPENINGS
                </Text>
                <Text fontSize="1rem" fontWeight="bold" as="span">
                  {details.noOfOpenings || 0}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box maxH="50rem" overflowY="auto" px="24px" pb="24px">
          <Box>
            <Text fontSize="1rem" fontWeight="600" mb="12px">Requisition Details</Text>
            <Text>Urgency: {details.urgency || '-'}</Text>
            <Text>Gender: {details.gender || '-'}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewCard;
