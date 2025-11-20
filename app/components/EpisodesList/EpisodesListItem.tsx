import { View, Pressable, StyleSheet } from "react-native"

import { spacing } from "@/theme/spacing"

import { Card } from "../Card"
import { Text } from "../Text"

type EpisodeItemProps = {
  name: string
  airDate: string
  episodeCode: string
  onPress?: () => void
}

export function EpisodeItem({ name, airDate, episodeCode, onPress }: EpisodeItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Card style={styles.card} contentStyle={styles.cardContent} preset="default">
        <Text preset="heading" text={name} />

        <View style={styles.infoRow}>
          <Text text="Air date:" preset="subheading" />
          <Text text={airDate} />
        </View>

        <View style={styles.infoRow}>
          <Text text="Episode:" preset="subheading" />
          <Text text={episodeCode} />
        </View>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
  },
  cardContent: {
    gap: spacing.sm,
  },
  container: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
