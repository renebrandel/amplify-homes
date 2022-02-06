/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  IconCamera,
  IconFlag,
  SelectField,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
export default function ContactUs(props) {
  const { overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Flex
      gap="24px"
      direction="column"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Flex")}
    >
      <Flex
        gap="8px"
        direction="column"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
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
          width="350px"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          children="Need assistance?"
          {...getOverrideProps(overrides, "Flex.Flex[0].Text[0]")}
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
          width="350px"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          children="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
          {...getOverrideProps(overrides, "Flex.Flex[0].Text[1]")}
        ></Text>
      </Flex>
      <Flex
        gap="16px"
        direction="row"
        alignItems="flex-start"
        shrink="0"
        width="350px"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Flex.Flex[1]")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(92.00000211596489,102.00000151991844,112.000000923872,1)"
          lineHeight="20px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.49px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          children="US HELP CENTER"
          {...getOverrideProps(overrides, "Flex.Flex[1].Text[0]")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(92.00000211596489,102.00000151991844,112.000000923872,1)"
          lineHeight="20px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.49px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          children="/"
          {...getOverrideProps(overrides, "Flex.Flex[1].Text[1]")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(92.00000211596489,102.00000151991844,112.000000923872,1)"
          lineHeight="20px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.49px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          children="SUBMIT A REQUEST"
          {...getOverrideProps(overrides, "Flex.Flex[1].Text[2]")}
        ></Text>
      </Flex>
      <SelectField
        display="flex"
        shrink="0"
        alignSelf="stretch"
        label="Label"
        size="large"
        variation="default"
        {...getOverrideProps(overrides, "Flex.SelectField[0]")}
      ></SelectField>
      <TextField
        display="flex"
        shrink="0"
        alignSelf="stretch"
        label="Label"
        size="large"
        variation="default"
        {...getOverrideProps(overrides, "Flex.TextField[0]")}
      ></TextField>
      <SelectField
        display="flex"
        shrink="0"
        alignSelf="stretch"
        label="Label"
        size="large"
        variation="default"
        {...getOverrideProps(overrides, "Flex.SelectField[1]")}
      ></SelectField>
      <TextField
        display="flex"
        shrink="0"
        alignSelf="stretch"
        label="Label"
        size="large"
        variation="default"
        {...getOverrideProps(overrides, "Flex.TextField[1]")}
      ></TextField>
      <TextField
        display="flex"
        shrink="0"
        alignSelf="stretch"
        label="Label"
        size="large"
        variation="default"
        {...getOverrideProps(overrides, "Flex.TextField[2]")}
      ></TextField>
      <Button
        display="flex"
        shrink="0"
        alignSelf="stretch"
        size="large"
        variation="primary"
        children="Primary Button"
        {...getOverrideProps(overrides, "Flex.Button[0]")}
      ></Button>
      <Flex
        gap="24px"
        direction="row"
        alignItems="flex-start"
        shrink="0"
        width="201px"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Flex.Flex[2]")}
      >
        <Flex
          gap="8px"
          direction="row"
          alignItems="center"
          shrink="0"
          height="24px"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[2].Flex[0]")}
        >
          <IconCamera
            width="24px"
            height="24px"
            shrink="0"
            overflow="hidden"
            position="relative"
            padding="0px 0px 0px 0px"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            type="camera"
            fontSize="24px"
            {...getOverrideProps(
              overrides,
              "Flex.Flex[2].Flex[0].IconCamera[0]"
            )}
          ></IconCamera>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Instagram"
            {...getOverrideProps(overrides, "Flex.Flex[2].Flex[0].Text[0]")}
          ></Text>
        </Flex>
        <Flex
          gap="8px"
          direction="row"
          alignItems="center"
          shrink="0"
          height="24px"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Flex.Flex[2].Flex[1]")}
        >
          <IconFlag
            width="24px"
            height="24px"
            shrink="0"
            overflow="hidden"
            position="relative"
            padding="0px 0px 0px 0px"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            type="flag"
            fontSize="24px"
            {...getOverrideProps(overrides, "Flex.Flex[2].Flex[1].IconFlag[0]")}
          ></IconFlag>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            lineHeight="24px"
            textAlign="left"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            children="Twitter"
            {...getOverrideProps(overrides, "Flex.Flex[2].Flex[1].Text[0]")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
