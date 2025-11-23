import { View } from "react-native"

import EpisodeDetails from "@/components/EpisodeDetails/EpisodeDetails"
import { Screen } from "@/components/Screen"
import { useAppTheme } from "@/theme/context"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const EpisodeDetailsScreen = () => {
  const { themed } = useAppTheme()
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  return (
    <Screen preset="scroll" safeAreaEdges={["bottom"]}>
      <View style={themed([$bottomContainerInsets, { flex: 2 }])}>
        <EpisodeDetails />
      </View>
    </Screen>
  )
}

export default EpisodeDetailsScreen
