import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, FontAwesome5, Octicons } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  // Add Todo만들기
  // 인풋창에서 엔터누르면 투두가 추가된다

  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [editText, setEditText] = useState("");

  console.log("edit", editText);

  const newTodo = {
    text,
    id: Date.now(),
    isDone: false,
    isEdit: false,
    category,
  };

  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  // console.log("todos", todos);

  //완료버튼 만들기
  const setDone = (id) => {
    // id를 매개변수로 받아 그에 해당하는 배열의 요소를 찾는다
    // 그 배열의 요소의 isDone값을 토글링한 후에 셋투두해주면 됨

    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    // 토글링
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    // 어떤 id를 가진 투두를 선택했는지 알아야하고 setTodos로 그 id를 제외한 새로운 배열을 받아야하므로 일단 id값을 가져온다.
    // 필터에서 얕은 복사를 안 하는 이유는 ?

    // alert창 띄우기

    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소클릭"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  // isEditing토글링 하는 버튼만들기 ->setDone이랑 원리가 같다.
  const setEdit = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    // 토글링
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  // editText를 보내주는 onSubmitEditing에 들어갈 함수 만들어주기
  const editTodo = (id) => {
    // id값을 받아서 해당 배열의 요소를 찾는다. (idx찾기)

    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.btnTab}>
          <TouchableOpacity
            style={{
              ...styles.tab,
              backgroundColor: category === "js" ? "#FD8A8A" : "grey",
            }}
            onPress={() => {
              setCategory("js");
            }}
          >
            <Text style={styles.btnText}>JavaScript</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.tab,
              backgroundColor: category === "react" ? "#FD8A8A" : "grey",
            }}
            onPress={() => {
              setCategory("react");
            }}
          >
            <Text style={styles.btnText}>React</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.tab,
              backgroundColor: category === "ct" ? "#FD8A8A" : "grey",
            }}
            onPress={() => {
              setCategory("ct");
            }}
          >
            <Text style={styles.btnText}>CodingTest</Text>
          </TouchableOpacity>
        </View>
        {/* 탭박스 아래의 실선 */}
        {/* <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 5,
          }}
        /> */}

        {/* 상단 픽스 부분의 인풋박스 */}
        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={setText}
            onSubmitEditing={addTodo}
            value={text}
            style={styles.input}
            placeholder="Enter your task"
          ></TextInput>
        </View>

        {/* 투두가 쓰여지는 파트 */}

        <ScrollView style={styles.todoList}>
          {todos.map((todo) => {
            if (category === todo.category) {
              return (
                <View key={todo.id} style={styles.todo}>
                  {todo.isEdit ? (
                    <TextInput
                      onSubmitEditing={() => {
                        editTodo(todo.id);
                      }}
                      value={editText}
                      onChangeText={setEditText}
                      style={{ backgroundColor: "white", flex: "1" }}
                    />
                  ) : (
                    <Text
                      style={{
                        textDecorationLine: todo.isDone
                          ? "line-through"
                          : "none",
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
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  btnTab: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tab: {
    backgroundColor: "#FD8A8A",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "30%",
    alignItems: "center",
  },

  btnText: {
    fontWeight: "600",
  },

  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  // todoList: {
  //   width: "95%",
  //   // backgroundColor: "orange",
  // },

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
