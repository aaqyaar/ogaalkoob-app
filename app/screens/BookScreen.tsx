import React, { FC, useEffect } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, SkeletonLoading, Text } from "app/components"
import { useBookStore } from "app/models/book.store"
import { colors, spacing } from "app/theme"
import { flex, rowCenterSpaceBetween } from "app/theme/globalStyles"
import { $genreCard } from "app/components/Genre/styles"
import { fDate } from "app/utils/formatDate"
import { formatCurrency } from "app/utils/formatCurrency"
import { Book } from "types"

interface BookScreenProps extends AppStackScreenProps<"Book"> {}

export const BookScreen: FC<BookScreenProps> = function BookScreen(_props) {
  // Pull in navigation via props
  const { navigation, route } = _props

  const { status, fetchBook } = useBookStore()

  const [book, setBook] = React.useState<Book | null>(null)

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.bookName,
    })

    if (route.params?.bookId) {
      fetchBook(route.params?.bookId)
        .then((book) => {
          setBook(book)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [route.params?.bookId])
  console.log(book)
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
                  <Image source={{ uri: book?.photos[0] || undefined }} style={$bookCover} />
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
            <Button
              preset="reversed"
              style={{
                marginTop: spacing.md,
              }}
            >
              Buy Now for {formatCurrency(status === "done" ? (book?.price as number) : 0)}
            </Button>
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
