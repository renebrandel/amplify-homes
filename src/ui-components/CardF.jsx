/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Badge,
  Divider,
  Flex,
  IconChat,
  IconCheck,
  Image,
  Rating,
  Text,
} from "@aws-amplify/ui-react";
export default function CardF(props) {
  const { overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Flex
      gap="0"
      direction="row"
      width="960px"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Flex")}
    >
      <Image
        width="320px"
        height="385px"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Flex.Image[0]")}
      ></Image>
      <Flex
        gap="24px"
        direction="column"
        width="640px"
        grow="1"
        basis="640px"
        height="385px"
        position="relative"
        padding="32px 32px 32px 32px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Flex.Flex[0]")}
      >
        <Text
          fontFamily="Inter"
          fontSize="32px"
          fontWeight="700"
          color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
          lineHeight="40px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          width="576px"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          children="Classic Long Sleeve T-Shirt"
          {...getOverrideProps(overrides, "Flex.Flex[0].Text[0]")}
        ></Text>
        <Flex
          gap="16px"
          direction="row"
          alignItems="center"
          shrink="0"
          width="247px"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0]")}
        >
          <Rating
            display="flex"
            shrink="0"
            height="36px"
            size="large"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0].Rating[0]")}
          ></Rating>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            lineHeight="22px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            textDecoration="underline"
            width="19px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            children="72"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0].Text[0]")}
          ></Text>
        </Flex>
        <Flex
          gap="16px"
          direction="row"
          alignItems="center"
          shrink="0"
          width="243px"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1]")}
        >
          <Badge
            padding="4px 8px 4px 8px"
            display="flex"
            shrink="0"
            height="28px"
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
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1].Badge[0]")}
          ></Badge>
          <Badge
            padding="4px 8px 4px 8px"
            display="flex"
            shrink="0"
            height="28px"
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
            children="Classic"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1].Badge[1]")}
          ></Badge>
          <Badge
            padding="4px 8px 4px 8px"
            display="flex"
            shrink="0"
            height="28px"
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
            children="Modern"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1].Badge[2]")}
          ></Badge>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.010000000000000009px"
          width="576px"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          children="Information about this product."
          {...getOverrideProps(overrides, "Flex.Flex[0].Text[1]")}
        ></Text>
        <Flex
          gap="16px"
          direction="row"
          alignItems="flex-start"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[2]")}
        >
          <IconChat
            width="24px"
            height="24px"
            shrink="0"
            overflow="hidden"
            position="relative"
            padding="0px 0px 0px 0px"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            type="chat"
            fontSize="24px"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[2].IconChat[0]")}
          ></IconChat>
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
            width="536px"
            grow="1"
            basis="536px"
            position="relative"
            padding="0px 0px 0px 0px"
            children="“This is a quote.“"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[2].Text[0]")}
          ></Text>
        </Flex>
        <Divider
          width="576px"
          shrink="0"
          alignSelf="stretch"
          size="small"
          orientation="horizontal"
          {...getOverrideProps(overrides, "Flex.Flex[0].Divider[0]")}
        ></Divider>
        <Flex
          gap="32px"
          direction="row"
          alignItems="flex-start"
          shrink="0"
          width="286px"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[3]")}
        >
          <Flex
            gap="16px"
            direction="row"
            alignItems="flex-start"
            shrink="0"
            height="24px"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[3].Flex[0]")}
          >
            <IconCheck
              width="24px"
              height="24px"
              shrink="0"
              overflow="hidden"
              position="relative"
              padding="0px 0px 0px 0px"
              color="rgba(67.00000360608101,168.0000051856041,84.00000259280205,1)"
              type="check"
              fontSize="24px"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[3].Flex[0].IconCheck[0]"
              )}
            ></IconCheck>
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
              children="Fast"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[3].Flex[0].Text[0]"
              )}
            ></Text>
          </Flex>
          <Flex
            gap="16px"
            direction="row"
            alignItems="flex-start"
            shrink="0"
            height="24px"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[3].Flex[1]")}
          >
            <IconCheck
              width="24px"
              height="24px"
              shrink="0"
              overflow="hidden"
              position="relative"
              padding="0px 0px 0px 0px"
              color="rgba(67.00000360608101,168.0000051856041,84.00000259280205,1)"
              type="check"
              fontSize="24px"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[3].Flex[1].IconCheck[0]"
              )}
            ></IconCheck>
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
              children="Fun"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[3].Flex[1].Text[0]"
              )}
            ></Text>
          </Flex>
          <Flex
            gap="16px"
            direction="row"
            alignItems="flex-start"
            shrink="0"
            height="24px"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[3].Flex[2]")}
          >
            <IconCheck
              width="24px"
              height="24px"
              shrink="0"
              overflow="hidden"
              position="relative"
              padding="0px 0px 0px 0px"
              color="rgba(67.00000360608101,168.0000051856041,84.00000259280205,1)"
              type="check"
              fontSize="24px"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[3].Flex[2].IconCheck[0]"
              )}
            ></IconCheck>
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
              children="Flirty"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[3].Flex[2].Text[0]"
              )}
            ></Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
