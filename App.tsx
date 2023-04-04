import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import TodoComponent from './src/components/TodoComponent';

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TodoComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
