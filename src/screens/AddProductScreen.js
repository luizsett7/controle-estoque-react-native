import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');

  const addProduct = async () => {
    if (!name || !stock) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await firestore().collection('products').add({
        name,
        stock: parseInt(stock, 10), 
      });
      Alert.alert('Success', 'Product added successfully!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock Quantity"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    borderColor: '#ccc',
  },
});

export default AddProductScreen;
