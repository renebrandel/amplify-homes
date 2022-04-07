/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Image, Text } from "@aws-amplify/ui-react";
export default function NavBar(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="20px"
      direction="row"
      width="1440px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="24px 32px 24px 32px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "NavBar")}
    >
      <Flex
        gap="2px"
        direction="row"
        width="fit-content"
        height="50px"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Logo")}
      >
        <Image
          width="110px"
          height="50px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          src="logo-and-title.png"
          {...getOverrideProps(overrides, "logo-dressupnft")}
        ></Image>
      </Flex>
      <Flex
        gap="40px"
        direction="row"
        width="613px"
        alignItems="center"
        grow="1"
        basis="613px"
        height="38px"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "NavBarMenuLeft")}
      >
        <Image
          width="29.54px"
          height="24px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          src="./logo-twitter.png"
          {...getOverrideProps(overrides, "logo-twitter")}
        ></Image>
        <Image
          width="33.93px"
          height="38px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          src="./logo-discord.png"
          {...getOverrideProps(overrides, "logo-discord")}
        ></Image>
        <Image
          width="28.93px"
          height="28px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          src="./logo-opensea.png"
          {...getOverrideProps(overrides, "logo-opensea")}
        ></Image>
        <Text
          fontFamily="Inter"
          fontSize="20px"
          fontWeight="700"
          color="rgba(0,0,0,1)"
          lineHeight="30px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="        "
          {...getOverrideProps(overrides, "Text")}
        ></Text>
      </Flex>
      <Flex
        gap="32px"
        direction="row"
        width="613px"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        basis="613px"
        height="46px"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "NavBarMenuRight")}
      >
        <Button
          display="flex"
          gap="0"
          direction="row"
          width="fit-content"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          border="1px SOLID rgba(0,0,0,0)"
          borderRadius="4px"
          padding="7px 15px 7px 15px"
          backgroundColor="rgba(4,125,149,1)"
          size="large"
          isDisabled={false}
          variation="primary"
          children="Logout"
          {...getOverrideProps(overrides, "Buttongme")}
        ></Button>
        <Button
          display="flex"
          gap="0"
          direction="row"
          width="fit-content"
          height="46px"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          border="1px SOLID rgba(0,0,0,0)"
          borderRadius="4px"
          padding="7px 15px 7px 15px"
          backgroundColor="rgba(4,125,149,1)"
          size="large"
          isDisabled={false}
          variation="primary"
          children="Connect your wallet"
          {...getOverrideProps(overrides, "Buttonspz")}
        ></Button>
      </Flex>
    </Flex>
  );
}
