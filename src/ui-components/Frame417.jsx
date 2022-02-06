/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Image, Text, View } from "@aws-amplify/ui-react";
export default function Frame417(props) {
  const { Frame417, overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <View
      width="246px"
      height="339px"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "View")}
    >
      <View
        width="247px"
        height="189px"
        position="absolute"
        top="150px"
        left="0px"
        padding="10"
        backgroundColor="rgba(196.00000351667404,196.00000351667404,196.00000351667404,1)"
        {...getOverrideProps(overrides, "View.View[0]")}
      ></View>
      <Image
        width="241px"
        height="150px"
        position="absolute"
        top="0px"
        left="6px"
        padding="0px 0px 0px 0px"
        src={Frame417?.image_url}
        {...getOverrideProps(overrides, "View.Image[0]")}
      ></Image>
      <Text
        fontFamily="Roboto"
        fontSize="48px"
        fontWeight="700"
        color="rgba(201.476588845253,13.613286316394806,217.8125050663948,1)"
        lineHeight="56.25px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="223px"
        height="134px"
        position="absolute"
        top="169px"
        left="12px"
        padding="0px 0px 0px 0px"
        title={Frame417?.id}
        children={Frame417?.address}
        {...getOverrideProps(overrides, "View.Text[0]")}
      ></Text>
    </View>
  );
}
