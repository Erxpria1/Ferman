import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { colors } from '../styles/colors';
import { getData, storeData } from '../utils/storage';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

const AddTodoScreen = ({ navigation }) => {
  const [text, setText] = useState('');

  const handleAddTodo = async () => {
    if (text.trim().length === 0) {
      Alert.alert('Uyarı', 'Lütfen bir görev giriniz.');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    const currentTodos = await getData();
    const updatedTodos = [...currentTodos, newTodo];
    await storeData(updatedTodos);
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="YENİ GÖREV" />
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Yapılacak işi giriniz..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />
        <CustomButton title="EKLE" onPress={handleAddTodo} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  }
});

export default AddTodoScreen;
