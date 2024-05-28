import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { CollapsibleButton } from '@/components/CollapsibleButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import IMAGES from '@/assets/images';
import { Button } from '@/components/Button';
import { WIDTH } from '@/assets/styles';
import { InputText } from '@/components/InputText';
import * as ImagePicker from 'expo-image-picker';
import { ref, push, onValue } from 'firebase/database';
import { storage } from '@/firebaseconfig';
import { Stack, router } from 'expo-router';
import { LoginAsyncStorage, PostAsyncStorage, getLoginAsyncStorage, setLoginAsyncStorage } from '@/hooks/hooksAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Postingan } from '@/components/Postingan';

const ProfileScreen :React.FC = () => {
  const [dataUser, setDataUser] = useState<LoginAsyncStorage | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [dataPosting, setDataPosting] = useState<PostAsyncStorage>({
    user: '',
    barang: '',
    caption: '',
    gambar: ''
  });

  const [listDataPosting, setListDataPosting] = useState<PostAsyncStorage[]>([]);

  useEffect(() => {
    const getLocal = async () => {
      try {
        const data = await getLoginAsyncStorage();
        setDataUser(data);

        const dataPost =  onValue(ref(storage, 'postingan'), (snapshot) => {
          if (snapshot.exists()) {
            const dataInDatabase = snapshot.val();
            const posts: PostAsyncStorage[] = [];
            Object.keys(dataInDatabase).forEach((key) => {
              const postingData = dataInDatabase[key];
              if (postingData.user === data!.email) {
                posts.push(postingData);
              }
            });
            setListDataPosting(posts);
          }
        });
        
      } catch (error) {
        console.log('Error saat mengambil data dari async storage:', error);
      }
    }

    getLocal();
  },[]);

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
    if(dataPosting.barang === ''){
      alert('Barang tidak boleh kosong!');
    } else {
      if(dataPosting.caption === ''){
        alert('Caption tidak boleh kosong!');
      } else{
        setDataPosting((prevData) => ({ ...prevData, nama: dataUser!.email }));
        setDataPosting((prevData) => ({ ...prevData, gambar: selectedImage! }));
        console.log(dataPosting);

        const postingRef = ref(storage, 'postingan');
        push(postingRef,{
          user: dataUser!.email,
          barang: dataPosting.barang,
          caption:  dataPosting.caption,
          gambar: selectedImage!,
        });
        alert('Berhasil melakukan posting!');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      alert('Berhasil logout!');
      router.push('/'); 
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(listDataPosting);
  return (
    <>
    <Stack.Screen options={{
      headerShown: true,
      title: 'Search' 
    }} />
    <ScrollView style={{backgroundColor: 'white'}}>
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
      <ThemedView style={{marginBottom: 10}}>
        <CollapsibleButton title="Edit Profile" style={styles.collapsibleButton}>
          <ThemedText>Page Edit Profile</ThemedText>
        </CollapsibleButton>
        <CollapsibleButton title="Post" style={styles.collapsibleButton}>
          <ThemedView style={styles.containerFile}>
            <InputText 
              label="Nama Barang" 
              placeholder="Input this caption" 
              bold={true} 
              horizontal={false}
              value={dataPosting.barang}
              onChangeText={(text) => setDataPosting((prevData) => ({ ...prevData, barang: text }))} 
            />
            <InputText 
              label="Caption" 
              placeholder="Input this caption" 
              bold={true} 
              horizontal={false}
              value={dataPosting.caption}
              onChangeText={(text) => setDataPosting((prevData) => ({ ...prevData, caption: text }))} 
            />
            <ThemedText style={{ marginBottom: 15}} type="defaultSemiBold">
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
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
            {uploading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              selectedImage && 
              <TouchableOpacity 
                style={[styles.fileInputStyle, {marginTop: 15, backgroundColor: 'blue'}]} 
                onPress={() => uploadImage()}
              >
              <ThemedText style={{color: 'white'}}>Kirim Postingan</ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        </CollapsibleButton>
        <TouchableOpacity 
          onPress={() => handleLogout()}
        >
          <Button
            link={null}
            label="Log Out"
            style={{ width: WIDTH }}
            color="black"
            bold
            rounded={false}
            shadow
          />
        </TouchableOpacity>
      </ThemedView>
      <Postingan dataURI={listDataPosting}/>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: 'gray', 
    color: 'black',
    width: '80%',
    
  },
});

export default ProfileScreen;