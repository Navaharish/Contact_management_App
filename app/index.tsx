import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AlphabeticalIndex } from '@/components/AlphabeticalIndex';
import { CategorySection } from '@/components/CategorySection';
import { ContactListItem } from '@/components/ContactListItem';
import { Ionicons } from '@expo/vector-icons';
import { useContacts } from '@/context/ContactContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { contacts, deleteContact } = useContacts();
  const router = useRouter();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleLetterPress = (letter: string) => {
    // Implement scrolling to section
  };

  const handleAddContact = () => {
    router.push('/new-contact');
  };

  const handleEditContact = (contactId: string) => {
    router.push({
      pathname: '/edit-contact',
      params: { id: contactId }
    });
  };

  const handleDeleteContact = (contactId: string) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteContact(contactId);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleToggleSelection = (contactId: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  const handleDeleteSelected = () => {
    if (selectedContacts.length === 0) return;

    Alert.alert(
      'Delete Selected Contacts',
      `Are you sure you want to delete ${selectedContacts.length} contact${selectedContacts.length > 1 ? 's' : ''}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            selectedContacts.forEach(id => deleteContact(id));
            setSelectedContacts([]);
            setSelectionMode(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedContacts([]);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.title}>Contacts</ThemedText>
        <View style={styles.headerButtons}>
          {selectionMode ? (
            <>
              {selectedContacts.length > 0 && (
                <TouchableOpacity
                  style={[styles.headerButton, styles.deleteButton]}
                  onPress={handleDeleteSelected}
                >
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.headerButton}
                onPress={toggleSelectionMode}
              >
                <Ionicons name="close" size={24} color="#9BA1A6" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={toggleSelectionMode}
            >
              <Ionicons name="checkmark" size={24} color="#9BA1A6" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color="#9BA1A6" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Categories */}
        <CategorySection
          title="Profile"
          icon="person"
          color="#4F46E5"
          onPress={() => {}}
        />
        <CategorySection
          title="Groups"
          icon="people"
          color="#06B6D4"
          onPress={() => {}}
        />
        <CategorySection
          title="Favorites"
          icon="star"
          color="#F59E0B"
          onPress={() => {}}
        />

        {/* Contacts List */}
        {contacts.map((contact) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            selectionMode={selectionMode}
            isSelected={selectedContacts.includes(contact.id)}
            onSelect={() => handleToggleSelection(contact.id)}
            onDelete={() => handleDeleteContact(contact.id)}
            onEdit={() => handleEditContact(contact.id)}
          />
        ))}
      </ScrollView>

      {/* Alphabetical Index */}
      <AlphabeticalIndex onLetterPress={handleLetterPress} />

      {/* FAB - Always visible */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleAddContact}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </ThemedView>
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
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 2,
  },
}); 