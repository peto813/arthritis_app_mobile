import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <AppCard>
      <AppText style={{ fontWeight: "700", marginBottom: 6 }}>{title}</AppText>
      <AppText muted>{message}</AppText>
    </AppCard>
  );
}
