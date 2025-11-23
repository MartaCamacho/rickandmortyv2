import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { EpisodesListSearchProps } from "types/episode.types"

import { TextField } from "@/components/TextField"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

const EpisodesListSearch: FC<EpisodesListSearchProps> = ({ search, setSearch }) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($searchInputContainer)}>
      <TextField
        value={search}
        onChangeText={setSearch}
        placeholder="Search episode..."
        placeholderTextColor={colors.textDim}
      />
    </View>
  )
}

export default EpisodesListSearch

const $searchInputContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  paddingHorizontal: spacing.lg,
  marginBottom: spacing.lg,
})