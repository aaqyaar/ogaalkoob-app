import React from "react"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { colors, spacing } from "app/theme"
import { $genreCard } from "./Genre/styles"

type SkeletonLoadingType = "book" | "genre" | "bookDetail" | "cover"

export function SkeletonLoading({ type }: { type: SkeletonLoadingType }) {
  switch (type) {
    case "book":
      return <BookSkeletonLoading />
    case "genre":
      return <GenreSkeletonLoading />
    case "bookDetail":
      return <BookDetailSkeletonLoading />
    case "cover":
      return <CoverSkeletonLoading />
    default:
      return <BookSkeletonLoading />
  }
}

function BookSkeletonLoading() {
  return (
    <SkeletonPlaceholder backgroundColor={"#f5f5f5"} highlightColor={colors.palette.neutral50}>
      <SkeletonPlaceholder.Item width={190}>
        <SkeletonPlaceholder.Item height={260} borderRadius={13.5} />

        <SkeletonPlaceholder.Item
          width={180}
          alignSelf="center"
          height={5}
          borderRadius={0}
          marginTop={spacing.sm}
        />

        <SkeletonPlaceholder.Item
          width={180}
          justifyContent="space-between"
          flexDirection="row"
          alignSelf="center"
          alignItems="center"
          gap={10}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={5}
            borderRadius={0}
            marginTop={spacing.xs}
          />
          <SkeletonPlaceholder.Item width={25} height={5} borderRadius={0} marginTop={spacing.xs} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

function GenreSkeletonLoading() {
  return (
    <SkeletonPlaceholder backgroundColor={"#f5f5f5"} highlightColor={colors.palette.neutral50}>
      <SkeletonPlaceholder.Item width={90}>
        <SkeletonPlaceholder.Item height={40} borderRadius={spacing.xs} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

function CoverSkeletonLoading() {
  return (
    <SkeletonPlaceholder backgroundColor={"#f5f5f5"} highlightColor={colors.palette.neutral50}>
      <SkeletonPlaceholder.Item width={190}>
        <SkeletonPlaceholder.Item height={260} borderRadius={13.5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

function BookDetailSkeletonLoading() {
  return (
    <SkeletonPlaceholder backgroundColor={"#f5f5f5"} highlightColor={colors.palette.neutral50}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={270}
          alignSelf="center"
          alignItems="center"
          height={350}
          borderRadius={0}
          marginTop={spacing.sm}
        />

        <SkeletonPlaceholder.Item flex={1} paddingVertical={spacing.md}>
          <SkeletonPlaceholder.Item
            marginTop={spacing.lg}
            height={8}
            width={200}
            borderRadius={5}
            marginLeft={spacing.sm}
          />

          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop={spacing.xl}
            paddingHorizontal={spacing.sm}
          >
            <SkeletonPlaceholder.Item height={5} width={150} borderRadius={5} />

            <SkeletonPlaceholder.Item style={$genreCard} height={50} width={50} borderRadius={5} />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop={spacing.xxl}
            paddingHorizontal={spacing.sm}
          >
            <SkeletonPlaceholder.Item height={5} width={150} borderRadius={5} />
            <SkeletonPlaceholder.Item height={5} width={150} borderRadius={5} />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item
            width={"auto"}
            height={60}
            borderRadius={100}
            marginTop={spacing.xxl + 2}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}
