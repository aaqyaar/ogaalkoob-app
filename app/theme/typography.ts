// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  Urbanist_300Light as urbanistLight,
  Urbanist_400Regular as urbanistRegular,
  Urbanist_500Medium as urbanistMedium,
  Urbanist_600SemiBold as urbanistSemiBold,
  Urbanist_700Bold as urbanistBold,
} from "@expo-google-fonts/urbanist"

export const customFontsToLoad = {
  urbanistLight,
  urbanistRegular,
  urbanistMedium,
  urbanistSemiBold,
  urbanistBold,
}

const fonts = {
  urbanist: {
    // Cross-platform Google font.
    light: "urbanistLight",
    normal: "urbanistRegular",
    medium: "urbanistMedium",
    semiBold: "urbanistSemiBold",
    bold: "urbanistBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.urbanist,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
