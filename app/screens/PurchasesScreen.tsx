import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"

interface PurchasesScreenProps extends TabScreenProps<"Purchases"> {}

export const PurchasesScreen: FC<PurchasesScreenProps> = function PurchasesScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="purchases" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
