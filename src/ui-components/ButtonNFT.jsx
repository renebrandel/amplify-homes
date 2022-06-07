/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function ButtonNFT(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="row"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "ButtonNFT")}
    >
      <Flex
        gap="0"
        direction="row"
        width="fit-content"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        height="38px"
        position="relative"
        border="1px SOLID rgba(244,232,231,1)"
        boxShadow="0px 0px 6px rgba(0, 0, 0, 0.20000000298023224)"
        borderRadius="21px"
        padding="6px 16px 6px 16px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Button")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(57,50,49,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Connect your wallet"
          {...getOverrideProps(overrides, "label")}
        ></Text>
      </Flex>
    </Flex>
  );
}
