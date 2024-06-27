import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

const Navbar = () => (
  <Flex p="2" borderBottom="1px" borderColor="gray.100">
    <Box fontSize="3xl" color="blue.400" fontWeight="bold" cursor="pointer">
      <Link href="/" passHref>
        Real Estate Hub
      </Link>
    </Box>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FcMenu />}
          variant="ghost"
          colorScheme="blue"
          aria-label="Options"
        />
        <MenuList>
          <Link href="/" passHref>
            <MenuItem icon={<FcHome />} minH="48px">
              Home
            </MenuItem>
          </Link>
          <Link href="/search" passHref>
            <MenuItem icon={<BsSearch />} minH="48px">
              Search
            </MenuItem>
          </Link>
          <Link href="/search?purpose=for-sale" passHref>
            <MenuItem icon={<FcAbout />} minH="48px">
              Buy Property
            </MenuItem>
          </Link>
          <Link href="/search?purpose=for-rent" passHref>
            <MenuItem icon={<FiKey />} minH="48px">
              Rent Property
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
);

export default Navbar;
