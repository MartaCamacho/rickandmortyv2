import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"

const episodesListLogo = require("@assets/images/rick_and_morty_title.png")

const EpisodesListHeader: FC = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($topContainer)}>
      <Image style={themed($episodesListLogo)} source={episodesListLogo} resizeMode="contain" />
      <Text style={themed($episodesListHeading)} tx="episodes:title" preset="heading" />
      <Text style={themed($episodesListSubheading)} tx="episodes:subtitle" preset="heading" />
    </View>
  )
}

export default EpisodesListHeader

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xl,
})

const $episodesListLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 200,
  width: "100%",
  marginBottom: spacing.xxxs,
})

const $episodesListHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $episodesListSubheading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 16,
  marginBottom: spacing.md,
})
