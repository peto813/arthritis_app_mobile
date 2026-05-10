import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { copy } from "@/constants/copy";
import { usePatient } from "@/hooks/usePatient";

export default function SettingsScreen() {
  const { patient } = usePatient();

  return (
    <Screen>
      <SectionTitle title={copy.settingsTitle} subtitle="Profile and app configuration." />
      <AppCard>
        <AppText style={{ fontWeight: "700" }}>Patient</AppText>
        <AppText>
          {patient.firstName} {patient.lastName}
        </AppText>
      </AppCard>
      <AppCard>
        <AppText muted>Settings controls can be added in future steps.</AppText>
      </AppCard>
    </Screen>
  );
}
