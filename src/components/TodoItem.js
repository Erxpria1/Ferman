import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(todo.id)} style={styles.checkboxContainer}>
        {todo.completed ? (
          <MaterialCommunityIcons name="star-crescent" size={24} color={colors.primary} />
        ) : (
          <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color={colors.text} />
        )}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, todo.completed && styles.completedText]}>
          {todo.text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
        <MaterialCommunityIcons name="trash-can-outline" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    marginLeft: 8,
  },
});

export default TodoItem;
