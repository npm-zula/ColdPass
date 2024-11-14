import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChangeText, placeholder }: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <Ionicons 
        name="search" 
        size={20} 
        color={globalStyles.colors.text} 
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={globalStyles.colors.disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.surface,
    borderRadius: globalStyles.borderRadius.md,
    paddingHorizontal: globalStyles.spacing.md,
  },
  icon: {
    marginRight: globalStyles.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: globalStyles.spacing.md,
    color: globalStyles.colors.text,
  },
});