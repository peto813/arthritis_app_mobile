import { View } from "react-native";

import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";

export function JointBodyMap() {
  return (
    <AppCard>
      <AppText style={{ fontWeight: "600", marginBottom: 6 }}>Joint Body Map</AppText>
      <View>
        <AppText muted>Placeholder for tappable body-map UI.</AppText>
      </View>
    </AppCard>
  );
}
