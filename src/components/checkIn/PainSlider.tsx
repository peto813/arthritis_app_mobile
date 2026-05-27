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
  disabled?: boolean;
};

function clampSliderValue(value: unknown) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return 0;
  }
  return Math.min(10, Math.max(0, Math.round(numericValue)));
}

export function PainSlider({
  label = "Pain Score",
  minLabel = "No pain",
  maxLabel = "Severe",
  showScaleNumbers = true,
  value,
  onChange,
  disabled = false,
}: PainSliderProps) {
  const { colors } = useAppTheme();
  const safeValue = clampSliderValue(value);

  return (
    <View style={{ gap: 10 }}>
      <AppText style={{ fontWeight: "600" }}>
        {label}: {safeValue}
      </AppText>
      <Slider
        value={safeValue}
        minimumValue={0}
        maximumValue={10}
        step={1}
        disabled={disabled}
        onValueChange={(nextValue) => onChange?.(clampSliderValue(nextValue))}
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
                fontWeight: index === safeValue ? "700" : "400",
                color:
                  index === safeValue ? colors.primaryDark : colors.textSecondary,
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
