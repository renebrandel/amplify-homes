/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
import Twitter from "./Twitter";
import Discord from "./Discord";
import OpenSea from "./OpenSea";
export default function MarketingFooter(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1440px"
      height="252px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "MarketingFooter")}
    >
      <View
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(57,50,49,1)"
        {...getOverrideProps(overrides, "Rectangle 738")}
      ></View>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(255,255,255,1)"
        lineHeight="24px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        letterSpacing="0.01px"
        position="absolute"
        bottom="30px"
        left="60px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="© 2022 SoudanNFT"
        {...getOverrideProps(overrides, "\u00A9 2022 SoudanNFT")}
      ></Text>
      <Flex
        gap="50px"
        position="absolute"
        top="0px"
        left="40px"
        direction="row"
        width="1360px"
        alignItems="flex-start"
        padding="40px 20px 40px 20px"
        {...getOverrideProps(overrides, "Frame 417")}
      >
        <Flex
          gap="16px"
          direction="column"
          width="773px"
          shrink="0"
          height="88px"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Frame 313")}
        >
          <Text
            fontFamily="Zen Maru Gothic"
            fontSize="24px"
            fontWeight="700"
            color="rgba(255,255,255,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            width="471px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="DressUP NFT"
            {...getOverrideProps(overrides, "DressUP NFT")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(255,255,255,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.01px"
            width="471px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Expand the possibilities of NFT.&#xA;A platform for dress up."
            {...getOverrideProps(
              overrides,
              "Expand the possibilities of NFT. A platform for dress up."
            )}
          ></Text>
        </Flex>
        <Flex
          padding="0px 0px 0px 0px"
          width="272px"
          height="94px"
          shrink="0"
          position="relative"
          {...getOverrideProps(overrides, "Group 321")}
        >
          <Flex
            gap="40px"
            position="absolute"
            top="44px"
            left="0px"
            direction="row"
            alignItems="center"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Frame 321")}
          >
            <Twitter
              width="50px"
              height="41.18px"
              shrink="0"
              overflow="hidden"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "twitter")}
            ></Twitter>
            <Discord
              width="50px"
              height="39.22px"
              shrink="0"
              overflow="hidden"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "Discord")}
            ></Discord>
            <OpenSea
              width="50px"
              height="50px"
              shrink="0"
              overflow="hidden"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "OpenSea")}
            ></OpenSea>
          </Flex>
          <Text
            fontFamily="Inter"
            fontSize="20px"
            fontWeight="700"
            color="rgba(255,255,255,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.05px"
            width="272px"
            position="absolute"
            top="0px"
            left="0px"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="Join the community"
            {...getOverrideProps(overrides, "Join the community")}
          ></Text>
        </Flex>
      </Flex>
      <Icon
        width="1360px"
        height="0px"
        viewBox={{ minX: 0, minY: 0, width: 1360, height: 1 }}
        paths={[
          {
            d: "M0 0L1360 0L1360 -1L0 -1L0 0Z",
            stroke: "rgba(139,130,129,1)",
            fillRule: "nonzero",
            strokeWidth: 1,
          },
        ]}
        position="absolute"
        top="174px"
        left="40px"
        {...getOverrideProps(overrides, "Line 1")}
      ></Icon>
    </View>
  );
}
