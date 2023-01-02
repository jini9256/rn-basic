import { StatusBar } from "expo-status-bar";
import Tabs from "./components/Tabs";
import Todo from "./components/Todo";
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

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // Add Todo만들기
  // 인풋창에서 엔터누르면 투두가 추가된다

  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [editText, setEditText] = useState("");

  // console.log("edit", editText);

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

  // todos가 변할때마다 저장해준다
  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    if (todos.length > 0) saveTodos();
  }, [todos]);

  useEffect(() => {
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem("todos");
      const resp_cat = await AsyncStorage.getItem("category");
      setTodos(JSON.parse(resp_todos) ?? []);
      setCategory(resp_cat ?? "js");
    };
    getData();
  }, []);

  const setCat = async (cat) => {
    // console.log("cat", cat);
    setCategory(cat);
    await AsyncStorage.setItem("category", cat);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Tabs setCat={setCat} category={category} />

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
                <Todo
                  key={todo.id}
                  todo={todo}
                  editTodo={editTodo}
                  setDone={setDone}
                  setEdit={setEdit}
                  deleteTodo={deleteTodo}
                  setEditText={setEditText}
                  editText={editText}
                />
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
});
