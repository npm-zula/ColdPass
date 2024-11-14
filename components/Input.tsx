import { TextInput, View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
}

export const Input = ({ 
  label, 
  value, 
  onChangeText, 
  secureTextEntry,
  error 
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={globalStyles.colors.disabled}
        autoCapitalize="none"  // Add this line
        autoCorrect={false}    // Add this line
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: globalStyles.spacing.md,
  },
  label: {
    fontSize: globalStyles.typography.sizes.body,
    color: globalStyles.colors.text,
    marginBottom: globalStyles.spacing.xs,
    fontFamily: globalStyles.typography.fontFamily.medium,
  },
  input: {
    backgroundColor: globalStyles.colors.surface,
    borderRadius: globalStyles.borderRadius.sm,
    padding: globalStyles.spacing.md,
    color: globalStyles.colors.text,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: globalStyles.colors.error,
  },
  errorText: {
    color: globalStyles.colors.error,
    fontSize: globalStyles.typography.sizes.caption,
    marginTop: globalStyles.spacing.xs,
  },
});