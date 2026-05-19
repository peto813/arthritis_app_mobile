import { Alert, Platform } from "react-native";

const CANCEL_MESSAGE = "Are you sure you want to leave this check-in?";

export function confirmCancelCheckIn(onConfirm: () => void) {
  if (Platform.OS === "web") {
    const confirmed =
      typeof globalThis.confirm === "function"
        ? globalThis.confirm(CANCEL_MESSAGE)
        : true;
    if (confirmed) {
      onConfirm();
    }
    return;
  }

  Alert.alert("Cancel check-in?", CANCEL_MESSAGE, [
    { text: "Keep editing", style: "cancel" },
    {
      text: "Yes, cancel",
      style: "destructive",
      onPress: onConfirm,
    },
  ]);
}
