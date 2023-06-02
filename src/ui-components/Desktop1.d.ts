/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Home } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Desktop1OverridesProps = {
    Desktop1?: PrimitiveOverrideProps<ViewProps>;
    "sony 1"?: PrimitiveOverrideProps<ImageProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    Card36682711?: PrimitiveOverrideProps<FlexProps>;
    Card36682712?: PrimitiveOverrideProps<FlexProps>;
    Card36682713?: PrimitiveOverrideProps<FlexProps>;
    Card36682714?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type Desktop1Props = React.PropsWithChildren<Partial<ViewProps> & {
    home?: Home;
} & {
    overrides?: Desktop1OverridesProps | undefined | null;
}>;
export default function Desktop1(props: Desktop1Props): React.ReactElement;
