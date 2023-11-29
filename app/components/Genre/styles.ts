import { colors, spacing } from "app/theme"
import { ViewStyle } from "react-native"

export const $genreContainer: ViewStyle = {
  marginTop: spacing.xs,
  paddingRight: spacing.sm,
  paddingVertical: spacing.sm,
}

export const $genreCard: ViewStyle = {
  padding: spacing.sm,
  borderRadius: spacing.xs,
  backgroundColor: colors.palette.neutral50,
}
