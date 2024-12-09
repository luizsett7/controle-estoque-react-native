import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params; 
  const [productName, setProductName] = useState('');
  const [productStock, setProductStock] = useState('');

  useEffect(() => {    
    const fetchProduct = async () => {
      try {
        const product = await firestore().collection('products').doc(productId).get();
        if (product.exists) {
          const { name, stock } = product.data();
          setProductName(name);
          setProductStock(stock.toString());
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch product details');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSave = async () => {
    if (!productName || !productStock) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await firestore().collection('products').doc(productId).update({
        name: productName,
        stock: parseInt(productStock, 10),
      });
      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock Quantity"
        value={productStock}
        onChangeText={setProductStock}
        keyboardType="numeric"
      />
      <Button title="Save Changes" onPress={handleSave} />
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
    marginBottom: 15,
  },
});

export default EditProductScreen;
