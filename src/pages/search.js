import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Icon, Text } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'
import noresult from 'assets/images/noresult.svg'
import SearchFilters from "Components/SearchFilters";
import Property from "Components/Property";
import { fetchAPI,baseURL } from "utils/fetchApis";
const Search = ({properties}) => {
    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                curosr="pointer"
                bg="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                p="2"
                fontWeight="bold"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilter((prevF) => !prevF)}
            >

                <Text> Search Properties By Filters </Text>
                <Icon w="7" paddingLeft="2" as={BsFilter}></Icon>
            </Flex>
            {searchFilter && <SearchFilters />}

            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property) => <Property property={property}></Property>)}
            </Flex>
            {properties.length == 0 && (
                <Flex justifyContent="center" alignItems="center" m="5" flexDirection="column" >
                    <Image alt="no result" src={noresult}></Image>
                    <Text fontSize= "2xl" fontWeight="bold" marginTop= "5">No Results Found</Text>
                </Flex>
            )}


        </Box>

    )

}

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
  
    const data = await fetchAPI(`${baseURL }/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  
    return {
      props: {
        properties: data?.hits,
      },
    };
  }

export default Search;