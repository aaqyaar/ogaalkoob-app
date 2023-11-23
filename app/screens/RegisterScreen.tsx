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
import { columnRight, flex } from "app/theme/globalStyles"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { RegisterSchema } from "app/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = function RegisterScreen(_props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "Abdi Zamed",
      email: "abdizamedmo@gmail.com",
      password: "123456",
    },
  })

  const authPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const { register, status, setStatus } = useAuthStore()

  function handleSignIn(data: z.infer<typeof RegisterSchema>) {
    register(data.name, data.email, data.password)
      .then((res) => {
        if (res.token) {
          Alert.alert("Success", "Register Success")
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
        testID="register-heading"
        tx="registerScreen.register"
        preset="heading"
        style={$signIn}
      />
      <Text tx="registerScreen.enterDetails" preset="default" style={$enterDetails} />

      <View style={$container}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect={false}
              keyboardType="default"
              labelTx="registerScreen.nameFieldLabel"
              placeholderTx="registerScreen.nameFieldPlaceholder"
              helper={errors.name?.message}
              status={errors.name?.message ? "error" : undefined}
            />
          )}
          name="name"
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
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="registerScreen.emailFieldLabel"
              placeholderTx="registerScreen.emailFieldPlaceholder"
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
              labelTx="registerScreen.passwordFieldLabel"
              placeholderTx="registerScreen.passwordFieldPlaceholder"
              onSubmitEditing={handleSubmit(handleSignIn)}
              RightAccessory={PasswordRightAccessory}
              helper={errors.password?.message}
              status={errors.password?.message ? "error" : undefined}
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        <View style={[flex, columnRight]}>
          <Divider />
          <Button
            loading={status === "pending"}
            testID="register-button"
            tx="registerScreen.tapToRegister"
            style={$tapButton}
            preset="reversed"
            onPress={handleSubmit(handleSignIn)}
          />
        </View>
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

const $container: ViewStyle = {
  flexGrow: 1,
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
