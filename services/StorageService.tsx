import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

interface PasswordEntry {
  id: string;
  accountName: string;
  email: string;
  password: string;
}

// Add new interface for master password storage
interface MasterPasswordData {
  hash: string;
  passwords: PasswordEntry[];
}

interface UserData {
  username: string;
  masterPasswordHash: string;
  passwords: PasswordEntry[];
}

interface UserCredentials {
  username: string;
  masterPassword: string;
}

const PASSWORD_FILE = `${FileSystem.documentDirectory}passwords.json`;
const MASTER_PASSWORD_FILE = `${FileSystem.documentDirectory}master-password.json`;
const USERS_FILE = `${FileSystem.documentDirectory}users.json`;

export const StorageService = {
  async initializeStorage() {
    try {
      const fileInfo = await FileSystem.getInfoAsync(USERS_FILE);
      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify({}));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize storage');
    }
  },

  async createUser(credentials: UserCredentials): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      if (users[credentials.username]) {
        return false;
      }

      users[credentials.username] = {
        username: credentials.username,
        masterPasswordHash: credentials.masterPassword, // In production, hash this!
        passwords: []
      };

      await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify(users));
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to create user');
      return false;
    }
  },

  async loginUser(credentials: UserCredentials): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      const user = users[credentials.username];
      
      if (!user) return false;
      return user.masterPasswordHash === credentials.masterPassword; // In production, compare hashes!
    } catch (error) {
      return false;
    }
  },

   async getAllUsers(): Promise<Record<string, UserData>> {
    try {
      const content = await FileSystem.readAsStringAsync(USERS_FILE);
      return JSON.parse(content);
    } catch (error) {
      return {};
    }
  },

  async getAllPasswords(masterPassword: string): Promise<PasswordEntry[]> {
    try {
      const content = await FileSystem.readAsStringAsync(PASSWORD_FILE);
      const data: MasterPasswordData = JSON.parse(content);
      if (data.hash !== masterPassword) {
        return [];
      }
      return data.passwords || [];
    } catch (error) {
      Alert.alert('Error', 'Failed to read passwords');
      return [];
    }
  },

  async savePassword(password: Omit<PasswordEntry, 'id'>, masterPassword: string): Promise<boolean> {
    try {
      const passwords = await this.getAllPasswords(masterPassword);
      const newPassword = {
        ...password,
        id: Date.now().toString(),
      };
      
      const data: MasterPasswordData = {
        hash: masterPassword,
        passwords: [...passwords, newPassword]
      };
      
      await FileSystem.writeAsStringAsync(PASSWORD_FILE, JSON.stringify(data));
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to save password');
      return false;
    }
  },

  async deletePassword(id: string, masterPassword: string): Promise<boolean> {
    try {
      const passwords = await this.getAllPasswords(masterPassword);
      const filteredPasswords = passwords.filter(p => p.id !== id);
      
      const data: MasterPasswordData = {
        hash: masterPassword,
        passwords: filteredPasswords
      };
      
      await FileSystem.writeAsStringAsync(PASSWORD_FILE, JSON.stringify(data));
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to delete password');
      return false;
    }
  },

  async hasMasterPassword(): Promise<boolean> {
    try {
      const info = await FileSystem.getInfoAsync(MASTER_PASSWORD_FILE);
      return info.exists;
    } catch (error) {
      return false;
    }
  },

  async setMasterPassword(password: string): Promise<boolean> {
    try {
      await FileSystem.writeAsStringAsync(MASTER_PASSWORD_FILE, password);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to save master password');
      return false;
    }
  },

  async validateMasterPassword(password: string): Promise<boolean> {
    try {
      const storedPassword = await FileSystem.readAsStringAsync(MASTER_PASSWORD_FILE);
      return storedPassword === password;
    } catch (error) {
      return false;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const hasPassword = await this.hasMasterPassword();
      if (!hasPassword) return false;
      
      // Add any additional authentication checks here
      return true;
    } catch (error) {
      return false;
    }
  },

  async logout(): Promise<void> {
    try {
      // Clear any stored session data
      await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify({}));
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  }
};