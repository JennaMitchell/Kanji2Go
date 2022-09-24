import React from "react";
import PageMenu from "../main/pageMenu";
import NavBar from "../nav/navBar";
import { useSelector } from "react-redux";
import { Container, Heading } from "@chakra-ui/react";
import classes from "./credits.module.css";
import { creditsData } from "./credits-data";
import Footer from "../components/footer";

const Credits = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);

  const renderReadyCreditsData = creditsData.map((data) => {
    return (
      <div className={classes.imageContainer} key={data.desciption}>
        <img
          className={classes.styledImage}
          src={data.photo}
          alt={data.desciption}
        />
        <p className={classes.photoDescription}>
          Photo by <b>{data.author}</b> on{" "}
          <a href={data.link} className={classes.unsplashLink}>
            Unsplash
          </a>
        </p>
      </div>
    );
  });

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
      <div className={classes.mainContainer}>
        <div className={classes.gridContianer}> {renderReadyCreditsData}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Credits;
