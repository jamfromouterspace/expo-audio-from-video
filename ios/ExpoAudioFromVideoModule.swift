import ExpoModulesCore

public class ExpoAudioFromVideoModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
      // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
      // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
      // The module will be accessible from `requireNativeModule('AudioFromVideo')` in JavaScript.
      Name("AudioFromVideo")

      // Defines a JavaScript function that always returns a Promise and whose native code
      // is by default dispatched on the different thread than the JavaScript runtime runs on.
      AsyncFunction("extractAudioFromVideo") { (videoUri: String, promise: Promise) in
        // Send an event to JavaScript.
          AudioExtractor.extractAudio(fromVideoAt: videoUri) { result in
              switch result {
                case .success(let audioURL):
                    print("Audio extraction successful. Audio file saved at \(audioURL)")
                    promise.resolve(audioURL.absoluteString)
                    // Do something with the extracted audio
                case .failure(let error):
                    print("Error: \(error.localizedDescription)")
                    promise.reject(error)
              }
          }
      }
  }
}
