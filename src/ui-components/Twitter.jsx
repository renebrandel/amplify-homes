/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import {
  getOverrideProps,
  useNavigateAction,
} from "@aws-amplify/ui-react/internal";
import { Icon, View } from "@aws-amplify/ui-react";
export default function Twitter(props) {
  const { overrides, ...rest } = props;
  const logoUnderScoreOneUnderScoreOnClick = useNavigateAction({
    type: "url",
    url: "https://twitter.com/SoudanNFT",
  });
  return (
    <View
      width="30px"
      height="24.68px"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Twitter")}
    >
      <View
        padding="0px 0px 0px 0px"
        position="absolute"
        top="0.73%"
        bottom="1.22%"
        left="0.4%"
        right="0.34%"
        label="Twitter"
        onClick={() => {
          logoUnderScoreOneUnderScoreOnClick();
        }}
        {...getOverrideProps(overrides, "Logo_1_")}
      >
        <Icon
          width="29.776123046875px"
          height="24.1953125px"
          viewBox={{
            minX: 0,
            minY: 0,
            width: 29.776123046875,
            height: 24.1953125,
          }}
          paths={[
            {
              d: "M26.7278 6.0233C26.746 6.2858 26.746 6.5483 26.746 6.81322C26.746 14.8854 20.6008 24.1951 9.36411 24.1951L9.36411 24.1902C6.04476 24.1951 2.79435 23.2443 0 21.4515C0.482661 21.5096 0.967742 21.5386 1.45403 21.5398C4.20484 21.5423 6.87702 20.6193 9.04113 18.9197C6.42702 18.8701 4.13468 17.1656 3.33387 14.6773C4.2496 14.8539 5.19315 14.8177 6.09194 14.5721C3.24194 13.9963 1.19153 11.4923 1.19153 8.58419C1.19153 8.55758 1.19153 8.53217 1.19153 8.50677C2.04073 8.97975 2.99153 9.24225 3.96411 9.27129C1.27984 7.47733 0.452419 3.90637 2.07339 1.11443C5.175 4.93096 9.75121 7.25112 14.6637 7.49669C14.1714 5.37491 14.844 3.15153 16.431 1.65999C18.8915 -0.652908 22.7613 -0.53436 25.0742 1.92491C26.4423 1.65516 27.7536 1.15314 28.9536 0.44185C28.4976 1.85596 27.5431 3.05717 26.2681 3.82048C27.479 3.67774 28.6621 3.35354 29.7762 2.85879C28.956 4.08782 27.923 5.15838 26.7278 6.0233Z",
              fill: "rgba(29,155,240,1)",
              fillRule: "nonzero",
            },
          ]}
          position="absolute"
          top="0%"
          bottom="0%"
          left="0%"
          right="0%"
          {...getOverrideProps(overrides, "white_background")}
        ></Icon>
      </View>
    </View>
  );
}
