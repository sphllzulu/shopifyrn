import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Picker } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../redux/shoppingListSlice';
import { colors } from '../theme/colors';

const UpdateItemModal = ({ visible, onClose, item }) => {
  const [itemName, setItemName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [category, setCategory] = useState(item.category);
  const dispatch = useDispatch();
  
  // Get current user from Redux state
  const { user } = useSelector(state => state.auth);

  const handleUpdateItem = () => {
    if (itemName.trim()) {
      dispatch(updateItem({
        itemId: item.id,
        updatedFields: {
          name: itemName.trim(),
          quantity: parseInt(quantity) || 1,
          category: category || 'groceries',
        },
        userId: user.userId,
      }));

      // Close modal after update
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Shopping Item</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
          
          {/* Category Picker */}
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={itemValue => setCategory(itemValue)}
          >
            <Picker.Item label="Groceries" value="groceries" />
            <Picker.Item label="Toiletries" value="toiletries" />
            <Picker.Item label="Household" value="household" />
          </Picker>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleUpdateItem}
            >
              <Text style={styles.addButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles remain the same
export default UpdateItemModal;
