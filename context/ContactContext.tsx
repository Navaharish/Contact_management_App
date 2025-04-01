import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../types/contact';

interface ContactContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  getContact: (id: string) => Contact | undefined;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

const STORAGE_KEY = '@contacts';

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load contacts from storage on app start
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
    loadContacts();
  }, []);

  // Save contacts to storage whenever they change
  useEffect(() => {
    const saveContacts = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
      } catch (error) {
        console.error('Error saving contacts:', error);
      }
    };
    saveContacts();
  }, [contacts]);

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (id: string, updatedContact: Partial<Contact>) => {
    setContacts(contacts.map(contact => 
      contact.id === id 
        ? { ...contact, ...updatedContact, updatedAt: new Date() }
        : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getContact = (id: string) => {
    return contacts.find(contact => contact.id === id);
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact, getContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
}; 