import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../components/Screen';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';
import { globalStyles } from '../styles/globalStyles';
import { StorageService } from '../services/StorageService';

export default function StartScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    StorageService.initializeStorage();
  }, []);

  const validateInputs = () => {
    if (!username) {
      setError('Username is required');
      return false;
    }
    if (!masterPassword) {
      setError('Master password is required');
      return false;
    }
    if (!isLogin && masterPassword.length < 8) {
      setError('Master password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    if (isLogin) {
      const success = await StorageService.loginUser({
        username,
        masterPassword
      });

      if (success) {
        router.replace('/');
      } else {
        setError('Invalid username or password');
      }
    } else {
      const success = await StorageService.createUser({
        username,
        masterPassword
      });

      if (success) {
        setShowToast(true);
        setTimeout(() => {
          router.replace('/');
        }, 1500);
      } else {
        setError('Username already exists');
      }
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Logo />
        
        <View style={styles.form}>
          <Input
            label="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setError('');
            }}
            error={error}
          />

          <Input
            label="Master Password"
            value={masterPassword}
            onChangeText={(text) => {
              setMasterPassword(text);
              setError('');
            }}
            secureTextEntry
            error={error}
          />
          
          <Button
            label={isLogin ? "Login" : "Sign Up"}
            onPress={handleSubmit}
          />

          <Button
            label={isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
            onPress={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            variant="secondary"
          />
        </View>
      </View>

      {showToast && (
        <Toast
          message="Account created successfully!"
          type="success"
          onHide={() => setShowToast(false)}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: globalStyles.spacing.xl * 2,
  },
  form: {
    gap: globalStyles.spacing.xl,
  },
});