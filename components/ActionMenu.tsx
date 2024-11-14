import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

interface ActionMenuProps {
  onAdd: () => void;
  onLogout: () => void;
}

export const ActionMenu = ({ onAdd, onLogout }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 5,
      tension: 40,
    }).start();
    
    setIsOpen(!isOpen);
  };

  const addButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
    opacity: animation,
  };

  const logoutButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -160],
        }),
      },
    ],
    opacity: animation,
  };

  const overlayStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
    }),
  };

  return (
    <>
      {isOpen && (
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <TouchableOpacity 
            style={styles.overlayTouch}
            onPress={toggleMenu}
            activeOpacity={1}
          />
        </Animated.View>
      )}
      
      <View style={styles.container}>
        <Animated.View style={[styles.menuItem, logoutButtonStyle]}>
          <TouchableOpacity 
            style={[styles.button, styles.menuButton]} 
            onPress={() => {
              toggleMenu();
              setTimeout(() => onLogout(), 300);
            }}
          >
            <Ionicons 
              name="log-out-outline" 
              size={20} 
              color={globalStyles.colors.background} 
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.menuItem, addButtonStyle]}>
          <TouchableOpacity 
            style={[styles.button, styles.menuButton]} 
            onPress={() => {
              toggleMenu();
              setTimeout(() => onAdd(), 300);
            }}
          >
            <Ionicons 
              name="add" 
              size={20} 
              color={globalStyles.colors.background} 
            />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          style={[styles.button, styles.mainButton]} 
          onPress={toggleMenu}
        >
          <Animated.View style={{
            transform: [{
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '45deg'],
              }),
            }],
          }}>
            <Ionicons 
              name="menu" 
              size={24} 
              color={globalStyles.colors.background} 
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: globalStyles.colors.text,
    zIndex: 1,
  },
  overlayTouch: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    bottom: globalStyles.spacing.xl,
    right: globalStyles.spacing.xl,
    alignItems: 'center',
    zIndex: 2,
  },
  menuItem: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: globalStyles.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: globalStyles.colors.primary,
  },
  menuButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: globalStyles.colors.primary,
  },
});