import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Routes } from './Routes';

export const App = () => {
  
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Routes/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: "100%",
    maxWidth: 425,
  }
});
