import { spacing } from "app/theme"
import { ImageStyle, Platform, TextStyle, ViewStyle } from "react-native"

export const $booksContainer: ViewStyle = {
  marginTop: spacing.md,
  paddingRight: spacing.sm,
  paddingVertical: spacing.sm,
  marginBottom: spacing.lg,
}

export const $bookCard: ViewStyle = {
  marginRight: spacing.sm,
  marginBottom: spacing.sm,
  overflow: "hidden",
  backgroundColor: "#fff",
}
export const $bookCover: ImageStyle = {
  width: Platform.OS === "ios" ? 190 : 180,
  height: 260,
  resizeMode: "cover",
  borderRadius: 10,
}

export const $bookTitle: TextStyle = {
  maxWidth: 250,
  fontSize: spacing.md,
  fontWeight: "bold",
  paddingHorizontal: spacing.xs,
  paddingTop: spacing.xs,
}
export const $bookAuthor: TextStyle = {
  fontSize: spacing.md - 2,
  paddingHorizontal: spacing.xs,
  paddingTop: spacing.xxxs,
}

export const $verticalList: ViewStyle = {
  paddingHorizontal: spacing.sm,
  // flexGrow: 1,
}
