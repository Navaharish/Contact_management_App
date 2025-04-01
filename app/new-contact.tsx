import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContacts } from '@/context/ContactContext';
import * as ImagePicker from 'expo-image-picker';

export default function NewContactScreen() {
  const router = useRouter();
  const { addContact } = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    phoneNumber: '',
    email: '',
    phoneLabel: 'Mobile',
    emailLabel: 'Personal',
    profileImage: '',
  });

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your photo library to add a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    if (formData.name && formData.phoneNumber) {
      await addContact({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        company: formData.company,
        title: formData.title,
        profileImage: formData.profileImage,
      });
      router.back();
    } else {
      Alert.alert('Required Fields', 'Please enter at least a name and phone number.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#9BA1A6" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>New contact</ThemedText>
        <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
          <Ionicons name="checkmark" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Picture */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profilePicture} onPress={handleImagePick}>
            {formData.profileImage ? (
              <Image source={{ uri: formData.profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="add" size={40} color="#8B5CF6" />
            )}
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={24} color="#9BA1A6" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#9BA1A6"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="business-outline" size={24} color="#9BA1A6" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Company"
              placeholderTextColor="#9BA1A6"
              value={formData.company}
              onChangeText={(text) => setFormData({ ...formData, company: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="briefcase-outline" size={24} color="#9BA1A6" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#9BA1A6"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="call-outline" size={24} color="#9BA1A6" style={styles.inputIcon} />
            <View style={styles.inputWithLabel}>
              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#9BA1A6"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                keyboardType="phone-pad"
              />
              <TouchableOpacity style={styles.labelButton}>
                <ThemedText style={styles.labelText}>{formData.phoneLabel}</ThemedText>
                <Ionicons name="chevron-down" size={16} color="#9BA1A6" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={24} color="#9BA1A6" style={styles.inputIcon} />
            <View style={styles.inputWithLabel}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9BA1A6"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.labelButton}>
                <ThemedText style={styles.labelText}>{formData.emailLabel}</ThemedText>
                <Ionicons name="chevron-down" size={16} color="#9BA1A6" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save To Section */}
        <View style={styles.saveToSection}>
          <ThemedText style={styles.sectionTitle}>Save to</ThemedText>
          <TouchableOpacity style={styles.saveToButton}>
            <ThemedText style={styles.saveToText}>Phone</ThemedText>
            <Ionicons name="chevron-down" size={16} color="#9BA1A6" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 32,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  formSection: {
    padding: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#ECEDEE',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    backgroundColor: 'transparent',
  },
  inputWithLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  labelText: {
    marginRight: 4,
    color: '#9BA1A6',
  },
  saveToSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  saveToButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  saveToText: {
    fontSize: 16,
    color: '#9BA1A6',
  },
}); 