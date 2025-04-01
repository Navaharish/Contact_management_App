import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ContactForm } from '../components/ContactForm';
import { useContacts } from '../context/ContactContext';
import { Contact } from '../types/contact';

export default function EditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getContact, updateContact } = useContacts();
  const contact = getContact(id as string);

  if (!contact) {
    return null;
  }

  const handleUpdateContact = (updatedContact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    updateContact(contact.id, updatedContact);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ContactForm
        initialData={contact}
        onSubmit={handleUpdateContact}
        onCancel={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 