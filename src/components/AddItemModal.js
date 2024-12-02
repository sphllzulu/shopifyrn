
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../theme/colors';
import { addItem } from '../redux/shoppingListSlice';

const AddItemModal = ({ visible, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (itemName.trim()) {
      dispatch(addItem({ 
        name: itemName,
        quantity: parseInt(quantity) || 1
      }));
      
      // Reset and close
      setItemName('');
      setQuantity('1');
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Shopping Item</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
            placeholderTextColor={colors.accent}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholderTextColor={colors.accent}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.addButton]} 
              onPress={handleAddItem}
            >
              <Text style={styles.buttonTextAdd}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15
  },
  input: {
    width: '100%',
    backgroundColor: colors.lightOrange,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: colors.text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '48%'
  },
  cancelButton: {
    backgroundColor: colors.accent
  },
  addButton: {
    backgroundColor: colors.primary
  },
  buttonTextCancel: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonTextAdd: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default AddItemModal;