// // src/components/ShoppingList.js
// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   TouchableOpacity, 
//   StyleSheet, 
//   TextInput,
//   Alert
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { colors } from '../theme/colors';
// import { 
//   addItem, 
//   togglePurchased, 
//   removeItem 
// } from '../redux/shoppingListSlice';
// import { logout } from '../redux/AuthSlice';

// const ShoppingList = ({ navigation }) => {
//   const [newItem, setNewItem] = useState('');
//   const dispatch = useDispatch();
//   const shoppingItems = useSelector(state => state.shoppingList.items);

//   const handleAddItem = () => {
//     if (newItem.trim()) {
//       dispatch(addItem({ name: newItem }));
//       setNewItem('');
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to log out?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel'
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: () => {
//             dispatch(logout());
//             navigation.replace('Auth');
//           }
//         }
//       ]
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <TouchableOpacity 
//         style={styles.checkbox}
//         onPress={() => dispatch(togglePurchased(item.id))}
//       >
//         {item.purchased && <Text style={styles.checkmark}>✓</Text>}
//       </TouchableOpacity>
//       <Text 
//         style={[
//           styles.itemText, 
//           item.purchased && styles.purchasedItem
//         ]}
//       >
//         {item.name}
//       </Text>
//       <TouchableOpacity 
//         onPress={() => dispatch(removeItem(item.id))}
//       >
//         <Text style={styles.deleteButton}>🗑️</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newItem}
//           onChangeText={setNewItem}
//           placeholder="Add new shopping item"
//           placeholderTextColor={colors.accent}
//         />
//         <TouchableOpacity 
//           style={styles.addButton} 
//           onPress={handleAddItem}
//         >
//           <Text style={styles.addButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>
      
//       <FlatList
//         data={shoppingItems}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>Your shopping list is empty</Text>
//           </View>
//         }
//       />
      
//       <TouchableOpacity 
//         style={styles.logoutButton} 
//         onPress={handleLogout}
//       >
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     padding: 20
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginBottom: 20
//   },
//   input: {
//     flex: 1,
//     backgroundColor: colors.lightOrange,
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10,
//     color: colors.text
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     paddingHorizontal: 15
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 24
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.secondary,
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderWidth: 2,
//     borderColor: colors.primary,
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   checkmark: {
//     color: colors.primary,
//     fontWeight: 'bold'
//   },
//   itemText: {
//     flex: 1,
//     color: colors.text
//   },
//   purchasedItem: {
//     textDecorationLine: 'line-through',
//     color: colors.accent
//   },
//   deleteButton: {
//     fontSize: 20
//   },
//   logoutButton: {
//     backgroundColor: colors.accent,
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center'
//   },
//   logoutText: {
//     color: 'white',
//     fontWeight: 'bold'
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     marginTop: 50
//   },
//   emptyText: {
//     color: colors.accent,
//     fontSize: 16
//   }
// });

// export default ShoppingList;


// src/components/ShoppingList.js
import React, { useState } from 'react';
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
  removeItem 
} from '../redux/shoppingListSlice';
import { logout } from '../redux/AuthSlice';
import AddItemModal from './AddItemModal';

const ShoppingList = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const shoppingItems = useSelector(state => state.shoppingList.items);

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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => dispatch(togglePurchased(item.id))}
      >
        {item.purchased && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <View style={styles.itemTextContainer}>
        <Text 
          style={[
            styles.itemText, 
            item.purchased && styles.purchasedItem
          ]}
        >
          {item.name}
        </Text>
        {item.quantity > 1 && (
          <Text style={styles.quantityText}>
            Qty: {item.quantity}
          </Text>
        )}
      </View>
      <TouchableOpacity 
        onPress={() => dispatch(removeItem(item.id))}
      >
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setIsModalVisible(true)}
      >
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
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <AddItemModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: colors.text,
    flex: 1
  },
  quantityText: {
    color: colors.accent,
    fontSize: 12,
    marginLeft: 10
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: colors.accent
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