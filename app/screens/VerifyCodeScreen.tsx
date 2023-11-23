import React, { FC } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Divider, Screen, Text } from "app/components"
import { VerifyCodeSchema } from "app/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { spacing } from "app/theme"
import { columnRight, flex } from "app/theme/globalStyles"
import { useAuthStore } from "app/models"
import {
  useBlurOnFulfill,
  useClearByFocusCell,
  CodeField,
  Cursor,
} from "react-native-confirmation-code-field"

interface VerifyCodeScreenProps extends AppStackScreenProps<"VerifyCode"> {}

const CELL_COUNT = 6

export const VerifyCodeScreen: FC<VerifyCodeScreenProps> = function VerifyCodeScreen(_props) {
  // Pull in navigation via _props
  const { navigation, route } = _props

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof VerifyCodeSchema>>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      code: "",
    },
  })

  const value = getValues("code")

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: (value) => {
      setValue("code", value)
    },
  })

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  })
  const { verifyCode, status, setStatus } = useAuthStore()

  function handleVerifyCode(data: z.infer<typeof VerifyCodeSchema>) {
    verifyCode(data.code, route.params.email)
      .then((res) => {
        if (res) {
          navigation.navigate("ResetPassword", {
            userId: res.userId,
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
        tx="verifyCodeScreen.verifyCode"
        preset="heading"
        style={$signIn}
      />
      <Text
        tx="verifyCodeScreen.enterDetails"
        txOptions={{ email: route.params.email }}
        preset="default"
        style={$enterDetails}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <CodeField
            ref={ref}
            {...props}
            value={field.value}
            onChangeText={field.onChange}
            cellCount={CELL_COUNT}
            rootStyle={[$codeFieldRoot]}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                style={[
                  $cell,
                  isFocused && $focusCell,
                  errors.code?.message !== undefined && $errorCell,
                ]}
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={$cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
              </View>
            )}
          />
        )}
        name="code"
        rules={{ required: true }}
      />

      <View style={[flex, columnRight]}>
        <Divider />
        <Button
          loading={status === "pending"}
          testID="login-button"
          tx="verifyCodeScreen.tapToVerify"
          style={$tapButton}
          preset="reversed"
          onPress={handleSubmit(handleVerifyCode)}
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

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $codeFieldRoot: ViewStyle = { marginTop: 20 }

const $cell: TextStyle = {
  width: 40,
  height: 40,
  borderBottomWidth: 1,
  borderBottomColor: "#00000030",
}

const $cellText: TextStyle = {
  fontSize: 24,
  lineHeight: 38,
  textAlign: "center",
}

const $errorCell: ViewStyle = {
  borderBottomColor: "#f87171",
}

const $focusCell: ViewStyle = {
  borderBottomColor: "#000",
}
