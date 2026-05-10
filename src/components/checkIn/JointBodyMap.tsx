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
  { joint: "Shoulders", leftPct: 39.5, topPct: 22 },
  { joint: "Shoulders", leftPct: 61.7, topPct: 22 },
  { joint: "Elbows", leftPct: 36.5, topPct: 35.4 },
  { joint: "Elbows", leftPct: 67.2, topPct: 35.4 },
  { joint: "Wrists", leftPct: 32.4, topPct: 49.2 },
  { joint: "Wrists", leftPct: 71.1, topPct: 49.2 },
  { joint: "Hands", leftPct: 32.4, topPct: 54.1 },
  { joint: "Hands", leftPct: 71.1, topPct: 54.1 },
  { joint: "Hips", leftPct: 44.7, topPct: 49.2 },
  { joint: "Hips", leftPct: 59.0, topPct: 49.2 },
  { joint: "Knees", leftPct: 45.2, topPct: 64.7 },
  { joint: "Knees", leftPct: 58.8, topPct: 64.7 },
  { joint: "Ankles", leftPct: 40.9, topPct: 79.4 },
  { joint: "Ankles", leftPct: 62.3, topPct: 79.4 },
  { joint: "Feet", leftPct: 40.7, topPct: 86.2 },
  { joint: "Feet", leftPct: 62.0, topPct: 86.2 },
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
                      borderWidth: 1.5,
                      borderColor: isSelected
                        ? colors.primaryDark
                        : colors.border,
                      backgroundColor: isSelected
                        ? colors.primary
                        : "rgba(255,255,255,0.72)",
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
