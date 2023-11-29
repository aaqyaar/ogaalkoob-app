import React, { memo, useCallback } from "react"
import { View, TouchableOpacity } from "react-native"
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
import {
  $bookAuthor,
  $bookCard,
  $bookCover,
  $bookTitle,
  $booksContainer,
  $verticalList,
} from "./styles"
import { useBookStore } from "app/models/book.store"

interface BooksListProps {
  books: Book[] | null
  status: StoreStatus
  align: "vertical" | "horizontal"
  canPullToRefresh?: boolean
}

export const BooksList = memo(function BooksList(props: BooksListProps) {
  const { books, status, align = "horizontal", canPullToRefresh = false } = props
  const { fetchBooks } = useBookStore()
  const [refreshing, setRefreshing] = React.useState(false)

  const { navigate } = useNavigation() as AppStackScreenProps<"Book">["navigation"]

  const renderBookItem = ({ item }: { item: Book }) => {
    return status !== "done" ? (
      <View style={$booksContainer}>
        <SkeletonLoading type="book" />
      </View>
    ) : (
      <View
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

  const numColumns = align === "vertical" ? 2 : 1

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    fetchBooks({
      page: 1,
      limit: 50,
    })
      .then(() => {
        setRefreshing(false)
      })
      .catch(() => {
        setRefreshing(false)
      })
  }, [])

  return (
    <FlashList
      data={books}
      estimatedItemSize={20}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={align === "vertical"}
      keyExtractor={(item) => item.id}
      horizontal={align === "horizontal"}
      renderItem={renderBookItem}
      numColumns={numColumns}
      onEndReached={() => console.log("end reached")}
      refreshing={canPullToRefresh && refreshing}
      onRefresh={() => canPullToRefresh && handleRefresh()}
      contentContainerStyle={align === "vertical" ? ($verticalList as any) : null}
    />
  )
})
