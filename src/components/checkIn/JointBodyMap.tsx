import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";

import type { JointOption } from "@/constants/joints";
import { useAppTheme } from "@/theme/AppThemeProvider";

type Hotspot = {
  joint: JointOption;
  topPct: number;
  leftPct: number;
};

const BODY_MAP_IMAGE = require("../../../assets/images/body-map-front-dots.png");

const hotspots: Hotspot[] = [
  { joint: "Neck", leftPct: 50.812, topPct: 18.5 },
  { joint: "Left Shoulder", leftPct: 39.5, topPct: 22 },
  { joint: "Right Shoulder", leftPct: 61.7, topPct: 22 },
  { joint: "Left Elbow", leftPct: 35.7, topPct: 35.4 },
  { joint: "Right Elbow", leftPct: 65.8, topPct: 35.4 },
  { joint: "Left Wrist", leftPct: 31.7, topPct: 46 },
  { joint: "Right Wrist", leftPct: 69.6, topPct: 46 },
  { joint: "Left Hand", leftPct: 30.5, topPct: 51 },
  { joint: "Right Hand", leftPct: 70.7, topPct: 51 },
  { joint: "Left Hip", leftPct: 43, topPct: 46 },
  { joint: "Right Hip", leftPct: 58, topPct: 46 },
  { joint: "Left Knee", leftPct: 44, topPct: 64.7 },
  { joint: "Right Knee", leftPct: 56.5, topPct: 64.7 },
  { joint: "Left Ankle", leftPct: 56.3, topPct: 82.5 },
  { joint: "Right Ankle", leftPct: 44, topPct: 82.5 },
  { joint: "Left Foot", leftPct: 42.7, topPct: 89 },
  { joint: "Right Foot", leftPct: 58.0, topPct: 89 },
];

type JointBodyMapProps = {
  selected: string[];
  onToggle?: (joint: JointOption) => void;
};

export function JointBodyMap({ selected, onToggle }: JointBodyMapProps) {
  const { colors } = useAppTheme();
  const dotSize = 24;
  const pulseValues = useRef(hotspots.map(() => new Animated.Value(1))).current;
  const previousSelectedRef = useRef<string[]>(selected);

  useEffect(() => {
    const previousSelected = previousSelectedRef.current;
    const newlySelected = selected.filter(
      (joint) => !previousSelected.includes(joint),
    );

    if (newlySelected.length > 0) {
      hotspots.forEach((point, index) => {
        if (!newlySelected.includes(point.joint)) {
          return;
        }
        Animated.sequence([
          Animated.timing(pulseValues[index], {
            toValue: 1.14,
            duration: 90,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValues[index], {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }

    previousSelectedRef.current = selected;
  }, [selected, pulseValues]);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 12,
      }}
    >
      <View
        style={{
          width: "89%",
          aspectRatio: 3 / 4,
          position: "relative",
          alignSelf: "center",
        }}
      >
        <Image
          source={BODY_MAP_IMAGE}
          contentFit="contain"
          style={{ width: "100%", height: "100%" }}
        />
        <View
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {hotspots.map((point, index) => {
            const isSelected = selected.includes(point.joint);
            return (
              <View
                key={`${point.joint}-${index}`}
                style={{
                  position: "absolute",
                  top: `${point.topPct}%`,
                  left: `${point.leftPct}%`,
                  width: dotSize,
                  height: dotSize,
                  marginTop: -(dotSize / 2),
                  marginLeft: -(dotSize / 2),
                }}
              >
                <Animated.View
                  style={{ transform: [{ scale: pulseValues[index] }] }}
                >
                  <Pressable
                    onPress={() => onToggle?.(point.joint)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={`Toggle ${point.joint}`}
                    style={{
                      width: dotSize,
                      height: dotSize,
                      borderRadius: dotSize / 2,
                      borderWidth: 2.5,
                      borderColor: isSelected
                        ? colors.primaryDark
                        : colors.textSecondary,
                      backgroundColor: isSelected
                        ? colors.primary
                        : "rgba(255,255,255,0.88)",
                    }}
                  />
                </Animated.View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
