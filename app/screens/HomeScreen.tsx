import React, { FC, useCallback } from "react"
import { View } from "react-native"
import { TabScreenProps } from "app/navigators"
import { BooksList, GenreList, Icon, Screen, Text } from "app/components"
import { flex, rowCenterSpaceBetween } from "app/theme/globalStyles"
import { colors, spacing } from "app/theme"
import { useBookStore } from "app/models/book.store"
import { useGenreStore } from "app/models/genre.store"
import { useFocusEffect } from "@react-navigation/native"
import { useAuthStore } from "app/models"

interface HomeScreenProps extends TabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen(_props) {
  // Pull in navigation via props
  const { navigation } = _props
  const { fetchBooks, books, status } = useBookStore()
  const { fetchGenres, genres, status: genreStatus } = useGenreStore()
  const { getMe, logout } = useAuthStore()

  useFocusEffect(
    useCallback(() => {
      getMe()
        ?.then(() => {
          fetchBooks({
            page: 1,
            limit: 5,
          })?.then(() => {
            fetchGenres()
          })
        })
        .catch((err) => {
          if (err.kind === "unauthorized" || err.kind === "forbidden") {
            logout()
          }
        })
    }, []),
  )

  return (
    <Screen
      style={[
        flex,
        {
          paddingHorizontal: spacing.md,
        },
      ]}
      preset="auto"
    >
      <View style={flex}>
        <BooksList status={status} books={books && books?.data} align="horizontal" />
      </View>

      <GenreList status={genreStatus} genres={genres} />

      <View
        style={{
          marginTop: spacing.md,
        }}
      >
        <View style={rowCenterSpaceBetween}>
          <Text preset="bold" size="lg">
            Recommended Books
          </Text>

          <Icon
            svgIcon="arrowLeft"
            size={30}
            color={colors.tint}
            onPress={() => navigation.navigate("Books")}
          />
        </View>
        <View style={flex}>
          <BooksList status={status} books={books && books.data} align="horizontal" />
        </View>
      </View>
    </Screen>
  )
}
