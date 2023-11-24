import React from "react"
import * as Screens from "app/screens"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { colors, typography } from "app/theme"
import { Platform, TextStyle, ViewStyle } from "react-native"
import { Icon } from "app/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type TabNavigatorParamList = {
  Home: undefined
  Purchases: undefined
  Profile: undefined
  Cart: undefined
}

const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const Stack = createNativeStackNavigator<AppStackParamList>()

export type TabScreenProps<T extends keyof TabNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export const HomeNavigator = function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="App" component={TabNavigator} />
      <Stack.Screen
        name="BookView"
        options={{
          headerShown: true,
          headerBackTitle: "",
          headerTintColor: colors.palette.primary500,
          headerTitleStyle: {
            color: colors.palette.neutral900,
          },
          // headerShadowVisible: false,
          navigationBarColor: colors.background,
        }}
        component={Screens.BookViewScreen}
      />
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          $tabBar,
          {
            height: bottom + 55,
            marginBottom: Platform.OS === "ios" ? 0 : 5,
            paddingBottom: Platform.OS === "android" ? 20 : 30,
            paddingTop: Platform.OS === "android" ? 10 : 5,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 8.0,
            elevation: 15,
          },
        ],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Ogaalkoob",

          tabBarLabel: "Home",
          headerTitleStyle: { fontFamily: typography.primary.semiBold },
          tabBarLabelStyle: { fontFamily: typography.primary.normal },
          tabBarIcon: ({ color, focused }) => (
            <Icon svgIcon="home" color={focused ? colors.palette.primary500 : color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Ogaalkoob",
          headerTitleStyle: { fontFamily: typography.primary.semiBold },
          tabBarLabelStyle: { fontFamily: typography.primary.normal },
          tabBarIcon: ({ color, focused }) => (
            <Icon svgIcon="cart" color={focused ? colors.palette.primary500 : color} size={27} />
          ),
        }}
        component={Screens.CartScreen}
      />
      <Tab.Screen
        name="Purchases"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Ogaalkoob",
          headerTitleStyle: { fontFamily: typography.primary.semiBold },
          tabBarLabelStyle: { fontFamily: typography.primary.normal },
          tabBarIcon: ({ color, focused }) => (
            <Icon
              svgIcon="purchases"
              color={focused ? colors.palette.primary500 : color}
              size={27}
            />
          ),
        }}
        component={Screens.PurchasesScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Profile / Settings",
          headerTitleStyle: { fontFamily: typography.primary.semiBold },
          tabBarLabelStyle: { fontFamily: typography.primary.normal },
          tabBarIcon: ({ color, focused }) => (
            <Icon svgIcon="profile" color={focused ? colors.palette.primary500 : color} size={27} />
          ),
        }}
        component={Screens.ProfileScreen}
      />
    </Tab.Navigator>
  )
}
const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  // paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
