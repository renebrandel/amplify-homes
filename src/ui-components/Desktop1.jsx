/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image, View } from "@aws-amplify/ui-react";
export default function Desktop1(props) {
  const { home, overrides, ...rest } = props;
  return (
    <View
      width="1440px"
      height="1024px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Desktop1")}
      {...rest}
    >
      <Image
        width="100.42%"
        height="1024px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="-0.21%"
        right="-0.21%"
        padding="0px 0px 0px 0px"
        objectFit="unset"
        src={home?.image_url}
        {...getOverrideProps(overrides, "sony 1")}
      ></Image>
      <Flex
        gap="0"
        direction="column"
        width="864px"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        position="absolute"
        top="-265px"
        left="277px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 1")}
      >
        <Flex
          width="864px"
          height="unset"
          {...getOverrideProps(overrides, "Card36682711")}
        ></Flex>
        <Flex
          width="864px"
          height="unset"
          {...getOverrideProps(overrides, "Card36682712")}
        ></Flex>
        <Flex
          width="864px"
          height="unset"
          {...getOverrideProps(overrides, "Card36682713")}
        ></Flex>
        <Flex
          width="864px"
          height="unset"
          {...getOverrideProps(overrides, "Card36682714")}
        ></Flex>
      </Flex>
    </View>
  );
}
