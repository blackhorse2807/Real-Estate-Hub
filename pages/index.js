import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex
    justifyContent='center'
    alignItems='center'
    flexDirection={{ base: 'column', md: 'row' }}
    bg='gray.50'
    borderRadius='xl'
    boxShadow='lg'
    p={{ base: '6', md: '10' }}
    m={{ base: '6', md: '10' }}
  >
    <Box flexShrink={0} mb={{ base: '6', md: 0 }} mr={{ base: 0, md: '10' }}>
      <Image src={imageUrl} width={500} height={300} objectFit='cover' borderRadius='lg' />
    </Box>
    <Box>
      <Text color='blue.400' fontWeight='semibold' textTransform='uppercase' fontSize='sm'>
        {purpose}
      </Text>
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight='bold' mt='2' lineHeight='shorter'>
        {title1}<br />{title2}
      </Text>
      <Text fontSize={{ base: 'lg', md: 'xl' }} mt='4' color='gray.600'>
        {desc1}<br />{desc2}
      </Text>
      <Button
        mt='6'
        fontSize={{ base: 'lg', md: 'xl' }}
        bg="pink.500"
        color="white"
        _hover={{ bg: 'pink.600' }}
        _focus={{ outline: 'none', boxShadow: 'outline' }}
      >
        <Link href={linkName}>
          {buttonText}
        </Link>
      </Button>
    </Box>
  </Flex>
);

const Home = ({ propertiesForSale, propertiesForRent }) => (
  <Box>
    <Banner
      purpose='RENT A HOME'
      title1='Rental Homes for'
      title2='Everyone'
      desc1='Explore from Apartments, builder floors, villas'
      desc2='and more'
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
    />
    <Flex flexWrap='wrap' justifyContent='center' m={{ base: '6', md: '10' }}>
      {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose='BUY A HOME'
      title1=' Find, Buy & Own Your'
      title2='Dream Home'
      desc1=' Explore from Apartments, land, builder floors,'
      desc2=' villas and more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
    />
    <Flex flexWrap='wrap' justifyContent='center' m={{ base: '6', md: '10' }}>
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
);

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;
