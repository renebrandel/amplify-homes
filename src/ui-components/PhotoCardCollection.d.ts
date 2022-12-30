/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PhotoCardProps } from "./PhotoCard";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PhotoCardCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => PhotoCardProps;
} & {
    overrides?: EscapeHatchProps | undefined | null;
}>;
export default function PhotoCardCollection(props: PhotoCardCollectionProps): React.ReactElement;
