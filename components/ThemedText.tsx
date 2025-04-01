import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'small' ? styles.small : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'System',
  },
  defaultSemiBold: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'System',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily: 'System',
  },
  link: {
    lineHeight: 24,
    fontSize: 15,
    color: '#8B5CF6',
    fontFamily: 'System',
  },
  small: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'System',
  },
});
