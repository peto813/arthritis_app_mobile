import { Pressable, View } from "react-native";

import { AppText } from "@/components/common/AppText";
import {
  centerJointOptions,
  leftJointOptions,
  rightJointOptions,
  type JointOption,
} from "@/constants/joints";
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

  const selectedCenter = centerJointOptions.filter((joint) => selected.includes(joint));
  const selectedLeft = leftJointOptions.filter((joint) => selected.includes(joint));
  const selectedRight = rightJointOptions.filter((joint) => selected.includes(joint));

  function renderJointChips(label: string, joints: readonly JointOption[]) {
    if (joints.length === 0) {
      return null;
    }

    return (
      <View style={{ gap: 6 }}>
        <AppText muted style={{ fontSize: 13 }}>
          {label}
        </AppText>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {joints.map((joint) => {
            const isSelected = selected.includes(joint);
            return (
              <Pressable
                key={joint}
                onPress={() => onToggle?.(joint)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.primary,
                  backgroundColor: colors.primary,
                  borderRadius: 16,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                }}
              >
                <AppText style={{ color: colors.textOnPrimary }}>{joint}</AppText>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={{ gap: 8 }}>
      <AppText style={{ fontWeight: "600" }}>Affected joints</AppText>
      {selected.length === 0 ? (
        <AppText muted>Select circles on the body map to add affected joints.</AppText>
      ) : null}
      {renderJointChips("Center", selectedCenter)}
      {renderJointChips("Left side", selectedLeft)}
      {renderJointChips("Right side", selectedRight)}
    </View>
  );
}
