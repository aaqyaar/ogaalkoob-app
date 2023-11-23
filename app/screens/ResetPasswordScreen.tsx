import React, { ComponentType, FC, useMemo, useState } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Divider,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useAuthStore } from "app/models"
import { columnRight, flex } from "app/theme/globalStyles"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { ResetPasswordSchema } from "app/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"

interface ResetPasswordScreenProps extends AppStackScreenProps<"ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = function ResetPasswordScreen(
  _props,
) {
  const { navigation, route } = _props
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "123456",
      confirmPassword: "12345",
    },
  })

  console.log(errors)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const { resetPassword, status, setStatus } = useAuthStore()

  function handleResetPassword(data: z.infer<typeof ResetPasswordSchema>) {
    resetPassword(data.password, route.params.userId)
      .then((res) => {
        if (res) {
          navigation.navigate("Login")
        }
      })
      .catch((err) => {
        setStatus("fail")

        const error = err

        if (Object.prototype.hasOwnProperty.call(error, "message")) {
          Alert.alert("Error", error?.message)
        }
      })
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.primary500}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["bottom"]}
    >
      <Text
        testID="resetPassword-heading"
        tx="resetPasswordScreen.resetPassword"
        preset="heading"
        style={$signIn}
      />
      <Text tx="resetPasswordScreen.enterDetails" preset="default" style={$enterDetails} />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            labelTx="resetPasswordScreen.passwordFieldLabel"
            placeholderTx="resetPasswordScreen.passwordFieldPlaceholder"
            onSubmitEditing={handleSubmit(handleResetPassword)}
            RightAccessory={PasswordRightAccessory}
            helper={errors.password?.message}
            status={errors.password?.message ? "error" : undefined}
          />
        )}
        name="password"
        rules={{ required: true }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            labelTx="resetPasswordScreen.confirmPasswordFieldLabel"
            placeholderTx="resetPasswordScreen.passwordFieldPlaceholder"
            onSubmitEditing={handleSubmit(handleResetPassword)}
            RightAccessory={PasswordRightAccessory}
            helper={errors.confirmPassword?.message}
            status={errors.confirmPassword?.message ? "error" : undefined}
          />
        )}
        name="confirmPassword"
        rules={{ required: true }}
      />

      <View style={[flex, columnRight]}>
        <Divider />
        <Button
          loading={status === "pending"}
          testID="resetPassword-button"
          tx="resetPasswordScreen.tapToReset"
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
