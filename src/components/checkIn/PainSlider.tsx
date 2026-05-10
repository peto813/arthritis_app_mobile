import { View } from "react-native";
import Slider from "@react-native-community/slider";

import { AppText } from "@/components/common/AppText";
import { useAppTheme } from "@/theme/AppThemeProvider";

type PainSliderProps = {
  label?: string;
  minLabel?: string;
  maxLabel?: string;
  showScaleNumbers?: boolean;
  value: number;
  onChange?: (value: number) => void;
};

export function PainSlider({
  label = "Pain Score",
  minLabel = "No pain",
  maxLabel = "Severe",
  showScaleNumbers = true,
  value,
  onChange,
}: PainSliderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={{ gap: 10 }}>
      <AppText style={{ fontWeight: "600" }}>
        {label}: {value}
      </AppText>
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={10}
        step={1}
        onValueChange={(nextValue) => onChange?.(nextValue)}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.primaryDark}
      />
      {showScaleNumbers ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {Array.from({ length: 11 }, (_, index) => (
            <AppText
              key={index}
              muted
              style={{
                fontSize: 12,
                fontWeight: index === value ? "700" : "400",
                color: index === value ? colors.primaryDark : colors.textSecondary,
              }}
            >
              {index}
            </AppText>
          ))}
        </View>
      ) : null}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppText muted style={{ fontSize: 13 }}>
          {minLabel}
        </AppText>
        <AppText muted style={{ fontSize: 13 }}>
          {maxLabel}
        </AppText>
      </View>
    </View>
  );
}
