import { FC } from "react"
import { View, Image, FlatList, ActivityIndicator, StyleSheet, Pressable } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"

import { Episode } from "types/episode.types"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useEpisode } from "@/hooks/useEpisode"
import { AppStackParamList } from "@/navigators/navigationTypes"
import { navigate } from "@/navigators/navigationUtilities"
import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"

import { iconRegistry } from "../Icon"

type EpisodeDetailRoute = RouteProp<AppStackParamList, "EpisodeDetails">

const EpisodeDetails: FC = () => {
  const route = useRoute<EpisodeDetailRoute>()
  const { id } = route.params

  const { data, isLoading, isError } = useEpisode(id)

  if (isLoading) return <ActivityIndicator size="large" style={styles.center} />
  if (isError || !data) return <Text text="Error loading episode details 😢" preset="subheading" />

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <BackButton />
      <Text text={data.name} preset="heading" style={styles.title} />

      <Text text={`Air Date: ${data.air_date}`} preset="subheading" />
      <Text text={`Episode: ${data.episode}`} preset="subheading" style={styles.mb} />

      <Text text="Characters" preset="heading" style={styles.sectionTitle} />

      <CharactersList data={data} />
    </Screen>
  )
}
export default EpisodeDetails

const BackButton = () => {
  return (
    <Pressable
      onPress={() => {
        navigate("EpisodesList")
      }}
    >
      <Image style={styles.backButton} source={iconRegistry.back} />
    </Pressable>
  )
}

const CharactersList = ({ data }: { data: Episode }) => {
  return (
    <FlatList
      data={data.characters}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.characterCard}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <View style={styles.info}>
            <Text text={item.name} preset="subheading" style={styles.cardTitle} />
            <Text text={`Status: ${item.status}`} preset="default" style={styles.cardDescription} />
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      scrollEnabled={false}
    />
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 8,
    height: 60,
    marginRight: spacing.md,
    width: 60,
  },
  backButton: {
    backgroundColor: colors.tint,
    borderRadius: 6,
    height: 30,
    marginBottom: spacing.md,
    padding: spacing.xs,
    width: 30,
  },
  cardDescription: { color: colors.text },
  cardTitle: { color: colors.tint },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  characterCard: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    flexDirection: "row",
    padding: spacing.md,
  },
  container: {
    alignSelf: "center",
    maxWidth: 500,
    padding: spacing.md,
    width: "100%",
  },
  info: {
    flex: 1,
  },
  mb: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
})
