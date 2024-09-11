import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAudioFromVideoViewProps } from './ExpoAudioFromVideo.types';

const NativeView: React.ComponentType<ExpoAudioFromVideoViewProps> =
  requireNativeViewManager('ExpoAudioFromVideo');

export default function ExpoAudioFromVideoView(props: ExpoAudioFromVideoViewProps) {
  return <NativeView {...props} />;
}
