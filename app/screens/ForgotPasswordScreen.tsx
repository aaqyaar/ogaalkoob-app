import React, { FC } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Divider, Screen, Text, TextField } from "app/components"
import { ForgotPasswordSchema } from "app/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { spacing } from "app/theme"
import { columnRight, flex } from "app/theme/globalStyles"
import { useAuthStore } from "app/models"

interface ForgotPasswordScreenProps extends AppStackScreenProps<"ForgotPassword"> {}

export const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = function ForgotPasswordScreen(
  _props,
) {
  // Pull in navigation via _props
  const { navigation } = _props

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "abdizamedmo@gmail.com",
    },
  })

  const { forgotPassword, status, setStatus } = useAuthStore()

  function handleResetPassword(data: z.infer<typeof ForgotPasswordSchema>) {
    forgotPassword(data.email)
      .then((res) => {
        if (res) {
          navigation.navigate("VerifyCode", {
            email: data.email,
          })
        }
      })
      .catch((err) => {
        setStatus("fail")
        const error = err

        if (Object.prototype.hasOwnProperty.call(error, "message")) {
          Alert.alert("Error", error.message)
        }
      })
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["bottom"]}
    >
      <Text
        testID="login-heading"
        tx="forgotPasswordScreen.forgotPassword"
        preset="heading"
        style={$signIn}
      />
      <Text tx="forgotPasswordScreen.enterDetails" preset="default" style={$enterDetails} />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            labelTx="forgotPasswordScreen.emailFieldLabel"
            placeholderTx="forgotPasswordScreen.emailFieldPlaceholder"
            helper={errors.email?.message}
            status={errors.email?.message ? "error" : undefined}
          />
        )}
        name="email"
        rules={{ required: true }}
      />

      <View style={[flex, columnRight]}>
        <Divider />
        <Button
          loading={status === "pending"}
          testID="login-button"
          tx="forgotPasswordScreen.tapToReset"
          style={$tapButton}
          preset="reversed"
          onPress={handleSubmit(handleResetPassword)}
        />
      </View>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  paddingTop: spacing.xl,
  paddingBottom: spacing.lg,
  paddingHorizontal: spacing.lg,
  flex: 1,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
