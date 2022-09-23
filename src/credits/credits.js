import React from "react";
import PageMenu from "../main/pageMenu";
import NavBar from "../nav/navBar";
import { useSelector } from "react-redux";
import { Container, Heading } from "@chakra-ui/react";
const Credits = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  return (
    <div>
      <NavBar />
      <Container
        maxW="100%"
        h={{ base: "100px", sm: "125px", lg: "150px" }}
        p="0"
        bgColor="#dc5357"
        m="0"
        pos="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        transition="1s"
      >
        {pageButtonClicked ? <PageMenu /> : ""}

        <Heading
          w="max-content"
          textAlign="center"
          h="max-content"
          fontSize={{ base: "32px", sm: "48px", lg: "64px" }}
          color="brand.900"
          borderBottom="2px"
        >
          Credits
        </Heading>
      </Container>
    </div>
  );
};

export default Credits;
