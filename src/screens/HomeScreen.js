import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { getData, storeData } from '../utils/storage';
import Header from '../components/Header';
import TodoItem from '../components/TodoItem';

// Placeholder background if image is not available
// In a real app, this would be require('../../assets/images/ottoman-bg.png')
// For now, we will use a color or a network image if needed, but the prompt says 
// "src/assets/images/" klasörüne ince, döngüsüz bir Osmanlı deseni koyun.

const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadTodos();
    }
  }, [isFocused]);

  const loadTodos = async () => {
    const storedTodos = await getData();
    setTodos(storedTodos);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    storeData(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    storeData(updatedTodos);
  };

  const navigateToAdd = () => {
    navigation.navigate('AddTodo');
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/ottoman-bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <Header title="OSMANLI YAPILACAKLAR" />
      <View style={styles.content}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem 
              todo={item} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo} 
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<View style={styles.emptyContainer}></View>}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.primary}
        onPress={navigateToAdd}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 80,
    paddingTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.secondary,
  },
  emptyContainer: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingTop: 50
  }
});

export default HomeScreen;
