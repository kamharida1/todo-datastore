import { Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons'
import { TodoStatus } from '../../models';



const TodoListItem = memo((props) => {
  const { id, task, status } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [taskEdit, setTaskEdit] = useState(task)

  const onEditClick = () => {
    setIsEditing(true)
  }

  const onCancelClick = () => {
    setIsEditing(false)
  }

  const onSaveClick = () => {
    const todoId = id;
    const todoText = taskEdit;
    props.updateTodo(todoId, todoText);
    setIsEditing(false);
  }

  const onDeleteClick = () => {
    const todoId = id;
    props.deleteTodo(todoId)
  }

  const onCompleteTodoClick = () => {
    const todoId = id;
    props.completeTodo(todoId)
  }

  const renderTaskSection = () => {
    const taskStyle = {
      color: status === TodoStatus.COMPLETED ? "#2ecc71" : "#d35400",
      textDecorationLine: status === TodoStatus.COMPLETED ? "line-through" : "",
      fontSize: 16,
    };
    if (isEditing) {
      return (
        <View style={{flex: 1}}>
          <TextInput
            value={taskEdit}
            onChangeText={setTaskEdit}
            style={{ fontSize: 16, }}
            autoFocus
          />
        </View>
      )
    }
    return (
      <Pressable onPress={onCompleteTodoClick} style={{ flex: 1 }}>
        <Text style={taskStyle}>{task}</Text>
      </Pressable>
    );
  }

  const renderActionSection = () => {
    if (isEditing) {
      return (
        <View style={styles.boxesContainer}>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={onSaveClick}>
            <AntDesign name="save" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancelClick}>
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.boxesContainer}>
        <TouchableOpacity style={{marginRight: 15}} onPress={onEditClick}>
          <AntDesign name="edit" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteClick}>
          <AntDesign name="delete" size={24} />
        </TouchableOpacity>
      </View>
    );
     
  }

  return (
    <View style={styles.container}>
      {renderTaskSection()}
      {renderActionSection()}
    </View>
  );

})

export default TodoListItem

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00000022',
    borderRadius: 15,
    marginBottom: 6,
    marginLeft: 3,
    marginRight: 3,
    elevation: 8,
    height: 100,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  boxesContainer: {
    flexDirection: "row",
    alignItems: "center",
    //marginRight: 10,
    justifyContent: 'space-evenly'
  }
})
