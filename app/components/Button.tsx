import React, { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from "react-native"
import { colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"

type Presets = keyof typeof $viewPresets

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode

  loading?: boolean
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    loading = false,
    ...rest
  } = props

  const preset: Presets = props.preset ?? "default"
  function $viewStyle({ pressed }: PressableStateCallbackType) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      loading && { opacity: 0.5 },
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
    ]
  }
  function $textStyle({ pressed }: PressableStateCallbackType) {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
    ]
  }

  return (
    <Pressable style={$viewStyle} disabled={loading} accessibilityRole="button" {...rest}>
      {(state) => (
        <>
          {!!LeftAccessory && <LeftAccessory style={$leftAccessoryStyle} pressableState={state} />}

          <>
            {loading && <ActivityIndicator color={colors.palette.neutral100} />}

            <Text
              tx={tx}
              text={text}
              txOptions={txOptions}
              style={[
                $textStyle(state),
                {
                  marginLeft: spacing.sm,
                },
              ]}
            >
              {children}
            </Text>
          </>

          {!!RightAccessory && (
            <RightAccessory style={$rightAccessoryStyle} pressableState={state} />
          )}
        </>
      )}
    </Pressable>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: 60,
  borderRadius: 99,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: "hidden",

  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 9.5,
  shadowRadius: 21,
  elevation: 10,
}

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.xs, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.xs, zIndex: 1 }

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.neutral400,
      backgroundColor: colors.palette.primary500,
    },
  ] as StyleProp<ViewStyle>,

  filled: [$baseViewStyle, { backgroundColor: colors.palette.primary500 }] as StyleProp<ViewStyle>,

  reversed: [
    $baseViewStyle,
    { backgroundColor: colors.palette.primary500 },
  ] as StyleProp<ViewStyle>,

  text: [
    {
      backgroundColor: "transparent",
    },
  ] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: $baseTextStyle,
  reversed: [$baseTextStyle, { color: colors.palette.neutral100 }],
  text: [$baseTextStyle, { color: colors.palette.primary500 }],
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.primary500 },
  filled: { backgroundColor: colors.palette.primary500 },
  reversed: { backgroundColor: colors.palette.primary500 },
  text: { backgroundColor: "transparent" },
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  reversed: { opacity: 0.9 },
  text: { opacity: 0.9 },
}
