import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      {/* Header Section */}
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='semibold'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='6' h='6' as={BsFilter} />
      </Flex>

      {/* Display Search Filters */}
      {searchFilters && <SearchFilters />}

      {/* Properties Title */}
      <Text fontSize='2xl' fontWeight='bold' p='4'>
        Properties {router.query.purpose}
      </Text>

      {/* Display Properties */}
      <Flex flexWrap='wrap'>
        {properties.length > 0 ? (
          properties.map((property) => <Property property={property} key={property.id} />)
        ) : (
          <Flex justifyContent='center' alignItems='center' flexDirection='column' my='8'>
            <Image src={noresult} alt='No Results' />
            <Text fontSize='xl' mt='4' textAlign='center'>
              No Result Found.
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  // Fetch properties based on query parameters
  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits || [], // Ensure properties array is initialized
    },
  };
}

export default Search;
