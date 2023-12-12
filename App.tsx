import App from "./app/app"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import TrackPlayer from "react-native-track-player"

SplashScreen.preventAutoHideAsync()

function Index() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

TrackPlayer.registerPlaybackService(() => require("./service.js"))

export default Index
