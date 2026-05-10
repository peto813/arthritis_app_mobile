import { Pressable, View } from "react-native";

import { AppText } from "@/components/common/AppText";
import { useAppTheme } from "@/theme/AppThemeProvider";
import type { Feeling } from "@/types/checkin";

const options: Feeling[] = ["great", "okay", "low"];
const optionEmoji: Record<Feeling, string> = {
  great: "🙂",
  okay: "😐",
  low: "☹️",
};

type FeelingPickerProps = {
  value: Feeling;
  onChange?: (value: Feeling) => void;
};

export function FeelingPicker({ value, onChange }: FeelingPickerProps) {
  const { colors } = useAppTheme();

  return (
    <View style={{ gap: 8 }}>
      <AppText style={{ fontWeight: "600" }}>How do you feel?</AppText>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => onChange?.(option)}
            style={{
              borderWidth: 1,
              borderColor: option === value ? colors.primary : colors.border,
              borderRadius: 10,
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: option === value ? colors.primary : colors.surface,
            }}
          >
            <AppText
              style={{
                textTransform: "capitalize",
                color: option === value ? colors.textOnPrimary : colors.textPrimary,
                fontWeight: option === value ? "600" : "400",
              }}
            >
              {optionEmoji[option]} {option}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
