import * as React from 'react';
import { ActivityIndicator,Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';



import { Card } from 'react-native-paper';

export default function Loading() {
  return (
    <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });