
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';


const PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 59.99,
    image: require('./assets/adaptive-icon.png'),
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 99.99,
    image: require('./assets/icon.png'),
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    price: 39.99,
    image: require('./assets/splash-icon.png'),
  },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🛒 My E-Commerce Store</Text>
      </View>
      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => addToCart(item)}>
              <Text style={styles.buyButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#888', marginVertical: 16 }}>Cart is empty.</Text>
      ) : (
        <View style={styles.cartContainer}>
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.cartImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartQty}>Qty: {item.qty}</Text>
                <Text style={styles.cartPrice}>${(item.price * item.qty).toFixed(2)}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeBtn}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.cartSummary}>
            <Text style={styles.totalText}>Total: ${getTotal()}</Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert('Checkout is not implemented in this demo.') }>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#222',
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 15,
    color: '#888',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  cartImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 6,
  },
  cartName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  cartQty: {
    fontSize: 13,
    color: '#555',
  },
  cartPrice: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  removeBtn: {
    color: '#ff4444',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cartSummary: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  checkoutBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});