import { FC } from "react"
import { View, ViewStyle } from "react-native"

import EpisodesList from "@/components/EpisodesList/EpisodesList"
import EpisodesListHeader from "@/components/EpisodesList/EpisodesListHeader"
import { Screen } from "@/components/Screen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const EpisodesListScreen: FC = () => {
  const { themed } = useAppTheme()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={themed($topSection)}>
      <View style={themed([$bottomContainerInsets, { flex: 2 }])}>
        <EpisodesListHeader />
        <View style={themed([$bottomContainerInsets])}>
          <EpisodesList />
        </View>
      </View>
    </Screen>
  )
}

export default EpisodesListScreen

const $topSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  maxWidth: 500,
  alignSelf: "center",
})
