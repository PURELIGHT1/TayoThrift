import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Linking, ScrollView, ActivityIndicator } from 'react-native';
import { CollapsibleButton } from '@/components/CollapsibleButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import IMAGES from '@/assets/images';
import { Button } from '@/components/Button';
import { WIDTH } from '@/assets/styles';
import { InputText } from '@/components/InputText';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '@/firebaseconfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ProfileScreen :React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const selectFile = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert("Izin akses ke perpustakaan gambar diperlukan!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
        console.log('Pemilihan dokumen dibatalkan', err);
    }
  };

  const uploadImage = async () => {
    if (selectedImage === null) {
      alert('Pilih gambar terlebih dahulu');
      return;
    }

    setUploading(true);
    const response = await fetch(selectedImage);
    const blob = await response.blob();
    const fileName = `images/${Date.now()}_${selectedImage.split('/').pop()}`;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress:', progress, '%');
      },
      (error) => {
        console.error(error);
        alert('Upload gagal');
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File tersedia di', downloadURL);
        alert(`Upload berhasil File tersedia di ${downloadURL}`);
        setUploading(false);
      })
    
  };
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerContent}>
          <Image source={IMAGES.profile} style={styles.profileImage} />
          <ThemedText style={styles.postStyle} type="defaultSemiBold">
            Cherly Tiara
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.postContent}>
          <ThemedText style={styles.postStyle} type="defaultSemiBold">
            1
          </ThemedText>
          <ThemedText style={styles.postStyle} type="defaultSemiBold">
            Posts
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <CollapsibleButton title="Edit Profile" style={styles.collapsibleButton}>
          <ThemedText>Page Edit Profile</ThemedText>
        </CollapsibleButton>
        <CollapsibleButton title="Post" style={styles.collapsibleButton}>
          <ThemedView style={styles.containerFile}>
            <ThemedText style={{ marginBottom: 15 }} type="default">
              Postingan
            </ThemedText>
            <TouchableOpacity 
              style={styles.fileInputStyle} 
              onPress={selectFile}
            >
              <ThemedText>
                Upload File From Galeri
              </ThemedText>
            </TouchableOpacity>
            {/* {selectedFile && (
              <Button
                label="Upload File"
                style={{ width: WIDTH }}
                color="black"
                bold
                rounded={false}
                shadow
                // onPress={handleFileUpload}
              />
            )} */}
            
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
            {uploading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              selectedImage && 
              <Button label="Kirim" onPress={uploadImage} style={styles.buttonStyle} color='gray' />
              // <Button link="(tabs)" label="Login Account" style={styles.buttonStyle} color="white" bold={true} />
              
            )}
          </ThemedView>
          <InputText label="Caption" placeholder="Input this caption" />
        </CollapsibleButton>
        <Button
          link="logout"
          label="Log Out"
          style={{ width: WIDTH }}
          color="black"
          bold
          rounded={false}
          shadow
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 50
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
  containerFile: {
    paddingHorizontal: 22,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  fileInputStyle: {
    backgroundColor: '#D9D9D9',
    padding: 11,
    borderRadius: 10,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  
  buttonStyle:{
    marginTop: 20, 
    backgroundColor: '#000', 
    color: '#fff'
  },
});

export default ProfileScreen;