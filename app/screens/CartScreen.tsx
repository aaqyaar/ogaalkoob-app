import React, { FC } from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Button, Divider, Icon, Screen, Text } from "app/components"
import { useCartStore } from "app/models/cart.store"
import { formatCurrency } from "app/utils/formatCurrency"
import { Image } from "@rneui/themed"
import { columnCenter, columnRight, flex, row, rowCenterSpaceBetween } from "app/theme/globalStyles"
import { spacing, typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"

interface CartScreenProps extends TabScreenProps<"Cart"> {}

export const CartScreen: FC<CartScreenProps> = function CartScreen(_props) {
  // Pull in navigation via hook
  const { navigation } = _props

  const { items, removeItem } = useCartStore()
  const bottom = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
      {items?.length ? (
        <View style={flex}>
          {items.map((item) => (
            <View key={item.id} style={rowCenterSpaceBetween}>
              <View style={[row, $itemsContainer]}>
                <Image source={{ uri: item.photos[0] }} style={$bookCover} />
                <View
                  style={{
                    paddingLeft: spacing.md,
                  }}
                >
                  <Text
                    text={item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
                    size="md"
                  />
                  <Text
                    text={item.author}
                    size="sm"
                    style={{
                      paddingVertical: spacing.xxxs,
                    }}
                    weight="light"
                  />
                  <Text size="md" text={formatCurrency(item.price)} />
                </View>
              </View>
              <Icon svgIcon="trash" size={22} onPress={() => removeItem(item.id)} />
            </View>
          ))}

          <View style={[flex, columnRight, bottom]}>
            <View
              style={[
                rowCenterSpaceBetween,
                { marginVertical: spacing.md, paddingHorizontal: spacing.xxs },
              ]}
            >
              <Text size="md">Total</Text>
              <Text
                size="md"
                style={{
                  fontFamily: typography.inter?.light,
                }}
                text={formatCurrency(items.reduce((acc, item) => acc + item.price, 0))}
              />
            </View>

            <Divider />

            <Button preset="reversed" onPress={() => navigation.navigate("Checkout")}>
              Checkout
            </Button>
          </View>
        </View>
      ) : (
        <View style={[flex, columnCenter]}>
          <Image source={require("../../assets/images/empty-cart.png")} width={200} height={200} />
          <Text size="lg">Your cart is empty</Text>
        </View>
      )}
    </Screen>
  )
}

const $container: ViewStyle = {
  flexGrow: 1,
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  // paddingTop: spacing.lg,
}

const $itemsContainer: ViewStyle = {
  paddingVertical: spacing.md,
  // borderBottomWidth: 1,
  // borderBottomColor: colors.palette.neutral200,
}

const $bookCover: ImageStyle = {
  width: 80,
  height: 80,
}
