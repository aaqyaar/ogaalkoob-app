import React, { FC, useEffect } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, Screen, SkeletonLoading, Text } from "app/components"
import { useBookStore } from "app/models/book.store"
import { colors, spacing } from "app/theme"
import { column, flex, rowCenter } from "app/theme/globalStyles"

import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
  useProgress,
} from "react-native-track-player"
import Slider from "@react-native-community/slider"

interface PlayAudioScreenProps extends AppStackScreenProps<"PlayAudio"> {}

export const PlayAudioScreen: FC<PlayAudioScreenProps> = function PlayAudioScreen(_props) {
  // Pull in navigation via props
  const { navigation, route } = _props

  const [isPlaying, setIsPlaying] = React.useState(false)

  const { status } = useBookStore()

  const tracks = [
    {
      id: 1,
      url: route?.params.audioUrl,
      title: route?.params.bookName,
      artist: "Ogaalkoob Artwork",
    },
  ]

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      })
      await TrackPlayer.add(tracks as any)
    } catch (error) {}
  }

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.bookName,
    })

    setupPlayer()

    return () => {
      // TrackPlayer.destroy()
    }
  }, [])

  const { position, duration } = useProgress(1000)

  const handlePlay = () => {
    try {
      TrackPlayer.play()
      setIsPlaying(true)
      return
    } catch (error) {
      return error
    }
  }

  const handlePause = () => {
    try {
      TrackPlayer.pause()
      setIsPlaying(false)
      return
    } catch (error) {
      setIsPlaying(false)
      return error
    }
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
                  <Image source={{ uri: route.params.bookCover || undefined }} style={$bookCover} />
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
                    {route?.params?.bookName}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                flex,
                column,
                {
                  gap: spacing.sm,
                },
              ]}
            >
              <View
                style={[
                  rowCenter,
                  {
                    paddingTop: spacing.lg,
                    gap: spacing.xxl,
                  },
                ]}
              >
                <Icon
                  svgIcon="seekLeft"
                  size={45}
                  color={colors.palette.primary300}
                  onPress={() => {
                    TrackPlayer.seekTo(position - 30)
                  }}
                  disabled={position === 0}
                />
                {isPlaying ? (
                  <Icon
                    svgIcon="pause"
                    size={60}
                    color={colors.palette.primary500}
                    onPress={handlePause}
                  />
                ) : (
                  <Icon
                    svgIcon="play"
                    size={60}
                    color={colors.palette.primary500}
                    onPress={handlePlay}
                  />
                )}

                <Icon
                  svgIcon="seekRight"
                  size={45}
                  color={colors.palette.primary300}
                  onPress={() => {
                    TrackPlayer.seekTo(position + 30)
                  }}
                  disabled={position === duration}
                />
              </View>

              <Slider
                value={position}
                minimumValue={0}
                maximumValue={duration}
                onSlidingComplete={async (value) => {
                  await TrackPlayer.seekTo(value)
                }}
                maximumTrackTintColor={colors.palette.primary100}
                minimumTrackTintColor={colors.palette.primary500}
              />

              <Text
                size="md"
                style={{
                  textAlign: "center",
                  marginTop: spacing.xs,
                }}
              >
                {new Date(position * 1000).toISOString().substr(11, 8)}
              </Text>
            </View>
          </View>
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
