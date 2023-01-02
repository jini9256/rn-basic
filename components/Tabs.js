import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Tabs({ setCat, category }) {
  return (
    <View style={styles.btnTab}>
      <TouchableOpacity
        style={{
          ...styles.tab,
          backgroundColor: category === "js" ? "#FD8A8A" : "grey",
        }}
        onPress={() => {
          setCat("js");
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
          setCat("react");
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
          setCat("ct");
        }}
      >
        <Text style={styles.btnText}>CodingTest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
