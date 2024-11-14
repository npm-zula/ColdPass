import { useEffect } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide: () => void;
}

export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onHide 
}: ToastProps) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View style={[
      styles.container,
      styles[type],
      { opacity }
    ]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: globalStyles.spacing.xl,
    left: globalStyles.spacing.md,
    right: globalStyles.spacing.md,
    padding: globalStyles.spacing.md,
    borderRadius: globalStyles.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  success: {
    backgroundColor: globalStyles.colors.success,
  },
  error: {
    backgroundColor: globalStyles.colors.error,
  },
  info: {
    backgroundColor: globalStyles.colors.primary,
  },
  text: {
    color: globalStyles.colors.background,
    fontSize: globalStyles.typography.sizes.body,
    fontFamily: globalStyles.typography.fontFamily.medium,
  },
});