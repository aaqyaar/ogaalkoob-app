import React, { FC } from "react"
import { View, SectionList, Image } from "react-native"
import { TabScreenProps } from "app/navigators"
import { Screen, Text, Button } from "app/components"
import { flex } from "app/theme/globalStyles"
import SoundPlayer from "react-native-sound-player"
import { spacing } from "app/theme"

interface HomeScreenProps extends TabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen(_props) {
  // Pull in navigation via props
  const { navigation } = _props

  // useHeader(
  //   {
  //     rightTx: "common.logOut",
  //     onRightPress: logout,
  //     RightActionComponent: (
  //       <Icon
  //         svgIcon={"search"}
  //         size={20}
  //         color="#000"
  //         onPress={() => console.log("search")}
  //         containerStyle={{ marginRight: spacing.sm }}
  //       />
  //     ),
  //     leftText: "Ogaalkoob",
  //   },

  //   [logout],
  // )

  const playSound = () => {
    try {
      SoundPlayer.playUrl(
        "https://pub-c49d4c6084bd4825a730310681ab39d5.r2.dev/rnr280-final-1700751504800.mp3",
      )
      // or play from url
      // SoundPlayer.playUrl('https://example.com/music.mp3')
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }

  return (
    <Screen
      style={[
        flex,
        {
          paddingHorizontal: spacing.md,
        },
      ]}
      preset="scroll"
    >
      <View style={flex}>
        <SectionList
          sections={[
            { title: "D", data: ["Devin", "Dan", "Dominic"] },
            {
              title: "J",
              data: ["Jackson", "James", "Jillian", "Jimmy", "Joel", "John", "Julie"],
            },
          ]}
          renderItem={({ item }) => <Text>{item}</Text>}
          renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Image
        source={{
          uri: "https://pub-c49d4c6084bd4825a730310681ab39d5.r2.dev/Abdi-1700747471286.jpeg",
        }}
        width={100}
        height={100}
      />

      <Button
        onPress={() => {
          // navigation.navigate("Details", { name: "Jane" })
          playSound()
        }}
      >
        Play
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("BookView", {
            pdfUrl:
              "https://pub-c49d4c6084bd4825a730310681ab39d5.r2.dev/IJIEEB-V13-N5-5-1700753215560.pdf",
            bookName: "Rich Dad Poor Dad",
          })
        }}
      >
        Read the book
      </Button>
    </Screen>
  )
}
