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
  Divider,
  Flex,
  IconClose,
  Image,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
export default function EditProfile(props) {
  const { overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Flex
      gap="16px"
      direction="column"
      width="640px"
      position="relative"
      padding="24px 0px 24px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "Flex")}
    >
      <Flex
        gap="24px"
        direction="column"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Flex.Flex[0]")}
      >
        <Flex
          gap="16px"
          direction="row"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 24px 0px 24px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0]")}
        >
          <IconClose
            width="24px"
            height="24px"
            shrink="0"
            overflow="hidden"
            position="relative"
            padding="0px 0px 0px 0px"
            color="rgba(13.000000175088644,26.000000350177288,38.0000015348196,1)"
            type="close"
            fontSize="24px"
            {...getOverrideProps(
              overrides,
              "Flex.Flex[0].Flex[0].IconClose[0]"
            )}
          ></IconClose>
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
            children="Edit Profile"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[0].Text[0]")}
          ></Text>
        </Flex>
        <Divider
          width="640px"
          shrink="0"
          alignSelf="stretch"
          size="small"
          orientation="horizontal"
          {...getOverrideProps(overrides, "Flex.Flex[0].Divider[0]")}
        ></Divider>
        <Flex
          gap="16px"
          direction="row"
          alignItems="center"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 24px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1]")}
        >
          <Image
            width="96px"
            height="96px"
            shrink="0"
            position="relative"
            borderRadius="160px"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1].Image[0]")}
          ></Image>
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
            children="Upload New Image"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[1].Text[0]")}
          ></Text>
        </Flex>
        <Flex
          gap="16px"
          direction="column"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 24px 0px 24px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[2]")}
        >
          <TextField
            label="name"
            display="flex"
            shrink="0"
            alignSelf="stretch"
            size="default"
            variation="default"
            {...getOverrideProps(
              overrides,
              "Flex.Flex[0].Flex[2].TextField[0]"
            )}
          ></TextField>
          <TextField
            label="location"
            display="flex"
            shrink="0"
            alignSelf="stretch"
            size="default"
            variation="default"
            {...getOverrideProps(
              overrides,
              "Flex.Flex[0].Flex[2].TextField[1]"
            )}
          ></TextField>
          <TextField
            label="email"
            display="flex"
            shrink="0"
            alignSelf="stretch"
            size="default"
            variation="default"
            {...getOverrideProps(
              overrides,
              "Flex.Flex[0].Flex[2].TextField[2]"
            )}
          ></TextField>
        </Flex>
        <Divider
          width="640px"
          shrink="0"
          alignSelf="stretch"
          size="small"
          orientation="horizontal"
          {...getOverrideProps(overrides, "Flex.Flex[0].Divider[1]")}
        ></Divider>
        <Flex
          gap="10px"
          direction="column"
          shrink="0"
          width="97px"
          position="relative"
          padding="0px 0px 0px 24px"
          {...getOverrideProps(overrides, "Flex.Flex[0].Flex[3]")}
        >
          <Button
            padding="8px 16px 8px 16px"
            display="flex"
            shrink="0"
            width="73px"
            size="default"
            variation="primary"
            children="Save"
            {...getOverrideProps(overrides, "Flex.Flex[0].Flex[3].Button[0]")}
          ></Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
