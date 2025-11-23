import { FC } from "react"
import { View, Pressable, ViewStyle } from "react-native"

import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

type EpisodeItemProps = {
  name: string
  airDate: string
  episodeCode: string
  onPress?: () => void
}

const EpisodeItem: FC<EpisodeItemProps> = ({
  name,
  airDate,
  episodeCode,
  onPress,
}: EpisodeItemProps) => {
  const { themed } = useAppTheme()
  return (
    <Pressable onPress={onPress} style={themed($container)}>
      <Card
        HeadingComponent={<Text preset="heading" text={name} />}
        ContentComponent={
          <View style={themed($infoRow)}>
            <Text text="Air date:" preset="subheading" />
            <Text text={airDate} />
          </View>
        }
        style={themed($card)}
        contentStyle={themed($cardContent)}
        preset="default"
        FooterComponent={
          <View style={themed($infoRow)}>
            <Text text="Episode:" preset="subheading" />
            <Text text={episodeCode} />
          </View>
        }
      />
    </Pressable>
  )
}

export default EpisodeItem

const $card: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
})

const $cardContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  overflow: "visible",
})

const $infoRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
})
