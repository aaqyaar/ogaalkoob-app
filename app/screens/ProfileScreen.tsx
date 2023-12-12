import React, { FC } from "react"
import { ViewStyle, View } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { useAuthStore } from "app/models"
import { colors, spacing } from "app/theme"
import { columnRight, flex } from "app/theme/globalStyles"
import { Image } from "@rneui/base"

interface ProfileScreenProps extends TabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = function ProfileScreen(_props) {
  // Pull in navigation via hook
  // const {navigation} = _props

  // Pull in auth store
  const { logout, profile } = useAuthStore()

  return (
    <Screen
      style={$root}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      preset="scroll"
      safeAreaEdges={["bottom"]}
    >
      <View
        style={{
          marginTop: spacing.lg,
        }}
      >
        <View
          style={{
            alignSelf: "center",

            borderWidth: 2,
            borderColor: colors.palette.neutral300,
            borderRadius: 150,
            padding: 3,
          }}
        >
          <Image
            source={{ uri: "https://www.github.com/aaqyaar.png" }}
            alt="Profile"
            blurRadius={2}
            style={{
              borderRadius: 100,
              height: 150,
              width: 150,
              // backgroundColor: colors.palette.neutral200,
              borderRadius: 150,
            }}
          />
        </View>
        <View style={{ marginTop: spacing.md }}>
          <Text size="lg" preset="heading">
            Welcome {profile?.name}
          </Text>

          <TextField
            label="Name"
            value={profile?.name}
            containerStyle={{
              marginTop: spacing.lg,
            }}
            status="disabled"
          />

          <TextField
            label="Email Address"
            value={profile?.email}
            containerStyle={{
              marginTop: spacing.lg,
            }}
            status="disabled"
          />
        </View>

        <View style={{ marginTop: spacing.md }}>
          <Text size="md">
            Total Purchases: <Text preset="bold">{profile?.purchases?.length}</Text>
          </Text>
        </View>
      </View>
      <View style={[flex, columnRight]}>
        <Button onPress={logout} preset="reversed">
          Logout
        </Button>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}
