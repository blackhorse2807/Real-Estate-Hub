import { Box, Flex, Spacer, Text, Avatar, Badge, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) => (
  <Box maxWidth='1000px' margin='auto' p='4'>
    {photos && <ImageScrollbar data={photos} />}
    <Box w='full' p='6'>
      <Flex alignItems='center' mb='4'>
        {isVerified && (
          <Box mr='2'>
            <Badge colorScheme='green'>
              <Tag size='md' key='status' borderRadius='full'>
                <TagLeftIcon boxSize='12px' as={GoVerified} />
                <TagLabel>Verified</TagLabel>
              </Tag>
            </Badge>
          </Box>
        )}
        <Text fontWeight='bold' fontSize='xl'>
          INR {price} {rentFrequency && `/${rentFrequency}`}
        </Text>
        <Spacer />
        <Avatar size='sm' src={agency?.logo?.url}></Avatar>
      </Flex>
      <Flex alignItems='center' mb='4'>
        <Text color='gray.600' mr='3'>{rooms} <FaBed /></Text>
        <Text color='gray.600' mr='3'>{baths} <FaBath /></Text>
        <Text color='gray.600'>{millify(area)} sqft <BsGridFill /></Text>
      </Flex>
    </Box>
    <Box mt='4'>
      <Text fontSize='2xl' fontWeight='bold' mb='2'>{title}</Text>
      <Text color='gray.600' lineHeight='2'>{description}</Text>
    </Box>
    <Flex flexWrap='wrap' mt='4'>
      <Box w={['100%', '50%']} mb='4'>
        <Flex justifyContent='space-between' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Type</Text>
          <Text fontWeight='bold'>{type}</Text>
        </Flex>
      </Box>
      <Box w={['100%', '50%']} mb='4'>
        <Flex justifyContent='space-between' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Purpose</Text>
          <Text fontWeight='bold'>{purpose}</Text>
        </Flex>
      </Box>
      {furnishingStatus && (
        <Box w={['100%', '50%']} mb='4'>
          <Flex justifyContent='space-between' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Furnishing Status</Text>
            <Text fontWeight='bold'>{furnishingStatus}</Text>
          </Flex>
        </Box>
      )}
    </Flex>
    <Box>
      {amenities.length > 0 && (
        <Box mt='4'>
          <Text fontSize='2xl' fontWeight='bold' mb='2'>Facilities:</Text>
          <Flex flexWrap='wrap'>
            {amenities?.map((item, index) => (
              <Box key={index} mr='2' mb='2'>
                {item?.amenities?.map((amenity, idx) => (
                  <Tag key={idx} size='md' borderRadius='full' variant='solid' colorScheme='blue'>
                    {amenity.text}
                  </Tag>
                ))}
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  
  return {
    props: {
      propertyDetails: data,
    },
  };
}
