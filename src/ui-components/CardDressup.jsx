/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { View } from "@aws-amplify/ui-react";
export default function CardDressup(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1388px"
      height="741px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "CardDressup")}
    >
      <View
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        boxShadow="0px 0px 18px rgba(0, 0, 0, 0.20000000298023224)"
        borderRadius="20px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,0.5)"
        {...getOverrideProps(overrides, "Rectangle 1186")}
      ></View>
    </View>
  );
}
