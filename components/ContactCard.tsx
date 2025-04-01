import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  onDelete: () => void;
  onEdit: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
        <Text style={styles.email}>{contact.email}</Text>
        {contact.address && <Text style={styles.address}>{contact.address}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  address: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
}); 