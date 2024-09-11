import { StyleSheet, Text, View } from 'react-native';

import * as ExpoAudioFromVideo from 'expo-audio-from-video';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoAudioFromVideo.hello()}</Text>
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
