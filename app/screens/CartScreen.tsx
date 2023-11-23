import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"

interface CartScreenProps extends TabScreenProps<"Cart"> {}

export const CartScreen: FC<CartScreenProps> = function CartScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="cart" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
