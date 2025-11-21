import { FC } from "react"
import { View, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useEpisode } from "@/hooks/useEpisode"
import { AppStackParamList } from "@/navigators/navigationTypes"
import { spacing } from "@/theme/spacing"

type EpisodeDetailRoute = RouteProp<AppStackParamList, "EpisodeDetails">

export const EpisodeDetailScreen: FC = () => {
  const route = useRoute<EpisodeDetailRoute>()
  const { id } = route.params

  const { data, isLoading, isError } = useEpisode(id)

  if (isLoading) return <ActivityIndicator size="large" style={styles.center} />
  if (isError || !data) return <Text text="Error loading episode details 😢" preset="subheading" />

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <Text text={data.name} preset="heading" style={styles.title} />

      <Text text={`Air Date: ${data.air_date}`} preset="subheading" />
      <Text text={`Episode: ${data.episode}`} preset="subheading" style={styles.mb} />

      <Text text="Characters" preset="heading" style={styles.sectionTitle} />

      <FlatList
        data={data.characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.characterCard}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text text={item.name} preset="subheading" />
              <Text text={`Status: ${item.status}`} preset="default" />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        scrollEnabled={false}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  mb: {
    marginBottom: spacing.md,
  },
  characterCard: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
