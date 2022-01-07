import React, { useState, useEffect,  } from "react";
import { StyleSheet, Text, View, Image,Platform } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import Loading from "./Loading";
import { Avatar, Button, Card } from "react-native-paper";
import { Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraRoll from '@react-native-community/cameraroll';


export default function Find({navigation}) {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [newPermission,setNewPermission] = useState(null)
    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [loading, setLoading] = useState(false);
    const [loading2,setLoading2] = useState(false);
    const permisionFunction = async () => {
        // here is how you can get the camera permission
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(cameraPermission.status === "granted");

    
        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        setGalleryPermission(imagePermission.status === "granted");

    
        const mediaPermission = await MediaLibrary.getPermissionsAsync();
        requestPermission(mediaPermission.status)

        const newerPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setNewPermission(newerPermission.status)
    
        if (
          imagePermission.status !== "granted" &&
          cameraPermission.status !== "granted"&&
          galleryPermission.status !== "granted"&&
          newerPermission.status !=="granted"
        ) {
          alert("Permission for media access needed.");
        }
      };

      useEffect(() => {
        permisionFunction();
      }, []);
    
      const succesMoodHandler = (data) => {
        console.log(data)
        console.log("Navigation Now")
        navigation.navigate({name:'Home',params:{response:data}});
        console.log("navigated to home")
    }
    
    const takePictureAndroid = async()=>{
       if (camera) {
        const options = { base64: true, quality: 0.5};
        const data = await camera.takePictureAsync(options);
          setLoading(true)
          setImageUri(data.uri);
          const manipResult = await manipulateAsync(
            data.localUri || data.uri,
            [
              { rotate: 180 },
              { flip: FlipType.Vertical},
            ],
            { compress: 1, format: SaveFormat.PNG,base64:true }
          );
          const json_to_post = { img: manipResult.base64};

          axios
          .post("https://image-to-emotion.herokuapp.com/", json_to_post)
          .then((response) => {
            succesMoodHandler(response.data);
            setLoading(false)
          })
          .catch(function (error) {
            setLoading(false)
          });

        }
    }
      const takePicture = async () => {
        if (camera) {
          const options = { base64: true, quality: 0.5};
          const data = await camera.takePictureAsync(options);
          setLoading(true)
          const manipResult = await manipulateAsync(
            data.localUri || data.uri,
            [
              { rotate: 180 },
              { flip: FlipType.Vertical},
            ],
            { compress: 1, format: SaveFormat.PNG,base64:true }
          );
          //MediaLibrary.saveToLibraryAsync(manipResult.uri)
          const asset = await MediaLibrary.createAssetAsync(manipResult.uri);
          setImageUri(manipResult.uri);
        
          const json_to_post = { img: manipResult.base64 };

          axios
          .post("https://image-to-emotion.herokuapp.com/", json_to_post)
          .then((response) => {
            succesMoodHandler(response.data);
            setLoading(false)
          })
          .catch(function (error) {
            setLoading(false)
          });
        }
    };

          const pickImage = async () => {
            setLoading(true)
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
          });
      
          const json_to_post = { img: result["base64"] };
          axios
          .post("https://image-to-emotion.herokuapp.com/", json_to_post)
          .then((response) => {
            succesMoodHandler(response.data);
            setLoading(false)
          })
          .catch(function (error) {
            setLoading(false)
            Alert.alert(
              "Sorry :(",
              "We Can't Find Your Mood Right Now",
            
                { text: "OK", onPress: () => navigation.navigate("Home") }
              
            );
          });
      
        };
       
    
    return (
        loading ? <Loading /> :
        <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={{flex:1}}
          type={type}
          ratio={"4:3"}
        />
      </View>
      
      <Button
        labelStyle={{ fontSize: 25 }}
        style={styles.button}
        icon="camera"
        onPress={Platform.OS === 'android'?takePictureAndroid:takePicture}
        
      >
        <Text style={{ fontSize: 16 }}>Take Picture</Text>
      </Button>
      <Button
        labelStyle={{ fontSize: 35 }}
        style={styles.button}
        icon="google-photos"
        onPress={pickImage}
      >
        <Text style={{ fontSize: 16 }}>Choose From Gallery</Text>
      </Button>

      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#f4511e'
    },
    cameraContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor:"#f4511e"
    },
    fixedRatio: {
      flex: 1,
    },
    button: {
        margin: 30,
        color: "white",
        flexDirection:"column"
      },
  });
