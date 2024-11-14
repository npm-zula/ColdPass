import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  const getStrength = (): { level: 'weak' | 'medium' | 'strong'; color: string } => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    
    const score = [hasLength, hasNumber, hasSpecial, hasUpper].filter(Boolean).length;
    
    if (score <= 2) return { level: 'weak', color: globalStyles.colors.error };
    if (score === 3) return { level: 'medium', color: '#FFA500' };
    return { level: 'strong', color: globalStyles.colors.success };
  };

  const strength = getStrength();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Password Strength:</Text>
      <View style={styles.indicatorContainer}>
        <View style={[styles.indicator, { backgroundColor: strength.color }]} />
        <Text style={[styles.strengthText, { color: strength.color }]}>
          {strength.level.charAt(0).toUpperCase() + strength.level.slice(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: globalStyles.spacing.xs,
  },
  label: {
    fontSize: globalStyles.typography.sizes.caption,
    color: globalStyles.colors.text,
    marginBottom: globalStyles.spacing.xs,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    height: 4,
    width: 100,
    borderRadius: 2,
    marginRight: globalStyles.spacing.sm,
  },
  strengthText: {
    fontSize: globalStyles.typography.sizes.caption,
    fontFamily: globalStyles.typography.fontFamily.medium,
  },
});