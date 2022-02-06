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
  IconFavoriteBorder,
  Image,
  Rating,
  Text,
} from "@aws-amplify/ui-react";
export default function CardG(props) {
  const { overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Flex
      gap="0"
      direction="row"
      width="960px"
      alignItems="center"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Flex")}
    >
      <Image
        width="400px"
        height="351px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Flex.Image[0]")}
      ></Image>
      <Flex
        gap="24px"
        direction="column"
        width="560px"
        grow="1"
        basis="560px"
        height="353px"
        position="relative"
        padding="32px 32px 32px 32px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Flex.Flex[0]")}
      >
        <Flex
          gap="8px"
          direction="column"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0]")}
        >
          <Flex
            gap="8px"
            direction="row"
            alignItems="flex-start"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0].Flex[0]")}
          >
            <Text
              fontFamily="Inter"
              fontSize="14px"
              fontWeight="400"
              color="rgba(92.00000211596489,102.00000151991844,112.000000923872,1)"
              lineHeight="24px"
              textAlign="left"
              display="flex"
              direction="column"
              justifyContent="flex-start"
              width="464px"
              grow="1"
              basis="464px"
              position="relative"
              padding="0px 0px 0px 0px"
              children="Information about this product"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[0].Flex[0].Text[0]"
              )}
            ></Text>
            <IconFavoriteBorder
              width="24px"
              height="24px"
              shrink="0"
              overflow="hidden"
              position="relative"
              padding="0px 0px 0px 0px"
              color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
              type="favorite_border"
              fontSize="24px"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[0].Flex[0].IconFavoriteBorder[0]"
              )}
            ></IconFavoriteBorder>
          </Flex>
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
            width="496px"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Classic Long Sleeve T-Shirt"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0].Text[0]")}
          ></Text>
        </Flex>
        <Divider
          width="40px"
          shrink="0"
          size="small"
          orientation="horizontal"
          {...getOverrideProps(overrides, "Flex.Flex[0].Divider[0]")}
        ></Divider>
        <Flex
          gap="8px"
          direction="column"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1]")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(92.00000211596489,102.00000151991844,112.000000923872,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.010000000000000009px"
            width="496px"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Information about this product."
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1].Text[0]")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(92.00000211596489,102.00000151991844,112.000000923872,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0.010000000000000009px"
            width="496px"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Information about this product."
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1].Text[1]")}
          ></Text>
        </Flex>
        <Badge
          padding="4px 8px 4px 8px"
          display="flex"
          shrink="0"
          width="58px"
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
          children="New!"
          {...getOverrideProps(overrides, "Flex.Flex[0].Badge[0]")}
        ></Badge>
        <Flex
          gap="16px"
          direction="row"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[2]")}
        >
          <Flex
            gap="16px"
            direction="row"
            alignItems="center"
            shrink="0"
            height="36px"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[2].Flex[0]")}
          >
            <Rating
              display="flex"
              shrink="0"
              height="36px"
              size="large"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[2].Flex[0].Rating[0]"
              )}
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
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              children="Reviews"
              {...getOverrideProps(
                overrides,
                "Flex.Flex[0].Flex[2].Flex[0].Text[0]"
              )}
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
            width="189px"
            grow="1"
            basis="189px"
            position="relative"
            padding="0px 0px 0px 0px"
            children="$99/Night"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[2].Text[0]")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
