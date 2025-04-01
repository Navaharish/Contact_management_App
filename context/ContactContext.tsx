import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../types/contact';

type ContactContextType = {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  getFavorites: () => Contact[];
  getContactsByLetter: (letter: string) => Contact[];
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const savedContacts = await AsyncStorage.getItem('contacts');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const saveContacts = async (newContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavorite: false,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    await saveContacts(newContacts);
  };

  const updateContact = async (id: string, updatedFields: Partial<Contact>) => {
    const newContacts = contacts.map(contact =>
      contact.id === id
        ? { ...contact, ...updatedFields, updatedAt: new Date() }
        : contact
    );
    setContacts(newContacts);
    await saveContacts(newContacts);
  };

  const deleteContact = async (id: string) => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
    await saveContacts(newContacts);
  };

  const toggleFavorite = async (id: string) => {
    const newContacts = contacts.map(contact =>
      contact.id === id
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    );
    setContacts(newContacts);
    await saveContacts(newContacts);
  };

  const getFavorites = () => {
    return contacts.filter(contact => contact.isFavorite);
  };

  const getContactsByLetter = (letter: string) => {
    return contacts.filter(contact => 
      contact.name.toUpperCase().startsWith(letter.toUpperCase())
    );
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        toggleFavorite,
        getFavorites,
        getContactsByLetter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
} 