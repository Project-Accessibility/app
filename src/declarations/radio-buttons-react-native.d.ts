declare module 'radio-buttons-react-native' {
  import * as React from 'react';
  import { StyleProp, TextStyle, ViewStyle } from 'react-native';
  export type animationTypes = 'zoomIn' | 'pulse' | 'shake' | 'rotate';
  export interface RadioButtonProps<ItemType> {
    /** Defaults to [] */
    data: ItemType[];
    selectedBtn?: (value: ItemType) => void;
    icon?: React.ReactNode;
    /** Defaults to true */
    box?: boolean;
    /** Defaults to -1 */
    initial?: number | null;
    /** Defaults to [] */
    animationTypes?: animationTypes[];
    /** Defaults to 500 */
    duration?: number;
    /** Defaults to {} */
    style?: StyleProp<ViewStyle>;
    /** Defaults to {} */
    boxStyle?: StyleProp<ViewStyle>;
    /** Defaults to {} */
    textStyle?: StyleProps<TextStyle>;
    /** Defaults to 18 */
    circleSize?: number;
    /** Defaults to '#03a9f4' */
    activeColor?: string;
    /** Defaults to '#e2e2e2' */
    deactiveColor?: string;
    /** Defaults to '#e1f5fe33' */
    boxActiveBgColor?: string;
    /** Defaults to '#fff' */
    boxDeactiveBgColor?: string;
    /** Defaults to '#383838' */
    textColor?: string;
  }
  export default class RadioButtonRN<T> extends React.Component<RadioButtonProps<T>, unknown> {}
}

export {};
