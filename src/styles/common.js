import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});
