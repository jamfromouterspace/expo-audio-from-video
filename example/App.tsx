import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import { Audio } from "expo-av"
import * as ExpoAudioFromVideo from 'expo-audio-from-video';
import * as imagepicker from "expo-image-picker"
import { useState } from 'react';

export default function App() {
  const [audioUri, setAudioUri] = useState<string | null>(null)
  const uploadFromVideo = async () => {
    try {
      const result = await imagepicker.launchImageLibraryAsync({
        mediaTypes: imagepicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: false,
        allowsEditing: true,
        // quality: imagepicker.UIImagePickerControllerQualityType.Low,
        // videoQuality: imagepicker.UIImagePickerControllerQualityType.Low,
      })
      if (!result.assets?.[0]?.uri) return 0
      console.log("extracting...")
      const audioUri = await ExpoAudioFromVideo.extractAudioFromVideo(result.assets?.[0]?.uri)
      console.log("extracted.", audioUri)
      setAudioUri(audioUri)
      return 1
    } catch (error) {
      console.warn("Failed to convert video to audio", error)
      return 0
    }
  }
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false)

  async function playSound() {
    if (!audioUri) return
    try {
      if (isPlaying)  {
        await sound?.pauseAsync()
        setIsPlaying(false)
      } else {
        console.log('Loading Sound');
        const result = await Audio.Sound.createAsync({ uri: audioUri })
        setSound(result.sound);
        console.log('Playing Sound');
        await result.sound.playAsync();
        setIsPlaying(true)
      }
    } catch(err) {
      console.log("Sound failure", err)
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={uploadFromVideo} title={"Upload"}></Button>
      { audioUri ? <Button onPress={playSound} title={isPlaying ? "Pause" : "Play"}></Button> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
