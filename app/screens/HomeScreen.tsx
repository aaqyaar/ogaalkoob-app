import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"

interface HomeScreenProps extends TabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()

  // useHeader(
  //   {
  //     rightTx: "common.logOut",
  //     onRightPress: logout,
  //     RightActionComponent: (
  //       <Icon
  //         svgIcon={"search"}
  //         size={20}
  //         color="#000"
  //         onPress={() => console.log("search")}
  //         containerStyle={{ marginRight: spacing.sm }}
  //       />
  //     ),
  //     leftText: "Ogaalkoob",
  //   },

  //   [logout],
  // )
  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
