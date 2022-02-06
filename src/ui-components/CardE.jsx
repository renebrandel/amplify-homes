/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Badge, Flex, Text, View } from "@aws-amplify/ui-react";
export default function CardE(props) {
  const { overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Flex
      gap="0"
      direction="row"
      width="320px"
      alignItems="flex-start"
      position="relative"
      padding="16px 16px 16px 16px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "Flex")}
    >
      <View
        width="288px"
        height="288px"
        grow="1"
        basis="288px"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Flex.View[0]")}
      >
        <Badge
          gap="0"
          position="absolute"
          padding="4px 8px 4px 8px"
          display="flex"
          top="0px"
          left="0px"
          fontFamily="Inter"
          fontWeight="700"
          fontSize="16px"
          color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
          textAlign="left"
          lineHeight="20px"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.49px"
          size="small"
          variation="default"
          children="New"
          {...getOverrideProps(overrides, "Flex.View[0].Badge[0]")}
        ></Badge>
        <Flex
          gap="0"
          position="absolute"
          bottom="0px"
          left="0px"
          direction="column"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.View[0].Flex[0]")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="700"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            children="T-Shirt"
            {...getOverrideProps(overrides, "Flex.View[0].Flex[0].Text[0]")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(48.000000938773155,64.00000378489494,80.00000283122063,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.010000000000000009px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Classic Long Sleeve"
            {...getOverrideProps(overrides, "Flex.View[0].Flex[0].Text[1]")}
          ></Text>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
          lineHeight="24px"
          textAlign="right"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          position="absolute"
          bottom="0px"
          right="0px"
          padding="0px 0px 0px 0px"
          children="$99"
          {...getOverrideProps(overrides, "Flex.View[0].Text[0]")}
        ></Text>
      </View>
    </Flex>
  );
}
