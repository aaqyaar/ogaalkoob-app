import React, { FC, useCallback, useEffect } from "react"
import { ImageStyle, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { TabScreenProps } from "app/navigators"
import { BooksList, Icon, Screen, Text } from "app/components"
import { useBookStore } from "app/models/book.store"
import { colors, spacing } from "app/theme"
import { flex } from "app/theme/globalStyles"

interface BooksScreenProps extends TabScreenProps<"Books"> {}

export const BooksScreen: FC<BooksScreenProps> = function BooksScreen(_props) {
  // Pull in navigation via props
  // const { navigation } = _props

  const { books, status, fetchBooks } = useBookStore()
  const [page, setPage] = React.useState(1)
  const [search, setSearch] = React.useState("")

  const handleSearch = useCallback(
    (text: string) => {
      setSearch(text)
      fetchBooks({
        limit: 5,
        page: 1,
        query: text,
      })
    },
    [search],
  )

  useEffect(() => {
    fetchBooks({
      limit: 5,
      page,
    })
  }, [page])

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1)
  }, [page])

  return (
    <Screen style={flex} contentContainerStyle={$root} preset="fixed">
      <View style={$searchBarContainer}>
        <Icon svgIcon="search" size={24} color="#aaa" style={$searchIcon} />
        <TextInput
          placeholder="Search"
          returnKeyType="done"
          style={$searchInput}
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {search && (
        <View
          style={{
            marginTop: spacing.md,
            marginLeft: spacing.md,
          }}
        >
          <Text>{books?.data.length} Search Results</Text>
        </View>
      )}
      <BooksList
        status={status}
        books={books && books.data}
        align="vertical"
        canPullToRefresh={true}
        onEndReached={handleLoadMore}
        refreshFn={() =>
          fetchBooks({
            limit: 5,
            page,
          })
        }
      />
    </Screen>
  )
}

const $root: ViewStyle = {
  flexGrow: 1,
}

const $searchBarContainer: ViewStyle = {
  alignItems: "center",
  backgroundColor: colors.palette.neutral50,
  borderRadius: 25,
  marginHorizontal: spacing.md,
  marginTop: spacing.md,
  flexDirection: "row",
  marginVertical: spacing.sm,
  paddingHorizontal: spacing.md,
}
const $searchIcon: ImageStyle = {
  marginRight: spacing.sm,
}
const $searchInput: TextStyle = {
  marginLeft: spacing.xs,
  flex: 1,
  height: 50,
  color: "#333",
}
