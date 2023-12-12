import React, { memo, useCallback } from "react"
import { View, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from "react-native"
import { Image } from "@rneui/themed"
import { SkeletonLoading, Text } from "app/components"
import { rowCenterSpaceBetween } from "app/theme/globalStyles"
import { spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { formatCurrency } from "app/utils/formatCurrency"
import { StoreStatus } from "app/models"
import { Book } from "types"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "app/navigators"
import { $bookAuthor, $bookCard, $bookCover, $bookTitle, $booksContainer } from "./styles"
import { ViewStyle } from "react-native-phone-input"

interface BooksListProps<T> {
  books: Book[] | null
  status: StoreStatus
  align: "vertical" | "horizontal"
  canPullToRefresh?: boolean
  onEndReached?: () => void
  refreshFn?: () => Promise<T>
}

export const BooksList = memo(function BooksList<T>(props: BooksListProps<T>) {
  const { books, status, align = "horizontal", onEndReached, refreshFn } = props
  const [refreshing, setRefreshing] = React.useState(false)

  const { navigate } = useNavigation() as AppStackScreenProps<"Book">["navigation"]

  const renderBookItem = ({ item }: { item: Book }) => {
    return status !== "done" ? (
      <View style={$booksContainer}>
        <SkeletonLoading type="book" />
      </View>
    ) : (
      <View
        key={item.id}
        style={{
          marginTop: spacing.md,
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("Book", { bookId: item.id, bookName: item.title })}
          key={item.id}
          style={$bookCard}
        >
          <Image
            source={{
              uri: item.photos[0],
            }}
            style={$bookCover}
            PlaceholderContent={<SkeletonLoading type="cover" />}
          />
          <Text style={$bookTitle}>
            {item.title.length > 23 ? `${item.title.substring(0, 23)}...` : item.title}
          </Text>
          <View style={rowCenterSpaceBetween}>
            <Text style={$bookAuthor}>{item.author}</Text>
            <Text preset="bold" style={$bookAuthor}>
              {formatCurrency(item.price)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderBooksInTwoColumns = () => {
    return (
      <View style={$rowWrapper}>
        {books?.map((book) => {
          return (
            <View style={$width} key={book.id}>
              {renderBookItem({ item: book })}
            </View>
          )
        })}
      </View>
    )
  }

  const numColumns = align === "vertical" ? 2 : 1

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refreshFn &&
      refreshFn()
        .then(() => {
          setRefreshing(false)
        })
        .catch(() => {
          setRefreshing(false)
        })
  }, [refreshing])

  return align === "horizontal" ? (
    <FlashList
      data={books}
      estimatedItemSize={20}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      horizontal={align === "horizontal"}
      renderItem={renderBookItem}
      numColumns={numColumns}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        return status === "pending" ? <ActivityIndicator /> : null
      }}
    />
  ) : (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: spacing.sm,
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScroll={onEndReached}
    >
      {renderBooksInTwoColumns()}
    </ScrollView>
  )
})

const $rowWrapper: ViewStyle = { flexDirection: "row", flexWrap: "wrap" }
const $width: ViewStyle = { width: "50%" }
