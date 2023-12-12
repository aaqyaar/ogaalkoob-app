/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { useAuthStore } from "app/models"
import { translate } from "app/i18n"
import { HomeNavigator, TabNavigatorParamList } from "./TabNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Login: undefined
  App: NavigatorScreenParams<TabNavigatorParamList>
  Home: undefined

  // 🔥 Your screens go here
  ForgotPassword: undefined
  VerifyCode: { email: string }
  ResetPassword: { userId: string }
  Register: undefined

  // 🔥
  Book: { bookId: string; bookName: string }
  BookView: { pdfUrl: string; bookName: string }

  Checkout: undefined
  PlayAudio: { audioUrl: string; bookName: string; bookCover: string }
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
        headerTintColor: colors.palette.primary500,
        headerTitleStyle: {
          color: colors.palette.neutral900,
        },
        // headerShadowVisible: false,
        navigationBarColor: colors.background,
      }}
      initialRouteName={isAuthenticated ? "Home" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeNavigator}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            options={{
              headerTitle: translate("loginScreen.signIn"),
            }}
            component={Screens.LoginScreen}
          />

          <Stack.Screen
            name="Register"
            options={{
              headerTitle: translate("registerScreen.register"),
            }}
            component={Screens.RegisterScreen}
          />

          <Stack.Screen
            name="ForgotPassword"
            options={{
              headerTitle: translate("forgotPasswordScreen.forgotPassword"),
            }}
            component={Screens.ForgotPasswordScreen}
          />
          <Stack.Screen
            name="VerifyCode"
            options={{
              headerTitle: translate("verifyCodeScreen.verifyCode"),
            }}
            initialParams={{
              email: "",
            }}
            component={Screens.VerifyCodeScreen}
          />
          <Stack.Screen
            name="ResetPassword"
            options={{
              headerTitle: translate("resetPasswordScreen.resetPassword"),
            }}
            initialParams={{
              userId: "",
            }}
            component={Screens.ResetPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  )
}
