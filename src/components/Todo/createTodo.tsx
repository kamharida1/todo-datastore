import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface CreateTodoProps {
  createTodo: (task: {id: string, task: string}) => void
}

// const guid = () => {
//     function s4() {
//       return Math.floor((1 + Math.random()) * 0x10000)
//         .toString(16)
//         .substring(1);
//     }
//     return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
// }

const CreateTodo = memo<CreateTodoProps>(({ createTodo }) => {
  const [task, setTask] = useState('')

  const guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  }

  const handleCreate = () => { 
    if (task) {
      createTodo({
        id: guid(),
        task: task
      });
      setTask('');
    }
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="create todo ..."
        placeholderTextColor={'#00000099'}
        style={{ flex: 1, fontSize: 18 }}
        onChangeText={setTask}
        value={task}
      />
      <TouchableOpacity onPress={handleCreate}>
        <Ionicons name="ios-add-sharp" size={30} color={"black"} />
      </TouchableOpacity>
    </View>
  );
})

export default CreateTodo;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});