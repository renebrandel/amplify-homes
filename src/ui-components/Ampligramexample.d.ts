/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AmpligramexampleOverridesProps = {
    Ampligramexample?: PrimitiveOverrideProps<ViewProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    Card18322247?: PrimitiveOverrideProps<FlexProps>;
    Card18322177?: PrimitiveOverrideProps<FlexProps>;
    Card18322142?: PrimitiveOverrideProps<FlexProps>;
    Card18322212?: PrimitiveOverrideProps<FlexProps>;
    "NavBar/Variant2"?: PrimitiveOverrideProps<FlexProps>;
    SideBar?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type AmpligramexampleProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: AmpligramexampleOverridesProps | undefined | null;
}>;
export default function Ampligramexample(props: AmpligramexampleProps): React.ReactElement;
