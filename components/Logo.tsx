import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Ionicons 
        name="shield-checkmark" 
        size={64} 
        color={globalStyles.colors.primary} 
      />
      <Text style={styles.title}>ColdPass</Text>
      <Text style={styles.subtitle}>Secure Password Manager</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: globalStyles.spacing.sm,
  },
  title: {
    fontSize: 32,
    fontFamily: globalStyles.typography.fontFamily.bold,
    color: globalStyles.colors.primary,
  },
  subtitle: {
    fontSize: globalStyles.typography.sizes.caption,
    fontFamily: globalStyles.typography.fontFamily.medium,
    color: globalStyles.colors.text,
    opacity: 0.7,
  },
});