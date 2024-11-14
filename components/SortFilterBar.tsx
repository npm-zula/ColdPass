import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export type SortOption = 'name' | 'email' | 'date';

interface SortFilterBarProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const SortFilterBar = ({ sortBy, onSortChange }: SortFilterBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort by:</Text>
      <View style={styles.options}>
        <TouchableOpacity 
          style={[styles.option, sortBy === 'name' && styles.activeOption]} 
          onPress={() => onSortChange('name')}
        >
          <Ionicons 
            name="text" 
            size={16} 
            color={sortBy === 'name' ? globalStyles.colors.primary : globalStyles.colors.text} 
          />
          <Text style={[styles.optionText, sortBy === 'name' && styles.activeText]}>Name</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, sortBy === 'email' && styles.activeOption]}
          onPress={() => onSortChange('email')}
        >
          <Ionicons 
            name="mail" 
            size={16} 
            color={sortBy === 'email' ? globalStyles.colors.primary : globalStyles.colors.text} 
          />
          <Text style={[styles.optionText, sortBy === 'email' && styles.activeText]}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, sortBy === 'date' && styles.activeOption]}
          onPress={() => onSortChange('date')}
        >
          <Ionicons 
            name="time" 
            size={16} 
            color={sortBy === 'date' ? globalStyles.colors.primary : globalStyles.colors.text} 
          />
          <Text style={[styles.optionText, sortBy === 'date' && styles.activeText]}>Date</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: globalStyles.spacing.sm,
  },
  label: {
    fontSize: globalStyles.typography.sizes.caption,
    color: globalStyles.colors.text,
    marginRight: globalStyles.spacing.sm,
  },
  options: {
    flexDirection: 'row',
    gap: globalStyles.spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: globalStyles.spacing.sm,
    paddingVertical: globalStyles.spacing.xs,
    borderRadius: globalStyles.borderRadius.sm,
    backgroundColor: globalStyles.colors.surface,
    gap: globalStyles.spacing.xs,
  },
  activeOption: {
    backgroundColor: `${globalStyles.colors.primary}20`,
  },
  optionText: {
    fontSize: globalStyles.typography.sizes.caption,
    color: globalStyles.colors.text,
  },
  activeText: {
    color: globalStyles.colors.primary,
    fontFamily: globalStyles.typography.fontFamily.medium,
  },
});