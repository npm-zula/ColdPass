import { SafeAreaView, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean;
  keyboardAvoiding?: boolean;
}

export const Screen = ({ 
  children, 
  scrollable = true,
  padding = true,
  keyboardAvoiding = true 
}: ScreenProps) => {
  const content = (
    <View style={[styles.container, padding && styles.padding]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboard}
        >
          {scrollable ? (
            <ScrollView 
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
            >
              {content}
            </ScrollView>
          ) : content}
        </KeyboardAvoidingView>
      ) : (
        scrollable ? (
          <ScrollView 
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
            {content}
          </ScrollView>
        ) : content
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: globalStyles.colors.background,
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  padding: {
    padding: globalStyles.spacing.md,
  },
  scroll: {
    flexGrow: 1,
  },
});