import React from 'react';
import { Stack } from 'expo-router';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HEIGHT, WIDTH } from '@/assets/styles';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/Button';
import IMAGES from '@/assets/images';

export default function SingInScreen() {
  return (
    <>
    <Stack.Screen options={{
        headerShown: false,
      }} />
      {/* <ScrollView> */}
        <ThemedView style={styles.container}>
          <ThemedView style={styles.singInContainer}>
            <ThemedView style={{ backgroundColor: 'Transparent' }}>
              <ThemedText style={styles.titleStyle}>Login Account</ThemedText>
              <ThemedText style={styles.textStyle}>sign in and start shopping </ThemedText>
            </ThemedView>
            <ThemedView style={styles.formContainer}>
              <InputText label='Email' placeholder='cherlytiara@gmail.com' top={25} bold={true} />
              <InputText label='Password' passwordInput={true} top={10} bold={true}/>
              <Button link='(tabs)' label='Login Account' style={styles.buttonStyle} color='white' bold={true} />
              <ThemedView style={styles.bottomTextFormContainer}>
                <ThemedText style={styles.fromTextStyle}>Or continue with</ThemedText>
                <ThemedView style={styles.auth2Container}>
                  <TouchableOpacity>
                    <ImageBackground style={styles.imgBackground} resizeMode="cover" source={IMAGES.googleLogo}></ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <ImageBackground style={styles.imgBackground} resizeMode="cover" source={IMAGES.instagramLogo}></ImageBackground>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#092B17',
    height: HEIGHT,
  },
  imgBackground: {
    width: 50,
    height: 50,
  },
  singInContainer:{
    alignItems: 'center',
    backgroundColor: '#2C4A38',
    borderRadius: 40,
    marginBottom: 50,
    marginTop: 63,
    height: HEIGHT
  },
  formContainer:{
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 40,
  },
  bottomTextFormContainer:{
    paddingHorizontal: 22, 
    marginVertical: 22, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  auth2Container:{
    flexDirection: 'row', 
    marginTop: 20, 
    marginBottom: 20
  },
  titleStyle:{
    color: '#fff', 
    fontSize: 30,
    marginBottom: 20,
    marginTop: 50
  },
  textStyle:{
    color: '#fff', 
    fontSize: 18
  },
  fromTextStyle:{
    fontSize: 18
  },
  buttonStyle:{
    marginTop: 20, 
    backgroundColor: '#000', 
    color: '#fff'
  },
});
