import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { PasswordListItem } from '../components/PasswordListItem';
import { SearchInput } from '../components/SearchInput';
import { globalStyles } from '../styles/globalStyles';
import { router } from 'expo-router';
import { StorageService } from '../services/StorageService';
import { useFocusEffect } from 'expo-router';
import { Toast } from '../components/Toast';
import { SortFilterBar, SortOption } from '../components/SortFilterBar';
import { ActionMenu } from '../components/ActionMenu';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [passwords, setPasswords] = useState<Array<{
    id: string;
    accountName: string;
    email: string;
    password: string;
  }>>([]);
  const [showToast, setShowToast] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [masterPassword, setMasterPassword] = useState<string>('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isAuthenticated = await StorageService.isAuthenticated();
    if (!isAuthenticated) {
      router.replace('/start');
    } else {
      // Get master password from secure storage or state management
      // For now, we'll use a placeholder
      setMasterPassword('your_master_password');
    }
  };

  const loadPasswords = useCallback(async () => {
    if (!masterPassword) return;
    const storedPasswords = await StorageService.getAllPasswords(masterPassword);
    setPasswords(storedPasswords);
  }, [masterPassword]);

  useEffect(() => {
    StorageService.initializeStorage();
    loadPasswords();
  }, [loadPasswords]);

  useFocusEffect(
    useCallback(() => {
      loadPasswords();
    }, [loadPasswords])
  );

  const sortAndFilterPasswords = useCallback(() => {
    let result = passwords.filter(item =>
      item.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.accountName.localeCompare(b.accountName));
        break;
      case 'email':
        result.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'date':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [passwords, searchQuery, sortBy]);

  const filteredPasswords = sortAndFilterPasswords();

  const handleDelete = useCallback(async (id: string) => {
    if (!masterPassword) return;

    Alert.alert(
      'Delete Password',
      'Are you sure you want to delete this password?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await StorageService.deletePassword(id, masterPassword);
            if (success) {
              await loadPasswords();
              setShowToast(true);
            }
          },
        },
      ],
    );
  }, [loadPasswords, masterPassword]);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await StorageService.logout();
            router.replace('/start');
          },
        },
      ],
    );
  };

  return (
    <Screen scrollable={false}>
      <View style={styles.header}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search accounts..."
        />
        <SortFilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </View>

      <FlatList
        data={filteredPasswords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PasswordListItem
            id={item.id}
            accountName={item.accountName}
            email={item.email}
            password={item.password}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <ActionMenu 
        onAdd={() => router.push({
          pathname: '/add',
          params: { masterPassword }
        })}
        onLogout={handleLogout}
      />
      
      {showToast && (
        <Toast
          message="Password deleted successfully"
          type="success"
          onHide={() => setShowToast(false)}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: globalStyles.spacing.md,
    gap: globalStyles.spacing.sm,
  },
  list: {
    paddingBottom: globalStyles.spacing.xl * 2,
  },
});