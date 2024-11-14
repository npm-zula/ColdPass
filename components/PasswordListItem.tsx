import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

interface PasswordItemProps {
  id: string;
  accountName: string;
  email: string;
  password: string;
  onDelete?: (id: string) => void;
  onPress?: () => void;
}

export const PasswordListItem = ({ 
  id,
  accountName, 
  email, 
  password, 
  onDelete,
  onPress 
}: PasswordItemProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [pressScale] = useState(new Animated.Value(1));

  const formattedAccountName = accountName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: pressScale }] }]}>
      <TouchableOpacity 
        style={styles.container}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.content}>
          
          
          <View style={styles.detailsContainer}>
            <View style={styles.header}>
              <Text style={styles.accountName} numberOfLines={1}>
                {formattedAccountName}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.actionButton}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color={globalStyles.colors.primary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => onDelete?.(id)}
                  style={styles.actionButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons 
                    name="trash-outline" 
                    size={18} 
                    color={globalStyles.colors.error} 
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.email} numberOfLines={1}>{email}</Text>
            <View style={styles.passwordContainer}>
              <Text style={styles.password}>
                {showPassword ? password : '••••••••'}
              </Text>
              {showPassword && (
                <Text style={styles.passwordStrength}>
                  {password.length >= 12 ? 'Strong' : 'Weak'}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.surface,
    borderRadius: globalStyles.borderRadius.md,
    marginBottom: globalStyles.spacing.md,
    padding: globalStyles.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: globalStyles.colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyles.spacing.xs,
  },

  passwordStrength: {
    fontSize: globalStyles.typography.sizes.caption,
    color: globalStyles.colors.error,
    opacity: 0.8,
    fontFamily: globalStyles.typography.fontFamily.regular,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  detailsContainer: {
    flex: 1,
  },

  accountIcon: {
    backgroundColor: globalStyles.colors.primary,
    borderRadius: globalStyles.borderRadius.sm,
  },

  accountInitial: {
    fontSize: globalStyles.typography.sizes.body,
    fontFamily: globalStyles.typography.fontFamily.bold,
    color: globalStyles.colors.background,
  },

  iconContainer: {
    width: 40,
    height: 40,
  },



  content: {
    gap: globalStyles.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: globalStyles.spacing.xs,
  },
  accountName: {
    fontSize: globalStyles.typography.sizes.body,
    fontFamily: globalStyles.typography.fontFamily.bold,
    color: globalStyles.colors.text,
    flex: 1,
    marginRight: globalStyles.spacing.sm,
  },
  email: {
    fontSize: globalStyles.typography.sizes.caption,
    color: globalStyles.colors.text,
    opacity: 0.8,
    fontFamily: globalStyles.typography.fontFamily.regular,
  },
  password: {
    fontSize: globalStyles.typography.sizes.body,
    color: globalStyles.colors.text,
    fontFamily: globalStyles.typography.fontFamily.medium,
    letterSpacing: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyles.spacing.xs,
  },
  actionButton: {
    padding: globalStyles.spacing.xs,
    borderRadius: globalStyles.borderRadius.sm,
    backgroundColor: `${globalStyles.colors.background}80`,
  },
  
});