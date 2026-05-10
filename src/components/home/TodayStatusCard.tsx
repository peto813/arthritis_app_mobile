import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";

export function TodayStatusCard() {
  return (
    <AppCard>
      <AppText style={{ fontSize: 24, fontWeight: "700", marginBottom: 6 }}>
        How do you feel today?
      </AppText>
      <AppText muted>Take 30 seconds to log today&apos;s check-in.</AppText>
    </AppCard>
  );
}
