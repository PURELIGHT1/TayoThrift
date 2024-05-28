import { Stack, useRouter } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';
import IMAGES from '@/assets/images';
import { HEIGHT, WIDTH } from '@/assets/styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/Button';
import { LoginAsyncStorage, getLoginAsyncStorage } from '@/hooks/hooksAsyncStorage';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { storage } from '@/firebaseconfig';

export default function LandingPageScreen() {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState<LoginAsyncStorage | null>({
    email: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getLocal = async () => {
      try {
        const data = await getLoginAsyncStorage();
        setDataLogin(data);
      } catch (error) {
        console.log('Error saat mengambil data dari async storage:', error);
      }
    }

    getLocal();
  },[]);

  useEffect(() => {
    const checkLoginRef = ref(storage, 'login');
    onValue(checkLoginRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataInDatabase = snapshot.val();
        Object.keys(dataInDatabase).forEach((key) => {
          const userData = dataInDatabase[key];
          if (userData.email === dataLogin?.email && userData.password === dataLogin?.password) {
            setLoggedIn(true);
            return;
          }
        });
      } 
    });
  }, [dataLogin, router]);

  useEffect(() => {
    if (loggedIn) {
      router.push('(tabs)');
    }
  }, [loggedIn, router]);

  return (
    <>
      <Stack.Screen options={{
        headerShown: false,
      }} />
      <ThemedView style={styles.container}>
        <ImageBackground style={styles.imgBackground} resizeMode="cover" source={IMAGES.landingPage}>
          <ThemedView style={styles.textContainer}>
            <ThemedText style={styles.textStyle}>Old Treasure</ThemedText>
            <ThemedText style={[styles.textStyle,{fontStyle: 'italic'}]} type="defaultSemiBold">New Happiness</ThemedText>
          </ThemedView>
          <Button label="Get Started" link="login" bottom={true} />
        </ImageBackground>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#092B17',
  },
  imgBackground: {
    width: WIDTH,
    height: HEIGHT,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'Transparent',
    marginTop: 100
  },
  textStyle:{
    color: '#fff', 
    fontSize: 24
  },
});