import { FC } from "react"
import { ActivityIndicator, FlatList, View, ViewStyle } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"

import EpisodeItem from "@/components/EpisodesList/EpisodesListItem"
import { Text } from "@/components/Text"
import { useEpisodes } from "@/hooks/useEpisodes"
import { navigate } from "@/navigators/navigationUtilities"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import { ThemedStyle } from "@/theme/types"

const EpisodesList: FC = () => {
  const { data, isLoading, isError } = useEpisodes()
  const { themed } = useAppTheme()

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  if (isError) {
    return <Text text="Error loading episodes 😢" preset="subheading" />
  }

  const episodes = data ?? []

  if (episodes.length > 0)
    return (
      <FlatList
        data={episodes}
        keyExtractor={(episode) => String(episode.id)}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.duration(1000).delay(index * 50)}>
            <View style={themed($episode)}>
              <EpisodeItem
                name={item?.name}
                airDate={item?.air_date}
                episodeCode={item?.episode}
                onPress={() => {
                  navigate("EpisodeDetails", { id: item?.id })
                }}
              />
            </View>
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        scrollEnabled={false}
      />
    )

  return <Text text="There are no episodes to show 😢" preset="subheading" />
}

export default EpisodesList

const $episode: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})
