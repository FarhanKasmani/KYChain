import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const List = props => {
  
  return (
    <FlatList
      style={styles.listContainer}
      data={props.data}
      renderItem={(info) => (
        <ListItem
          attributeName={info.item.key}
          attributeValue={info.item.value}
        />
      )}
    //   keyExtractor={(info, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default List;