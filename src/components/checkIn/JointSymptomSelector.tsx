import { Pressable, View } from "react-native";

import { AppText } from "@/components/common/AppText";
import { jointOptions, type JointOption } from "@/constants/joints";
import { useAppTheme } from "@/theme/AppThemeProvider";

type JointSymptomSelectorProps = {
  selected: string[];
  onToggle?: (joint: JointOption) => void;
};

export function JointSymptomSelector({
  selected,
  onToggle,
}: JointSymptomSelectorProps) {
  const { colors } = useAppTheme();

  return (
    <View style={{ gap: 8 }}>
      <AppText style={{ fontWeight: "600" }}>Affected joints</AppText>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {jointOptions.map((joint) => {
          const isSelected = selected.includes(joint);
          return (
            <Pressable
              key={joint}
              onPress={() => onToggle?.(joint)}
              style={{
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.border,
                borderRadius: 16,
                paddingVertical: 6,
                paddingHorizontal: 10,
              }}
            >
              <AppText>{joint}</AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
