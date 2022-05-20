import classes from "./BannerBox.module.css";
import { Container, Heading, Text, Image } from "@chakra-ui/react";

const BannerBox = ({ title, subtext, img, ribbon = false }) => {
  return (
    <Container
      bgColor="brand.600"
      w={["300px", "300px", "400px", "400px", "400px", "400px"]}
      height={["320px", "320px", "385px", "385px", "385px", "385px"]}
      borderRadius="10px"
      pos="relative"
      zIndex={3}
      transition="1s"
      mt="40px"
      _hover={{
        boxShadow: "dark-lg",
      }}
      color="white"
    >
      {ribbon ? (
        <>
          <div className={classes.shadowOne} aria-hidden="true"></div>
          <div className={classes.shadowTwo} aria-hidden="true"></div>
          <div className={`${classes.ribbon} ${classes.ribbonTopRight}`}>
            <span>New</span>
          </div>{" "}
        </>
      ) : (
        ""
      )}
      <Heading textAlign="center" mt="20px" fontSize="40px">
        {title}
      </Heading>
      <Text textAlign="center" mt="5px" fontSize="26px">
        {subtext}
      </Text>
      <Image src={img} mt="5px" borderRadius="10px"></Image>
    </Container>
  );
};

export default BannerBox;
