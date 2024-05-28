import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { PostAsyncStorage } from "@/hooks/hooksAsyncStorage";
import IMAGES from "@/assets/images";
import { WIDTH } from "@/assets/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

type PostinganProps = {
  dataURI: PostAsyncStorage[];
};

export const Postingan: React.FC<PostinganProps> = ({ dataURI }) => {
  if (!dataURI || dataURI.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.noDataText} type="defaultSemiBold">
          No posts available.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {dataURI.map((item: PostAsyncStorage, index: number) => (
        <ThemedView key={index} style={{marginBottom: 20}}>
          <ThemedView style={styles.header}>
            <ThemedView style={styles.headerContent}>
              <Image source={IMAGES.profile} style={styles.profileImage} />
              <ThemedView style={styles.postContent}>
                <ThemedText style={styles.postStyle} type="defaultSemiBold">
                  {item.user}
                </ThemedText>
                <ThemedText style={styles.postStyle} type="defaultSemiBold">
                  {item.barang}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          <Image source={{ uri: item.gambar }} style={styles.image} />
          <ThemedView  style={styles.messageContainer}>
            <Ionicons name="chatbubbles-outline" size={30} color={'green'} />
            <MaterialCommunityIcons name="shopping-outline" size={30} color={'green'} />
          </ThemedView>
          <ThemedView style={styles.captionContainer}>
            <ThemedText style={{fontSize: 20}} type="defaultSemiBold">
              {item.user}
            </ThemedText>
            <ThemedText style={{fontSize: 20}}>
              {item.caption}
            </ThemedText>
          </ThemedView>
          <ThemedView style={{borderWidth: 2, borderColor: '#427054'}}></ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 20,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#427054',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 7,
  },
  postContent: {
    backgroundColor: 'transparent',
  },
  postStyle: {
    fontSize: 18,
    marginLeft: 10
  },
  image: {
    width: WIDTH,
    height: undefined,
    aspectRatio: 1,
  },
  messageContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  captionContainer: {
    marginTop: 10,
    marginBottom: 25,
    paddingHorizontal: 16,
  },
  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
  },
  border: {

  },
});

export default Postingan;