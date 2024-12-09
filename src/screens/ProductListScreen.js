import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ProductListScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        const productsList = [];
        querySnapshot.forEach(doc => {
          productsList.push({...doc.data(), id: doc.id});
        });
        setProducts(productsList);
      });

    return () => unsubscribe();
  }, []);

  const handleRemove = async (productId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('Attempting to delete product with ID:', productId);
              await firestore().collection('products').doc(productId).delete();
              console.log('Product deleted successfully');
              Alert.alert('Success', 'Product removed successfully');
            } catch (error) {
              console.error('Failed to delete product:', error);
              Alert.alert('Error', 'Failed to remove product');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.product}>
            <Text>{item.name}</Text>
            <Text>Stock: {item.stock}</Text>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate('EditProduct', {productId: item.id})
              }
            />
            <Button
              title="Remove"
              color="red"
              onPress={() => handleRemove(item.id)}
            />
          </View>
        )}
      />
      <Button
        title="Add Product"
        onPress={() => navigation.navigate('AddProduct')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  product: {padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10},
});

export default ProductListScreen;
