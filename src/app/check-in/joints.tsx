import { Link } from "expo-router";
import { useState } from "react";

import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { JointBodyMap } from "@/components/checkIn/JointBodyMap";
import { JointSymptomSelector } from "@/components/checkIn/JointSymptomSelector";
import type { JointOption } from "@/constants/joints";

export default function CheckInJointsScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleJoint(joint: JointOption) {
    setSelected((prev) => (prev.includes(joint) ? prev.filter((item) => item !== joint) : [...prev, joint]));
  }

  return (
    <Screen>
      <SectionTitle title="Joints" subtitle="Select joints that are currently affected." />
      <AppCard style={{ gap: 12 }}>
        <JointBodyMap />
        <JointSymptomSelector selected={selected} onToggle={toggleJoint} />
      </AppCard>
      <Link href="/check-in/review" asChild>
        <AppButton label="Review Check-in" />
      </Link>
    </Screen>
  );
}
