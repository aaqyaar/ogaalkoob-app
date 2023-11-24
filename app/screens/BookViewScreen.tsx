import React, { FC, useEffect } from "react"
import { Dimensions, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import Pdf from "react-native-pdf"

interface BookViewScreenProps extends AppStackScreenProps<"BookView"> {}

export const BookViewScreen: FC<BookViewScreenProps> = function BookViewScreen(_props) {
  // Pull in navigation via props
  const { route, navigation } = _props

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.bookName,
    })
  })

  return (
    <Pdf
      trustAllCerts={false}
      source={{
        uri: route.params.pdfUrl,
        cache: true,
      }}
      onLoadComplete={(numberOfPages) => {
        console.log(`Number of pages: ${numberOfPages}`)
      }}
      onPageChanged={(page) => {
        console.log(`Current page: ${page}`)
      }}
      onError={(error) => {
        console.log(error)
      }}
      onPressLink={(uri) => {
        console.log(`Link pressed: ${uri}`)
      }}
      style={$pdfContainer}
    />
  )
}

const $pdfContainer: ViewStyle = {
  flex: 1,
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
}
