import { View, ViewStyle } from "react-native"
import React from "react"
import { colors, spacing } from "app/theme"

export function Divider() {
  return <View style={$viewPresets} />
}

const $viewPresets: ViewStyle = {
  backgroundColor: colors.separator,
  height: 0.5,
  marginVertical: spacing.sm,
}
