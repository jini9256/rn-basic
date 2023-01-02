import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { AntDesign, FontAwesome5, Octicons } from "@expo/vector-icons";

export default function Todo({
  setEditText,
  todo,
  editTodo,
  setDone,
  deleteTodo,
  setEdit,
  editText,
}) {
  return (
    <View key={todo.id} style={styles.todo}>
      {todo.isEdit ? (
        <TextInput
          onSubmitEditing={() => {
            editTodo(todo.id);
          }}
          // 초기값을 불러오기 위해 defaultValue로 변경함
          defaultValue={todo.text}
          onChangeText={setEditText}
          style={{ backgroundColor: "white", flex: "1" }}
        />
      ) : (
        <Text
          style={{
            textDecorationLine: todo.isDone ? "line-through" : "none",
          }}
        >
          {todo.text}
        </Text>
      )}

      <View style={styles.img}>
        {/* 현재 클릭한 todo의 id값을 넘겨준다 */}
        <TouchableOpacity onPress={() => setDone(todo.id)}>
          <Octicons
            style={{ marginLeft: 10 }}
            name="tasklist"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEdit(todo.id)}>
          <FontAwesome5
            style={{ marginLeft: 10 }}
            name="edit"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <AntDesign
            style={{ marginLeft: 10 }}
            name="delete"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#9EA1D4",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  img: {
    flexDirection: "row",
    // marginRight: 10,
  },
});
