import React, { FC, useCallback } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { BooksList, Screen, Text } from "app/components"
import { useAuthStore } from "app/models"
import { columnCenter, flex } from "app/theme/globalStyles"
import { Image } from "@rneui/themed"
import { useFocusEffect } from "@react-navigation/native"
import { spacing } from "app/theme"

interface PurchasesScreenProps extends TabScreenProps<"Purchases"> {}

export const PurchasesScreen: FC<PurchasesScreenProps> = function PurchasesScreen() {
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { profile, status, getMe } = useAuthStore()

  const books = profile?.purchases?.map((purchase) => purchase?.books).flat()

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      ;(async () => {
        await getMe()
      })()
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, []),
  )

  return (
    <Screen
      style={$root}
      contentContainerStyle={{
        flexGrow: 1,
        marginTop: spacing.sm,
      }}
      preset="fixed"
    >
      {profile?.purchases?.length === 0 ? (
        <View style={[flex, columnCenter]}>
          <Image
            PlaceholderContent={<ActivityIndicator />}
            source={require("../../assets/images/empty-cart.png")}
            width={200}
            height={200}
          />
          <Text size="lg">You have no purchases yet</Text>
        </View>
      ) : (
        <BooksList
          books={books}
          status={status}
          align="vertical"
          onEndReached={() => {}}
          canPullToRefresh={false}
          refreshFn={() => getMe()}
        />
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
