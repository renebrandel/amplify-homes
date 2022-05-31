/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text, View } from "@aws-amplify/ui-react";
export default function CardNFT(props) {
  const { CardNFT, overrides, ...rest } = props;
  return (
    <Flex
      gap="8px"
      direction="column"
      height="370px"
      overflow="hidden"
      position="relative"
      border="1px SOLID rgba(244,232,231,1)"
      borderRadius="20px"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "CardNFT")}
    >
      <Flex
        padding="0px 0px 0px 0px"
        width="300px"
        height="300px"
        shrink="0"
        position="relative"
        {...getOverrideProps(overrides, "Mask group")}
      >
        <View
          width="300px"
          height="300px"
          position="absolute"
          top="0px"
          left="0px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(196,196,196,1)"
          {...getOverrideProps(overrides, "Rectangle 1164")}
        ></View>
        <Image
          width="300px"
          height="300px"
          position="absolute"
          top="0px"
          left="0px"
          padding="0px 0px 0px 0px"
          src={CardNFT?.image}
          {...getOverrideProps(overrides, "image")}
        ></Image>
      </Flex>
      <Flex
        gap="2px"
        direction="column"
        height="62px"
        shrink="0"
        alignSelf="stretch"
        objectFit="cover"
        position="relative"
        padding="0px 18px 5px 18px"
        {...getOverrideProps(overrides, "text group")}
      >
        <Text
          fontFamily="Noto Sans JP"
          fontSize="12px"
          fontWeight="700"
          color="rgba(139,130,129,1)"
          lineHeight="18px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0px"
          shrink="0"
          alignSelf="stretch"
          objectFit="cover"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={CardNFT?.collection_name}
          {...getOverrideProps(overrides, "collection name")}
        ></Text>
        <Text
          fontFamily="Noto Sans JP"
          fontSize="18px"
          fontWeight="400"
          color="rgba(57,50,49,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.03px"
          shrink="0"
          alignSelf="stretch"
          objectFit="cover"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={CardNFT?.name}
          {...getOverrideProps(overrides, "token name")}
        ></Text>
      </Flex>
    </Flex>
  );
}
