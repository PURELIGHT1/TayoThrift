import { type TextProps, StyleSheet, TextInput } from 'react-native';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export type InputTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  label?: string;
  placeholder?: string;
  top?: number;
  passwordInput?: boolean;
  bold?: boolean;
};

export function InputText({
  style,
  label = 'text',
  passwordInput = false,
  top = 0,
  placeholder = 'text',
  bold = false,
  lightColor,
  darkColor,
  ...rest
}: InputTextProps) {

  return (
    <ThemedView style={[styles.container, {marginTop: top}]}>
        <ThemedText style={{marginBottom: 15}} type={bold ? 'defaultSemiBold': 'default'}>{label}</ThemedText>
        {passwordInput &&         
        <TextInput 
            secureTextEntry={true}
            placeholder={placeholder === "text" ? '********': placeholder}
            style={[
                styles.textInputStyle, 
                style
            ]} 
            {...rest}
        />}
        {!passwordInput && 
        <TextInput 
            placeholder={placeholder}
            style={[
                styles.textInputStyle, 
                style
            ]} 
            {...rest}
        />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 22, 
    backgroundColor: 'Transparent',
    marginBottom: 20,
  },
  textInputStyle:{
    backgroundColor: '#D9D9D9', 
    padding: 11, 
    borderRadius: 10, 
    borderColor: '#D9D9D9'
  }
});
