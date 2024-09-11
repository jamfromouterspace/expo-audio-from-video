import * as React from 'react';

import { ExpoAudioFromVideoViewProps } from './ExpoAudioFromVideo.types';

export default function ExpoAudioFromVideoView(props: ExpoAudioFromVideoViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
