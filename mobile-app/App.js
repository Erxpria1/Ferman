import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { storage } from './src/utils/storage';
import { COLORS, EMOJIS } from './src/constants/theme';

export default function App() {
  const [tasks, setTasks] = useState({ fermanlar: [], islemde: [], hazine: [] });
  const [newTaskText, setNewTaskText] = useState('');
  const [rank, setRank] = useState('Acemi Oğlanı');
  const [completedCount, setCompletedCount] = useState(0);

  const updateRank = async (count) => {
    let newRank = 'Acemi Oğlanı';
    if (count >= 100) newRank = 'Sadrazam';
    else if (count >= 50) newRank = 'Paşa';
    else if (count >= 10) newRank = 'Yeniçeri';

    setRank(newRank);
    await storage.saveRank(newRank);
  };

  const loadData = async () => {
    const savedTasks = await storage.getTasks();
    const savedRank = await storage.getRank();
    const savedCount = await storage.getCompletedCount();
    setTasks(savedTasks);
    setRank(savedRank);
    setCompletedCount(savedCount);
  };

  useEffect(() => {
    // Call async function inside effect to avoid direct sync set state warning
    // though the warning is arguably false positive here since loadData is async.
    (async () => {
        await loadData();
    })();
  }, []);

  const addTask = async () => {
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskText,
      emoji: EMOJIS.default,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = {
      ...tasks,
      fermanlar: [...tasks.fermanlar, newTask],
    };

    setTasks(updatedTasks);
    await storage.saveTasks(updatedTasks);
    setNewTaskText('');
  };

  const moveTask = async (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find(t => t.id === taskId);
    if (!taskToMove) return;

    const updatedTasks = {
      ...tasks,
      [fromColumn]: tasks[fromColumn].filter(t => t.id !== taskId),
      [toColumn]: [...tasks[toColumn], taskToMove],
    };

    setTasks(updatedTasks);
    await storage.saveTasks(updatedTasks);

    if (toColumn === 'hazine') {
      const newCount = completedCount + 1;
      setCompletedCount(newCount);
      await storage.saveCompletedCount(newCount);
      updateRank(newCount);
    }
  };

  const deleteTask = async (taskId, column) => {
    const updatedTasks = {
      ...tasks,
      [column]: tasks[column].filter(t => t.id !== taskId),
    };
    setTasks(updatedTasks);
    await storage.saveTasks(updatedTasks);
  };

  const renderTask = (task, column) => (
    <View key={task.id} style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskEmoji}>{task.emoji}</Text>
        <Text style={styles.taskTitle}>{task.title}</Text>
      </View>
      <View style={styles.taskActions}>
        {column !== 'islemde' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.ottoman.gold }]}
            onPress={() => moveTask(task.id, column, 'islemde')}
          >
            <Text style={styles.actionButtonText}>⚙️</Text>
          </TouchableOpacity>
        )}
        {column !== 'hazine' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.ottoman.crimson }]}
            onPress={() => moveTask(task.id, column, 'hazine')}
          >
            <Text style={styles.actionButtonText}>💎</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ff4444' }]}
          onPress={() => deleteTask(task.id, column)}
        >
          <Text style={styles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.ottoman.bordeaux} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🏛️ Divan-ı Not</Text>
        <Text style={styles.subtitle}>Sadrazam'ın Defteri</Text>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{rank}</Text>
          <Text style={styles.countText}>({completedCount})</Text>
        </View>
      </View>

      {/* Add Task */}
      <View style={styles.addTaskSection}>
        <TextInput
          style={styles.input}
          placeholder="Yeni Ferman..."
          value={newTaskText}
          onChangeText={setNewTaskText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+ Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Columns */}
      <ScrollView style={styles.content}>
        {/* Fermanlar */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>📜 Fermanlar</Text>
          {tasks.fermanlar.map(task => renderTask(task, 'fermanlar'))}
        </View>

        {/* İşlemde */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>⚙️ İşlemde</Text>
          {tasks.islemde.map(task => renderTask(task, 'islemde'))}
        </View>

        {/* Hazine */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>💎 Hazine</Text>
          {tasks.hazine.map(task => renderTask(task, 'hazine'))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ottoman.cream,
  },
  header: {
    backgroundColor: COLORS.ottoman.bordeaux,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.ottoman.gold,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.ottoman.cream,
    marginTop: 5,
  },
  rankBadge: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: COLORS.ottoman.gold,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rankText: {
    color: COLORS.ottoman.bordeaux,
    fontWeight: 'bold',
    marginRight: 5,
  },
  countText: {
    color: COLORS.ottoman.bordeaux,
  },
  addTaskSection: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.ottoman.gold,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.ottoman.gold,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: COLORS.ottoman.bordeaux,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  column: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ottoman.gold,
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.ottoman.bordeaux,
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.ottoman.gold,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ottoman.bordeaux,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 5,
  },
  actionButtonText: {
    fontSize: 16,
  },
});
