import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ContactCard } from '../components/ContactCard';
import { ContactForm } from '../components/ContactForm';
import { useContacts } from '../context/ContactContext';
import { Contact } from '../types/contact';

export default function HomeScreen() {
  const router = useRouter();
  const { contacts, deleteContact, addContact } = useContacts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddContact = (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    addContact(contact);
    setShowAddForm(false);
  };

  const handleEditContact = (contact: Contact) => {
    router.push({
      pathname: "/(tabs)/explore",
      params: { id: contact.id }
    });
  };

  const handleDeleteContact = (id: string) => {
    deleteContact(id);
  };

  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.phone.includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      (contact.address && contact.address.toLowerCase().includes(searchLower))
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddForm(true)}
        >
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {showAddForm ? (
        <ContactForm
          onSubmit={handleAddContact}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onDelete={() => handleDeleteContact(item.id)}
              onEdit={() => handleEditContact(item)}
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery ? 'No contacts found' : 'No contacts yet'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ECEDEE',
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  searchInput: {
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    color: '#ECEDEE',
  },
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 15,
    color: '#9BA1A6',
  },
}); 