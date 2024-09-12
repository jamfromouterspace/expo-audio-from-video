package expo.modules.audiofromvideo

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context
import com.arthenica.mobileffmpeg.FFmpeg
import java.io.File
import java.util.UUID

class ExpoAudioFromVideoModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoAudioFromVideo')` in JavaScript.
    Name("ExpoAudioFromVideo")

    AsyncFunction("extractAudioFromVideo") { videoUri: String ->
      // Generate a random UUID for the output file
      val outputFileName = "${UUID.randomUUID()}.mp3"

      // Get the cache directory and prepare the output file path
      val cacheDir = appContext.cacheDirectory
      val outputPath = File(cacheDir, outputFileName).absolutePath

      // FFmpeg command to extract audio
      val command = arrayOf("-i", videoUri, "-q:a", "0", "-map", "a", outputPath)

      // Execute the FFmpeg command
      FFmpeg.execute(command)
      outputPath
    }
  }
}
