import { StyleSheet, Image } from 'react-native';

import { CollapsibleButton } from '@/components/CollapsibleButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import IMAGES from '@/assets/images';
import { Button } from '@/components/Button';
import { WIDTH } from '@/assets/styles';

export default function ProfileScreen() {
  return (
    <>
    <Stack.Screen options={{
      headerShown: true,
      title: 'Profile' 
    }} />
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerContent}>
          <Image source={IMAGES.profile} style={styles.profileImage}></Image>
          <ThemedText style={styles.postStyle} type='defaultSemiBold'>Cherly Tiara </ThemedText>
        </ThemedView>
        <ThemedView style={styles.postContent}>
          <ThemedText style={styles.postStyle} type='defaultSemiBold'>1</ThemedText>
          <ThemedText style={styles.postStyle} type='defaultSemiBold'>Posts</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <CollapsibleButton title='Edit Profile' style={styles.collapsibleButton}>
          <ThemedText>Page Edit Profile</ThemedText>
        </CollapsibleButton>
        <CollapsibleButton title='Post' style={styles.collapsibleButton}>
          <ThemedText>Page Edit Profile</ThemedText>
        </CollapsibleButton>
        <Button link='logout' label='Log Out' style={{ width: WIDTH }} color='black' bold={true} rounded={false} shadow={true}/>
      </ThemedView>
    </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 7,
  },
  postContent: {
    alignItems: 'center',
  },
  postStyle: {
    fontSize: 18,
  },
  collapsibleButton: {
    marginBottom: 16,
  },
});
