import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { ThemedText } from './ThemedText';
import { Contact } from '../types/contact';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

type ContactListItemProps = {
  contact: Contact;
  isSelected?: boolean;
  onSelect?: () => void;
  selectionMode?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function ContactListItem({ 
  contact, 
  isSelected = false, 
  onSelect,
  selectionMode = false,
  onDelete,
  onEdit,
}: ContactListItemProps) {
  const [expanded, setExpanded] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);

  const handlePress = () => {
    if (selectionMode && onSelect) {
      onSelect();
    } else {
      setExpanded(!expanded);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      swipeableRef.current?.close();
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      swipeableRef.current?.close();
    }
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightActions}>
        <Animated.View style={[styles.rightAction, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.leftActions}>
        <Animated.View style={[styles.leftAction, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEdit}
          >
            <Ionicons name="pencil-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        rightThreshold={40}
        leftThreshold={40}
        overshootRight={false}
        overshootLeft={false}
      >
        <TouchableOpacity 
          style={[
            styles.container,
            isSelected && styles.selectedContainer
          ]} 
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <View style={styles.row}>
            <View style={styles.avatarContainer}>
              {contact.profileImage ? (
                <Image source={{ uri: contact.profileImage }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.defaultAvatar]}>
                  <ThemedText style={styles.avatarText}>
                    {contact.name.charAt(0).toUpperCase()}
                  </ThemedText>
                </View>
              )}
            </View>
            <View style={styles.details}>
              <ThemedText style={styles.name}>{contact.name}</ThemedText>
              <ThemedText style={styles.phone}>{contact.phoneNumber}</ThemedText>
              {expanded && (
                <>
                  {contact.email && <ThemedText style={styles.info}>{contact.email}</ThemedText>}
                  {contact.address && <ThemedText style={styles.info}>{contact.address}</ThemedText>}
                </>
              )}
            </View>
            {selectionMode && (
              <View style={styles.checkbox}>
                <Ionicons 
                  name={isSelected ? "checkmark-circle" : "ellipse-outline"} 
                  size={24} 
                  color={isSelected ? "#8B5CF6" : "#9BA1A6"} 
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    backgroundColor: '#1F2937',
  },
  container: {
    padding: 16,
    backgroundColor: '#1F2937',
    marginBottom: 1,
  },
  selectedContainer: {
    backgroundColor: '#374151',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  defaultAvatar: {
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9BA1A6',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#9BA1A6',
  },
  info: {
    fontSize: 14,
    color: '#9BA1A6',
    marginTop: 4,
  },
  checkbox: {
    marginLeft: 12,
  },
  rightActions: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  leftActions: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  editButton: {
    backgroundColor: '#8B5CF6',
  },
}); 