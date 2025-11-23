import { FC } from "react"
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import Animated, { FadeInUp } from "react-native-reanimated"

import { Episode } from "types/episode.types"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useEpisode } from "@/hooks/useEpisode"
import { AppStackParamList } from "@/navigators/navigationTypes"
import { navigate } from "@/navigators/navigationUtilities"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

import { iconRegistry } from "../Icon"

type EpisodeDetailRoute = RouteProp<AppStackParamList, "EpisodeDetails">

const EpisodeDetails: FC = () => {
  const route = useRoute<EpisodeDetailRoute>()
  const { themed } = useAppTheme()
  const { id } = route.params

  const { data, isLoading, isError } = useEpisode(id)

  if (isLoading) return <ActivityIndicator size="large" style={themed($center)} />
  if (isError || !data) return <Text text="Error loading episode details 😢" preset="subheading" />

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <BackButton />
      <Text text={data.name} preset="heading" style={themed($title)} />

      <Text text={`Air Date: ${data.air_date}`} preset="subheading" />
      <Text text={`Episode: ${data.episode}`} preset="subheading" style={themed($mb)} />

      <Text text="Characters" preset="heading" style={themed($sectionTitle)} />

      <CharactersList data={data} />
    </Screen>
  )
}
export default EpisodeDetails

const BackButton = () => {
  const { themed } = useAppTheme()
  return (
    <Pressable
      onPress={() => {
        navigate("EpisodesList")
      }}
    >
      <Image style={themed($backButton)} source={iconRegistry.back} />
    </Pressable>
  )
}

const CharactersList = ({ data }: { data: Episode }) => {
  const { themed } = useAppTheme()
  return (
    <FlatList
      data={data.characters}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInUp.duration(1000).delay(index * 50)}>
          <View style={themed($characterCard)}>
            <Image source={{ uri: item.image }} style={themed($avatar)} />
            <View style={themed($info)}>
              <Text text={item.name} preset="subheading" style={themed($cardTitle)} />
              <Text
                text={`Status: ${item.status}`}
                preset="default"
                style={themed($cardDescription)}
              />
            </View>
          </View>
        </Animated.View>
      )}
      ItemSeparatorComponent={() => <View style={themed($separator)} />}
      scrollEnabled={false}
    />
  )
}

const $avatar: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  borderRadius: 8,
  height: 60,
  width: 60,
  marginRight: spacing.md,
})

const $backButton: ThemedStyle<ImageStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.tint,
  borderRadius: 6,
  height: 30,
  width: 30,
  padding: spacing.xs,
  marginBottom: spacing.md,
})

const $cardDescription: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $cardTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $center: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
})

const $characterCard: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral100,
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 8,
  padding: spacing.md,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  maxWidth: 500,
  alignSelf: "center",
  padding: spacing.xl,
})

const $info: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $mb: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $sectionTitle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  marginTop: spacing.lg,
})

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $separator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.sm,
})
