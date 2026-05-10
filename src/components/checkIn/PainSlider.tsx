import { View } from "react-native";

import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";

type PainSliderProps = {
  value: number;
  onChange?: (value: number) => void;
};

export function PainSlider({ value, onChange }: PainSliderProps) {
  return (
    <View style={{ gap: 8 }}>
      <AppText style={{ fontWeight: "600" }}>Pain Score: {value}</AppText>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <AppButton label="-1" onPress={() => onChange?.(Math.max(0, value - 1))} />
        <AppButton label="+1" onPress={() => onChange?.(Math.min(10, value + 1))} />
      </View>
    </View>
  );
}
