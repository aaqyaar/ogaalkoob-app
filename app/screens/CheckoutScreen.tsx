import React, { FC, useEffect, useRef } from "react"
import { ViewStyle, View, TouchableOpacity, Alert, Platform } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import PhoneInput from "react-native-phone-input"
import { colors, spacing } from "app/theme"
import { PaymentMethod } from "../../types"
import { columnRight, flex, rowCenterSpaceBetween } from "app/theme/globalStyles"
import { useCartStore } from "app/models/cart.store"
import { formatCurrency } from "app/utils/formatCurrency"
import { purchaseSchema } from "app/validations/purchase"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuthStore } from "app/models"
import { usePurchaseStore } from "app/models/purchase.store"

interface CheckoutScreenProps extends AppStackScreenProps<"Checkout"> {}

export const CheckoutScreen: FC<CheckoutScreenProps> = function CheckoutScreen(_props) {
  // Pull in navigation via hook
  const { navigation } = _props
  const { getTotals, items, resetCart } = useCartStore()
  const { profile } = useAuthStore()
  const { createPurchase, status } = usePurchaseStore()

  const form = useForm<z.infer<typeof purchaseSchema>>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      books: items.map((item) => item.id),
      amount: getTotals(),
      paymentMethod: PaymentMethod.MMT,
      phoneNumber: "",
      userId: profile?.id,
      purchaseDate: new Date().toISOString(),
    },
  })

  const phoneRef = useRef<PhoneInput>(null)
  const methods = [PaymentMethod.MMT, PaymentMethod.CARD, PaymentMethod.CASH]

  useEffect(() => {
    if (items.length === 0) {
      navigation.goBack()
    }
  }, [items, navigation])

  const handlePurchase = async (data: z.infer<typeof purchaseSchema>) => {
    try {
      await createPurchase(data)
      resetCart()
      navigation.goBack()
    } catch (err) {
      const error = err as Error
      Alert.alert("Error", error.message)
    }
  }

  return (
    <Screen
      style={$root}
      contentContainerStyle={$container}
      safeAreaEdges={["bottom"]}
      preset="scroll"
      statusBarStyle={Platform.OS === "ios" ? "dark" : "light"}
    >
      <View
        style={{
          marginTop: spacing.lg,
        }}
      >
        <View
          style={{
            marginBottom: spacing.lg,
          }}
        >
          <Text size="lg" weight="semiBold">
            Ready to purchase your books?{" "}
          </Text>
          <Text
            style={{
              marginTop: spacing.md,
            }}
          >
            Enter your phone number and payment method to complete your purchase.
          </Text>
        </View>

        <View>
          <Text
            style={{
              marginBottom: spacing.md,
            }}
          >
            Phone Number{" "}
            <Text
              style={{
                color: colors.palette.angry500,
              }}
            >
              *
            </Text>
          </Text>
          <PhoneInput
            ref={phoneRef}
            initialCountry="so"
            style={$phoneInput}
            onChangePhoneNumber={(number) => {
              form.setValue("phoneNumber", number)
            }}
            textStyle={{
              fontSize: spacing.md,

              color: colors.text,
            }}
          />

          <Text
            style={{
              marginVertical: spacing.xs,
              color: colors.palette.angry500,
            }}
          >
            {form.formState.errors.phoneNumber?.message}
          </Text>
        </View>

        <View
          style={{
            marginTop: spacing.md,
          }}
        >
          <Text
            style={{
              marginBottom: spacing.xs,
            }}
          >
            Payment Method{" "}
            <Text
              style={{
                color: colors.palette.angry500,
              }}
            >
              *
            </Text>
          </Text>

          {methods.map((method) => (
            <TouchableOpacity
              key={method}
              style={{
                ...rowCenterSpaceBetween,
                marginTop: spacing.md,
                backgroundColor: colors.palette.neutral50,
                borderRadius: 4,
                padding: spacing.sm,
              }}
              onPress={() => {
                form.setValue("paymentMethod", method)
              }}
            >
              <Text
                style={{
                  flex: 1,
                }}
              >
                {method}
              </Text>
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  padding: 2,
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,

                    backgroundColor:
                      form.watch("paymentMethod") === method
                        ? colors.palette.neutral900
                        : "transparent",
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            rowCenterSpaceBetween,
            {
              marginTop: spacing.lg,
            },
          ]}
        >
          <Text>Total Amount </Text>
          <Text size="lg" weight="medium" text={formatCurrency(getTotals())} />
        </View>
      </View>

      <View style={[flex, columnRight]}>
        <Button
          preset="reversed"
          onPress={form.handleSubmit(handlePurchase)}
          loading={status === "pending"}
        >
          Purchase
        </Button>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $container: ViewStyle = { flexGrow: 1 }

const $phoneInput: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.neutral200,
  borderRadius: 4,
  height: 50,

  paddingHorizontal: spacing.sm,
}
