import React, { FC, useEffect } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, SkeletonLoading, Text } from "app/components"
import { useBookStore } from "app/models/book.store"
import { colors, spacing } from "app/theme"
import { column, flex, rowCenterSpaceBetween } from "app/theme/globalStyles"
import { $genreCard } from "app/components/Genre/styles"
import { fDate } from "app/utils/formatDate"
import { formatCurrency } from "app/utils/formatCurrency"
import { Book } from "types"
import { useCartStore } from "app/models/cart.store"
import { Toast } from "toastify-react-native"
import { useAuthStore } from "app/models"
import { usePurchaseStore } from "app/models/purchase.store"

interface BookScreenProps extends AppStackScreenProps<"Book"> {}

export const BookScreen: FC<BookScreenProps> = function BookScreen(_props) {
  // Pull in navigation via props
  const { navigation, route } = _props

  const { status, fetchBook } = useBookStore()
  const { addItem, isInCart } = useCartStore()
  const { profile } = useAuthStore()

  const { isUserAlreadyPurchased } = usePurchaseStore()

  const books = profile?.purchases
    ? profile?.purchases?.map((purchase) => purchase.books).flat()
    : []

  const purchasedBook = books?.find((book) => book.id === route.params?.bookId)

  const [book, setBook] = React.useState<Book | null>(null)

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.bookName,
    })

    if (route.params?.bookId) {
      fetchBook(route.params?.bookId).then((book) => {
        setBook(book)
      })
    }
  }, [route.params?.bookId])

  function handleAddToCart() {
    if (book && !isInCart(book?.id as string)) {
      addItem(book)
      Toast.success("Added to cart")
    }
  }

  const handleReadPDF = (bookName: string, bookUrl: string) => {
    navigation.navigate("BookView", { bookName, pdfUrl: bookUrl })
  }

  const handlePlayAudio = (bookName: string, bookUrl: string, bookCover: string) => {
    navigation.navigate("PlayAudio", { bookName, audioUrl: bookUrl, bookCover })
  }

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["bottom"]}>
      {status === "pending" ? (
        <SkeletonLoading type="bookDetail" />
      ) : (
        <View>
          <View
            style={{
              paddingVertical: spacing.md,
            }}
          >
            <View style={flex}>
              <View style={flex}>
                {/* Image Section */}
                <View style={$bookContainer}>
                  {book !== null ? (
                    <Image source={{ uri: book?.photos[0] }} style={$bookCover} />
                  ) : (
                    <SkeletonLoading type="cover" />
                  )}
                </View>
              </View>
              <View style={[flex, { padding: spacing.md }]}>
                {/* Text Content Section */}
                <View style={flex}>
                  <Text
                    weight="semiBold"
                    size="lg"
                    selectable
                    style={{
                      marginTop: spacing.sm,
                    }}
                  >
                    {book?.title}
                  </Text>

                  <View style={rowCenterSpaceBetween}>
                    <Text
                      size="md"
                      style={{
                        marginTop: spacing.xxs,
                        color: colors.tint,
                      }}
                    >
                      {book?.author}
                    </Text>

                    <View
                      style={[
                        $genreCard,
                        {
                          marginTop: spacing.xxs,
                        },
                      ]}
                    >
                      <View>
                        {book?.genre.map(({ name, id }) => (
                          <Text size="sm" key={id}>
                            {name}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>

                  <View style={rowCenterSpaceBetween}>
                    <Text
                      size="sm"
                      style={{
                        marginTop: spacing.xs,
                      }}
                    >
                      Published at {fDate(book?.publishedDate as any)}
                    </Text>

                    <Text
                      size="sm"
                      style={{
                        marginTop: spacing.xs,
                      }}
                      selectable
                    >
                      ISBN {book?.isbn}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {isUserAlreadyPurchased(profile?.purchases, profile?.id, book?.id as string) ? (
              <View
                style={[
                  flex,
                  column,
                  {
                    gap: spacing.sm,
                  },
                ]}
              >
                <Button
                  preset="reversed"
                  onPress={() =>
                    handleReadPDF(book?.title as string, purchasedBook?.pdfUrl as string)
                  }
                >
                  Read The Book
                </Button>

                <Button
                  preset="text"
                  onPress={() =>
                    handlePlayAudio(
                      book?.title as string,
                      purchasedBook?.audioUrl as string,
                      purchasedBook?.photos[0] as string,
                    )
                  }
                >
                  or Play as Audio
                </Button>
              </View>
            ) : (
              <Button
                preset={isInCart(book?.id as string) ? "filled" : "reversed"}
                style={{
                  marginTop: spacing.md,
                }}
                onPress={handleAddToCart}
              >
                {isInCart(book?.id as string)
                  ? "Already in cart"
                  : `Buy Now for ${formatCurrency(
                      status === "done" ? (book?.price as number) : 0,
                    )}`}
              </Button>
            )}
          </View>
          <Text weight="semiBold" size="lg">
            About the book
          </Text>

          <Text
            size="sm"
            style={{
              marginTop: spacing.xs,
            }}
          >
            {book?.description}
          </Text>
        </View>
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $bookContainer: ViewStyle = {
  height: "50%",

  backgroundColor: "transparent",
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 17,
  },
  shadowOpacity: 0.25,
  shadowRadius: 18.97,
  elevation: 90, // Android
}

const $bookCover: ImageStyle = {
  width: 270,
  height: 350,
  alignSelf: "center",
  resizeMode: "stretch",
}
