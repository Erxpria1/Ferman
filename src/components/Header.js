import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';

const Header = ({ title }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.borderContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderContainer: {
    borderWidth: 2,
    borderColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  title: {
    color: colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Amiri-Bold',
  },
});

export default Header;
