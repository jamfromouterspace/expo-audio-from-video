import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAudioFromVideo.web.ts
// and on native platforms to ExpoAudioFromVideo.ts
import ExpoAudioFromVideoModule from './ExpoAudioFromVideoModule';
import ExpoAudioFromVideoView from './ExpoAudioFromVideoView';
import { ChangeEventPayload, ExpoAudioFromVideoViewProps } from './ExpoAudioFromVideo.types';

// Get the native constant value.
export const PI = ExpoAudioFromVideoModule.PI;

export function hello(): string {
  return ExpoAudioFromVideoModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAudioFromVideoModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAudioFromVideoModule ?? NativeModulesProxy.ExpoAudioFromVideo);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAudioFromVideoView, ExpoAudioFromVideoViewProps, ChangeEventPayload };
