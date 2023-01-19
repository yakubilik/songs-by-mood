import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";
import { Avatar, Button, Card } from "react-native-paper";
import moods from "../data";
export default function Home({route,navigation}) {
    const [sound, setSound] = React.useState();
    const [text, setText] = React.useState(" ");
    const [mood, setMood] = React.useState(" ");
    const [song, setSong] = React.useState();
    const [image, setImage] = React.useState(moods[0][0]["image"]);
    const [songSayac, setsSongSayac] = React.useState(0);
    const [moodSayac, setMoodSayac] = React.useState(-1);
    const [playing,setPlaying] = React.useState(false);

    let arrived = " "
    async function handleDatas(){
        if (arrived["result"] === "Sad") {
            setText("You Made Me Sad! (▰︶︹︺▰) ");
            setMood("Sad");
            setMoodSayac(1);
        } else if (arrived["result"] === "Happy") {
            setText("Always Be Happy!  ヽ(•‿•)ノ");
            setMood("Happy");
            setMoodSayac(2);
        } else if (arrived["result"] === "Neutral") {
            setText("Keep Going! ╮(￣_￣)╭");
            setMood("Neutral");
            setMoodSayac(3);
        } else if (arrived["result"] === "Angry") {
            setText("You Scared Me !  ლ(ಠ_ಠლ)");
            setMood("Angry");
            setMoodSayac(4);
        }
        else
        {   
            setText("Couldn't Detect Any Emotion");
            setMood("None");
            setMoodSayac(0);
        }
      }

      const handleNextSong = () => {
        if(moodSayac!=-1&&moodSayac!=0)
        {
            if(moods[moodSayac].length>songSayac+1)
            {
            setsSongSayac(songSayac + 1);
            }
            else{
            setsSongSayac(0);
            }
    }
      };

      useEffect(() => {
    
        return sound
          ? () => {
              if(sound)
              sound.unloadAsync();
          }
             
          : undefined;
        
      }, [sound]);

    useEffect(() => {
        if(route.params)
        {
            const { response } = route.params;
            arrived = response
            handleDatas();
        }
        else{
            response = " "
        }
        
      }, [route.params]);

      useEffect(() => {
        playSound();
      }, [moodSayac]);

      useEffect(() => {
        playSound()
      }, [songSayac]);

      async function playSound() {
        stopSound();
          let sound; 
          try
          {
            const response = await Audio.Sound.createAsync(
            moods[moodSayac][songSayac]["data"]
          );
          sound = response.sound
          }catch{
            console.log("error");
          }
          
         

        try {
          setSound(sound);
          setImage(moods[moodSayac][songSayac]["image"]);
          setSong(moods[moodSayac][songSayac]["name"])
        } catch (error) {
          console.log("error");
        }


        try {
          console
          var quote = await sound.playAsync();
        } catch (error) {
          console.log("error");
        }
          
    
       
        setPlaying(true)
      }

      async function stopSound() {
        try {
          await sound.unloadAsync();
          setPlaying(false)
        } catch (error) {
          console.log("error");
        }
        
        
      }
    
    const pressHandler = () => {
        navigation.navigate("Find");
      };
    return (
        <View style={styles.backSide}>
      <Text style={styles.texts}>Current Mood: {mood}</Text>
      <Text style={styles.texts}>Currently Playing: {song}</Text>
      <Text style={styles.texts}>{text}</Text>

      <Image
        style={{
          width: null,
          resizeMode: "contain",
          height: 220,
        }}
        source={image}
      />
     <Button
        icon="close"
        labelStyle={{ fontSize: 25 }}
        dark={true}
        margin={0}
        compact={true}
        icon="camera"
        onPress={(stopSound, pressHandler)}
      > <Text style={{ fontSize: 14 }}>Find By Mood</Text></Button>
      <Button
        labelStyle={{ fontSize: 40 }}
        style={styles.button}
        icon="play"
        disabled={playing}
        onPress={playSound}
      >
        <Text style={{ fontSize: 16 }}>Play Song</Text>
      </Button>
      <Button
        labelStyle={{ fontSize: 35 }}
        style={styles.button}
        icon="stop"
        onPress={stopSound}
        disabled ={!playing}
      >
        <Text style={{ fontSize: 16 }}>Stop Song</Text>
      </Button>
      
      <Button
        labelStyle={{ fontSize: 40 }}
        style={styles.button}
        icon="page-last"
        onPress={handleNextSong}
      >
        <Text style={{ fontSize: 16 }}>Next Song</Text>
      </Button>
    </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      backgroundColor: "#ecf0f1",
      padding: 10,
      margin: 30,
    },
    backSide: {
      flex: 1,
      backgroundColor: "pink",
    },
    texts: {
      margin: 10,
      color: "black",
    },
    button: {
      margin: 20,
      color: "white",
    },
  });
  