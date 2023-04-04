import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import _ from 'lodash'
import TodoListItem from './TodoListItem'

const TodoList = (props) => {
  const renderItems = () => {
    const todoListProps = _.omit(props, 'todos');
    return _.map(props.todos, (todo, index) => (
      <TodoListItem key={index} {...todo} {...todoListProps} />
    ));
  }
  return (
    <View>
      {renderItems()}
    </View>
  )
}

export default TodoList

const styles = StyleSheet.create({})