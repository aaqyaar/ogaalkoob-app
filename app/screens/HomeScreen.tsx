import React, { FC, useCallback } from "react"
import { View } from "react-native"
import { TabScreenProps } from "app/navigators"
import { BooksList, GenreList, Icon, Screen, Text } from "app/components"
import { flex, rowCenterSpaceBetween } from "app/theme/globalStyles"
import { colors, spacing } from "app/theme"
import { useBookStore } from "app/models/book.store"
import { useGenreStore } from "app/models/genre.store"
import { useFocusEffect } from "@react-navigation/native"

interface HomeScreenProps extends TabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen(_props) {
  // Pull in navigation via props
  const { navigation } = _props
  const { fetchBooks, books, status } = useBookStore()
  const { fetchGenres, genres, status: genreStatus } = useGenreStore()

  useFocusEffect(
    useCallback(() => {
      fetchBooks({
        page: 1,
        limit: 50,
      })?.then(() => {
        fetchGenres()
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
        <BooksList status={status} books={books && books?.data.slice(0, 5)} align="horizontal" />
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
          <BooksList status={status} books={books && books.data.slice(5, 10)} align="horizontal" />
        </View>
      </View>
    </Screen>
  )
}
