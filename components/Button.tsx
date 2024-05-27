import { type TextProps, StyleSheet } from 'react-native';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';
import { SHADOW, WIDTH } from '@/assets/styles';

export type InputTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  bold?: boolean;
  link?: string;
  label?: string;
  bottom?: boolean;
  color?: string;
  rounded?: boolean;
  shadow?: boolean;
};

export function Button({
  link = '',
  label = "text",
  style,
  color = 'black',
  bold = false,
  lightColor,
  darkColor,
  rounded = true,
  shadow = false,
  bottom = false,
  ...rest
}: InputTextProps) {

  return (
    <ThemedView style={[
      styles.buttonContainer, 
      bottom ? styles.positionButton: null 
    ]}>
        <ThemedView style={[styles.buttonStyle, rounded ? {borderRadius: 50}: null, style, shadow ? SHADOW : null]}>
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
    width: WIDTH - 100,
    alignItems: 'center',
  },
  positionButton:{
    position: 'absolute',
    bottom: 50
  }
});
