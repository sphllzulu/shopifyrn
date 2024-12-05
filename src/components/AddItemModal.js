import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from '../redux/shoppingListSlice';
import { colors } from '../theme/colors';
import {Picker} from '@react-native-picker/picker';

const AddItemModal = ({ 
  visible, 
  onClose, 
  editingItem = null  
}) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState('groceries');
  const dispatch = useDispatch();
  
  // Get current user from Redux state
  const { user } = useSelector(state => state.auth);

  // Effect to populate modal with existing item details when editing
  useEffect(() => {
    if (editingItem) {
      setItemName(editingItem.name);
      setQuantity(editingItem.quantity.toString());
      setCategory(editingItem.category);
    } else {
      // Reset to defaults when not editing
      setItemName('');
      setQuantity('1');
      setCategory('groceries');
    }
  }, [editingItem, visible]);

  const handleSubmit = () => {
    if (itemName.trim()) {
      if (editingItem) {
        // Update existing item
        dispatch(updateItem({
          itemId: editingItem.id,
          userId: user.userId,
          name: itemName.trim(),
          quantity: parseInt(quantity) || 1,
          category
        }));
      } else {
        // Add new item
        dispatch(addItem({
          name: itemName.trim(),
          quantity: parseInt(quantity) || 1,
          userId: user.userId,
          category
        }));
      }
      
      // Reset inputs and close modal
      setItemName('');
      setQuantity('1');
      setCategory('groceries');
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
          <Text style={styles.modalTitle}>
            {editingItem ? 'Edit Shopping Item' : 'Add Shopping Item'}
          </Text>
          
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
              onPress={handleSubmit}
            >
              <Text style={styles.addButtonText}>
                {editingItem ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.text,
    alignSelf: 'flex-start'
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cancelButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center'
  },
  cancelButtonText: {
    color: 'white'
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center'
  },
  addButtonText: {
    color: 'white'
  }
});

export default AddItemModal;