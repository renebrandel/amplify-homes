/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import {
  getOverrideProps,
  useNavigateAction,
} from "@aws-amplify/ui-react/internal";
import { Button, Flex, Image, Text } from "@aws-amplify/ui-react";
import Twitter from "./Twitter";
import Discord from "./Discord";
import OpenSea from "./OpenSea";
export default function NavBar(props) {
  const { overrides, ...rest } = props;
  const logodressupnftOnClick = useNavigateAction({ type: "url", url: "" });
  return (
    <Flex
      gap="40px"
      direction="row"
      width="1440px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="24px 32px 24px 32px"
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
          onClick={() => {
            logodressupnftOnClick();
          }}
          {...getOverrideProps(overrides, "logo-dressupnft")}
        ></Image>
      </Flex>
      <Flex
        gap="30px"
        direction="row"
        width="593px"
        alignItems="center"
        grow="1"
        basis="593px"
        height="30px"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "NavBarMenuLeft")}
      >
        <Twitter
          width="30px"
          height="24.68px"
          shrink="0"
          overflow="hidden"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "logo-twitter")}
        ></Twitter>
        <Discord
          width="30px"
          height="23.24px"
          shrink="0"
          overflow="hidden"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "logo-discord")}
        ></Discord>
        <OpenSea
          width="30px"
          height="30px"
          shrink="0"
          overflow="hidden"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "logo-openSea")}
        ></OpenSea>
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
        gap="24px"
        direction="row"
        width="593px"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        basis="593px"
        height="40px"
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
          height="42px"
          position="relative"
          border="1px SOLID rgba(244,232,231,1)"
          borderRadius="21px"
          padding="8px 16px 8px 16px"
          backgroundColor="rgba(255,255,255,1)"
          size="default"
          isDisabled={false}
          variation="default"
          children="Logout"
          {...getOverrideProps(overrides, "LogoutButton")}
        ></Button>
        <Button
          display="flex"
          gap="0"
          direction="row"
          width="fit-content"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          height="42px"
          position="relative"
          border="1px SOLID rgba(244,232,231,1)"
          borderRadius="21px"
          padding="8px 16px 8px 16px"
          backgroundColor="rgba(255,255,255,1)"
          size="default"
          isDisabled={false}
          variation="default"
          children="Connect your wallet"
          {...getOverrideProps(overrides, "LoginButton")}
        ></Button>
      </Flex>
    </Flex>
  );
}
