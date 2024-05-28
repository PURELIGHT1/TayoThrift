import { StyleSheet, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export type InputTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  label?: string;
  placeholder?: string;
  top?: number;
  passwordInput?: boolean;
  bold?: boolean;
  horizontal? : boolean;
};

export function InputText({
  label = 'text',
  passwordInput = false,
  top = 0,
  placeholder = 'text',
  bold = false,
  lightColor,
  darkColor,
  horizontal = true,
  ...inputProps
}: InputTextProps) {
  return (
    <ThemedView style={[styles.container, {marginTop: top}, horizontal && {paddingHorizontal: 22}]}>
        <ThemedText style={{marginBottom: 15}} type={bold ? 'defaultSemiBold': 'default'}>{label}</ThemedText>
        {passwordInput  &&    
        <TextInput 
            secureTextEntry={true}
            placeholder={placeholder === "text" ? '********': placeholder}
            style={[
                styles.textInputStyle, 
                inputProps.style
            ]} 
            {...inputProps}
        />}
        {!passwordInput && 
        <TextInput 
            placeholder={placeholder}
            style={[
                styles.textInputStyle, 
                inputProps.style
            ]} 
            {...inputProps}
        />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'Transparent',
    marginBottom: 20,
  },
  textInputStyle:{
    backgroundColor: '#D9D9D9', 
    padding: 11, 
    borderRadius: 10, 
    borderColor: '#D9D9D9'
  },
  fileInputStyle: {
    backgroundColor: '#D9D9D9',
    padding: 11,
    borderRadius: 10,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
