import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'large' | 'medium';
  disabled?: boolean;
}

export const Button = ({ 
  label, 
  onPress, 
  variant = 'primary',
  size = 'large',
  disabled = false 
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text,
        variant === 'secondary' && styles.secondaryText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: globalStyles.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: globalStyles.colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
      borderColor: globalStyles.colors.primary,
  },
  large: {
    paddingVertical: globalStyles.spacing.md,
    paddingHorizontal: globalStyles.spacing.xl,
  },
  medium: {
    paddingVertical: globalStyles.spacing.sm,
    paddingHorizontal: globalStyles.spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: globalStyles.colors.background,
    fontSize: globalStyles.typography.sizes.body,
    fontFamily: globalStyles.typography.fontFamily.medium,
  },
  secondaryText: {
    color: globalStyles.colors.primary,
  },
});