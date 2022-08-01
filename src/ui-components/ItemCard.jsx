/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Badge, Flex, Text } from "@aws-amplify/ui-react";
export default function ItemCard(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="column"
      width="320px"
      position="relative"
      padding="16px 16px 16px 16px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "ItemCard")}
    >
      <Badge
        display="flex"
        gap="0"
        direction="column"
        width="fit-content"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        borderRadius="32px"
        backgroundColor="rgba(239,240,240,1)"
        fontSize="12px"
        lineHeight="12px"
        fontFamily="Inter"
        fontWeight="400"
        color="rgba(13,26,38,1)"
        textAlign="left"
        size="small"
        variation="default"
        children="New"
        {...getOverrideProps(overrides, "Badge")}
      ></Badge>
      <Flex
        gap="0"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        objectFit="cover"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 417")}
      >
        <Flex
          gap="0"
          direction="column"
          shrink="0"
          height="44px"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Product Title")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="700"
            color="rgba(13,26,38,1)"
            lineHeight="20px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="T-Shirt"
            {...getOverrideProps(overrides, "T-Shirt")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(48,64,80,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.01px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Classic Long Sleeve"
            {...getOverrideProps(overrides, "Classic Long Sleeve")}
          ></Text>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(13,26,38,1)"
          lineHeight="20px"
          textAlign="right"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="$99"
          {...getOverrideProps(overrides, "$99")}
        ></Text>
      </Flex>
    </Flex>
  );
}
