import React, { memo } from "react"
import { TouchableOpacity, View } from "react-native"
import { Icon, SkeletonLoading, Text } from "app/components"
import { rowCenterSpaceBetween } from "app/theme/globalStyles"
import { colors, spacing } from "app/theme"
import { FlashList } from "@shopify/flash-list"
import { Genre } from "types"
import { StoreStatus } from "app/models"
import { $genreCard, $genreContainer } from "./styles"

interface GenreListProps {
  genres: Genre[] | null
  status: StoreStatus
}

export const GenreList = memo(function GenreList(props: GenreListProps) {
  const { genres, status } = props
  return (
    <View
      style={{
        marginTop: spacing.lg,
      }}
    >
      <View style={rowCenterSpaceBetween}>
        <Text preset="bold" size="lg">
          Explore by Genre
        </Text>

        <Icon
          svgIcon="arrowLeft"
          size={30}
          color={colors.tint}
          onPress={() => console.log("hello")}
        />
      </View>
      <FlashList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={200}
        data={genres}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={$genreContainer}>
            {status === "pending" ? (
              <SkeletonLoading type="genre" />
            ) : (
              <TouchableOpacity key={item.id} style={$genreCard}>
                <Text size="md">{item.name}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  )
})
