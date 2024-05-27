import { Stack } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';
import IMAGES from '@/assets/images';
import { HEIGHT, WIDTH } from '@/assets/styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/Button';

export default function LandingPageScreen() {
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