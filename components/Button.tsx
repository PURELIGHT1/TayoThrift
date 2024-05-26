import { type TextProps, StyleSheet, TextInput } from 'react-native';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';
import { WIDTH } from '@/assets/styles';

export type InputTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  bold?: boolean;
  link?: string;
  label?: string;
  bottom?: boolean;
  color?: string;
};

export function Button({
  link = '',
  label = "text",
  style,
  color = 'black',
  bold = false,
  lightColor,
  darkColor,
  bottom = false,
  ...rest
}: InputTextProps) {

  return (
    <ThemedView style={[
      styles.buttonContainer, 
      bottom ? styles.positionButton: null 
    ]}>
        <ThemedView style={[styles.buttonStyle, style]}>
            <Link href={link} >
                <ThemedText type={bold ? 'defaultSemiBold': 'default'} style={{color: color}}>{label}</ThemedText>
            </Link>
        </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
 buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'Transparent',
    width: WIDTH
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 50,
    width: WIDTH - 100,
    alignItems: 'center',
  },
  positionButton:{
    position: 'absolute',
    bottom: 50
  }
});
