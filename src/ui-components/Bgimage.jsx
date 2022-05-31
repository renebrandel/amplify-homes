/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon } from "@aws-amplify/ui-react";
export default function Bgimage(props) {
  const { overrides, ...rest } = props;
  return (
    <Icon
      width="1177px"
      height="865px"
      position="relative"
      padding="0px 0px 0px 0px"
      viewBox={{ minX: 0, minY: 0, width: 1177, height: 865 }}
      paths={[
        {
          d: "M284 311.809C159 234.309 19 45.3333 0 0L1177 0L1177 865C1135.5 789.5 969 627.5 852 557C711.953 472.613 457.5 419.379 284 311.809Z",
          fill: "rgba(242,206,203,1)",
          fillRule: "nonzero",
          style: { transform: "translate(0%, 0%)" },
        },
      ]}
      {...rest}
      {...getOverrideProps(overrides, "Bgimage")}
    ></Icon>
  );
}
