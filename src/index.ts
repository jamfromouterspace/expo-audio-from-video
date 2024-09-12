import AudioFromVideoModule from "./ExpoAudioFromVideoModule"

export function extractAudioFromVideo(videoUri: string): Promise<string> {
  return AudioFromVideoModule.extractAudioFromVideo(videoUri)
}
