import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useAuthStore } from "app/models"
// import { useNavigation } from "@react-navigation/native"

interface ProfileScreenProps extends TabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()

  // Pull in auth store
  const { logout } = useAuthStore()

  return (
    <Screen style={$root} preset="scroll">
      <Text text="profile" />

      <Button onPress={logout}>Logout</Button>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
