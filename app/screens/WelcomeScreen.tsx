import { FC } from "react"
import { Image, ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { EpisodeList } from "@/components/EpisodesList/EpisodesList"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("@assets/images/rick_and_morty_title.png")

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed } = useAppTheme()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={themed($topSection)}>
      <ScrollView>
        <View style={themed($topContainer)}>
          <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
          <Text
            testID="welcome-heading"
            style={themed($welcomeHeading)}
            tx="episodes:title"
            preset="heading"
          />
          <Text
            testID="welcome-heading"
            style={themed($welcomeSubheading)}
            tx="episodes:subtitle"
            preset="heading"
          />
        </View>
        <View style={themed([$bottomContainerInsets, { flex: 2 }])}>
          <EpisodeList />
        </View>
      </ScrollView>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  flex: 1,
})

const $topSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  flex: 2,
})
const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 200,
  width: "100%",
  marginBottom: spacing.xxxs,
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $welcomeSubheading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 16,
  marginBottom: spacing.md,
})
