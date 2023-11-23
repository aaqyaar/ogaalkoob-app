import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { Alert, TextInput, TextStyle, View, ViewStyle } from "react-native"
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
import { columnRight, flex, rowCenterSpaceBetween } from "app/theme/globalStyles"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { LoginSchema } from "app/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = function LoginScreen(_props) {
  const { navigation } = _props
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "abdizamedmo@gmail.com",
      password: "123456",
    },
  })

  const authPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const { login, status, setStatus } = useAuthStore()

  function handleSignIn(data: z.infer<typeof LoginSchema>) {
    login(data.email, data.password)
      .then()
      .catch((err) => {
        setStatus("fail")

        const error = err

        if (Object.prototype.hasOwnProperty.call(error, "message")) {
          Alert.alert("Error", error.message)
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
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="default" style={$enterDetails} />

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
            labelTx="loginScreen.emailFieldLabel"
            placeholderTx="loginScreen.emailFieldPlaceholder"
            helper={errors.email?.message}
            status={errors.email?.message ? "error" : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />
        )}
        name="email"
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
            labelTx="loginScreen.passwordFieldLabel"
            placeholderTx="loginScreen.passwordFieldPlaceholder"
            onSubmitEditing={handleSubmit(handleSignIn)}
            RightAccessory={PasswordRightAccessory}
            helper={errors.password?.message}
            status={errors.password?.message ? "error" : undefined}
          />
        )}
        name="password"
        rules={{ required: true }}
      />

      <View
        style={[
          rowCenterSpaceBetween,
          {
            marginTop: spacing.xl,
          },
        ]}
      >
        <Button
          testID="register-button"
          text="Create an Account"
          preset="text"
          onPress={() => navigation.navigate("Register")}
        />
        <Button
          testID="forgot-password-button"
          text="Forgot Password?"
          preset="text"
          onPress={() => navigation.navigate("ForgotPassword")}
        />
      </View>

      <View style={[flex, columnRight]}>
        <Divider />
        <Button
          loading={status === "pending"}
          testID="login-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={handleSubmit(handleSignIn)}
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
