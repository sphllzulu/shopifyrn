import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../theme/colors';
import { 
  togglePurchased, 
  removeItem,
  initializeUserItems
} from '../redux/shoppingListSlice';
import { logout } from '../redux/AuthSlice';
import AddItemModal from './AddItemModal';

const ShoppingList = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();

  // Get current user and shopping items from Redux state
  const { user } = useSelector(state => state.auth);
  const shoppingItems = useSelector(state => 
    state.shoppingList.items.filter(item => item.userId === user?.userId)
  );

  // Initialize user-specific items when component mounts
  useEffect(() => {
    if (user && user.userId) {
      dispatch(initializeUserItems({ userId: user.userId }));
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            navigation.replace('Auth');
          }
        }
      ]
    );
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => dispatch(togglePurchased({
          itemId: item.id, 
          userId: user.userId
        }))}>
        {item.purchased && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      
      <View style={styles.itemTextContainer}>
        <Text 
          style={[styles.itemText, item.purchased && styles.purchasedItem]}>
          {item.name}
        </Text>
        {item.quantity > 1 && (
          <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
        )}
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      
      <View style={styles.itemActions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditItem(item)}>
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => dispatch(removeItem({
            itemId: item.id, 
            userId: user.userId
          }))}>
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={shoppingItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your shopping list is empty</Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <AddItemModal 
        visible={isModalVisible}
        onClose={closeModal}
        editingItem={editingItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkmark: {
    color: colors.primary,
    fontWeight: 'bold'
  },
  itemText: {
    color: colors.text
  },
  quantityText: {
    color: colors.accent,
    fontSize: 12
  },
  categoryText: {
    color: colors.accent,
    fontSize: 12
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: colors.accent
  },
  editButton: {
    marginRight: 10
  },
  editButtonText: {
    fontSize: 20
  },
  deleteButton: {
    fontSize: 20
  },
  logoutButton: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold'
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  emptyText: {
    color: colors.accent,
    fontSize: 16
  }
});

export default ShoppingList;