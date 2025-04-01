import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ContactProvider } from '../context/ContactContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ContactProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Contacts',
            }}
          />
          <Stack.Screen
            name="edit-contact"
            options={{
              title: 'Edit Contact',
            }}
          />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ContactProvider>
    </ThemeProvider>
  );
}
