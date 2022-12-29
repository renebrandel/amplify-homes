/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HomeCreateFormInputValues = {
    address?: string;
    image_url?: string;
    price?: number;
};
export declare type HomeCreateFormValidationValues = {
    address?: ValidationFunction<string>;
    image_url?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HomeCreateFormOverridesProps = {
    HomeCreateFormGrid?: FormProps<GridProps>;
    address?: FormProps<TextFieldProps>;
    image_url?: FormProps<TextFieldProps>;
    price?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HomeCreateFormProps = React.PropsWithChildren<{
    overrides?: HomeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HomeCreateFormInputValues) => HomeCreateFormInputValues;
    onSuccess?: (fields: HomeCreateFormInputValues) => void;
    onError?: (fields: HomeCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: HomeCreateFormInputValues) => HomeCreateFormInputValues;
    onValidate?: HomeCreateFormValidationValues;
} & React.CSSProperties>;
export default function HomeCreateForm(props: HomeCreateFormProps): React.ReactElement;
