import AVFoundation

class AudioExtractor {
    
    static func extractAudio(fromVideoAt videoURLString: String, completion: @escaping (Result<URL, Error>) -> Void) {
        guard let videoURL = URL(string: videoURLString) else {
            completion(.failure(NSError(domain: "com.yourapp.audioextractor", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid video URL"])))
            return
        }
        
        let asset = AVAsset(url: videoURL)
        
        // Create a new URL for the audio file
        let uuid = UUID()
        let audioOutputURL = FileManager.default.temporaryDirectory.appendingPathComponent(uuid.uuidString + ".m4a")
        
        // Remove any existing file at the audioOutputURL
        try? FileManager.default.removeItem(at: audioOutputURL)
        
        // Create export session
        guard let exportSession = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetAppleM4A) else {
            completion(.failure(NSError(domain: "com.yourapp.audioextractor", code: 0, userInfo: [NSLocalizedDescriptionKey: "Failed to create AVAssetExportSession"])))
            return
        }
        
        exportSession.outputFileType = AVFileType.m4a
        exportSession.outputURL = audioOutputURL
        
        // Export audio asynchronously
        exportSession.exportAsynchronously {
            switch exportSession.status {
            case .completed:
                completion(.success(audioOutputURL))
            case .failed, .cancelled:
                if let error = exportSession.error {
                    completion(.failure(error))
                } else {
                    completion(.failure(NSError(domain: "com.yourapp.audioextractor", code: 0, userInfo: [NSLocalizedDescriptionKey: "Audio extraction failed"])))
                }
            default:
                break
            }
        }
    }
}
