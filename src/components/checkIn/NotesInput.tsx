import { TextInput, View } from "react-native";

import { AppText } from "@/components/common/AppText";
import { useAppTheme } from "@/theme/AppThemeProvider";

type NotesInputProps = {
  value: string;
  onChangeText?: (value: string) => void;
};

export function NotesInput({ value, onChangeText }: NotesInputProps) {
  const { colors } = useAppTheme();

  return (
    <View style={{ gap: 8 }}>
      <AppText style={{ fontWeight: "600" }}>Notes (optional)</AppText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline
        placeholder="Anything else today? (sleep, stress, activity)"
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          minHeight: 96,
          textAlignVertical: "top",
          padding: 10,
        }}
      />
    </View>
  );
}
