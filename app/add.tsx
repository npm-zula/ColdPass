import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '../components/Screen';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';
import { globalStyles } from '../styles/globalStyles';
import { StorageService } from '../services/StorageService';

export default function AddScreen() {
  const { masterPassword } = useLocalSearchParams<{ masterPassword: string }>();
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({
    accountName: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      accountName: '',
      email: '',
      password: '',
    };

    if (!accountName) newErrors.accountName = 'Account name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async () => {
    if (!masterPassword) {
      router.back();
      return;
    }

    if (validateForm()) {
      const success = await StorageService.savePassword({
        accountName,
        email,
        password,
      }, masterPassword);

      if (success) {
        setShowToast(true);
        setTimeout(() => {
          router.back();
        }, 1500);
      }
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Input
          label="Account Name"
          value={accountName}
          onChangeText={setAccountName}
          error={errors.accountName}
        />
        
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />
        
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        
        <PasswordStrengthIndicator password={password} />
        
        <View style={styles.buttonContainer}>
          <Button
            label="Cancel"
            onPress={() => router.back()}
            variant="secondary"
          />
          <Button
            label="Save Password"
            onPress={handleSubmit}
          />
        </View>
      </View>

      {showToast && (
        <Toast
          message="Password saved successfully!"
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
    paddingTop: globalStyles.spacing.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: globalStyles.spacing.md,
    marginTop: globalStyles.spacing.xl,
  },
});