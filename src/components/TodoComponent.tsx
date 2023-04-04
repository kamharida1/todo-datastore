import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CreateTodo from './Todo/createTodo';
import _ from 'lodash'
import TodoListItem from './Todo/TodoListItem';
import TodoList from './Todo/TodoList';
import { Todo, TodoStatus } from '../models'
import { DataStore } from 'aws-amplify';

const TodoComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTasks();
    const subscription = DataStore.observe(Todo).subscribe(() => loadTasks())
    return () => subscription.unsubscribe()
  }, [])
  
  const loadTasks = () => {
     DataStore.query(Todo).then(setTodos); 
  }

  console.log(todos);

  const createTodo = async (task: Todo) => {
    const newTodo = await DataStore.save(
      new Todo({
        task: task.task,
        status: TodoStatus.INPROGRESS
      })
    );
    setTodos([...todos, newTodo])
  }

  const updateTodo = async (todoId: string, todoText: string) => {
    todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, task: todoText }
      } else {
        return todo
      }
    });
    setTodos(todos);

    // Update DataStore
    const original = await DataStore.query(Todo, todoId);
    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.task = todoText;
      })
    )
  };

  const deleteTodo = async (deleteTodo: Todo) => {
    _.remove(todos, todo => todo.id === deleteTodo.id);
    setTodos(todos)

    // Remove from DataStore
    const toDelete = await DataStore.query(Todo, deleteTodo.id);
    DataStore.delete(toDelete);
  }

  const completeTodo = async (todoId: string) => {
    _.map(todos, todo => {
      if (todo.id === todoId) {
        return { ...todo, status: TodoStatus.COMPLETED }
      } else {
        return todo
      }
    });

    // Update DataStore
    const original = await DataStore.query(Todo, todoId);
    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.status = TodoStatus.COMPLETED
      })
    )
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo App</Text>
        <CreateTodo createTodo={createTodo} />
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      </View>
    </ScrollView>
  );
}

export default TodoComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 80,
    
  },
  headerText: {
    fontSize: 50,
    fontWeight: '200',
    alignSelf: 'center',
  }
});