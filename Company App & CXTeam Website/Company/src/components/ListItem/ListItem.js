import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const data={
  "name":"Name",
  "address":"Address",
  "phone":"Phone",
  "dob":"Date of Birth",
  "gender":"Gender"
}

const ListItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Text style={styles.textStyle}>{data[props.attributeName]+": "+props.attributeValue}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection:"row",
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    alignItems:'center',
  },
  textStyle:{
    fontSize:20,
    color:"black",
  }
});

export default ListItem;