import { Video } from "expo-av"
import { View, Text, StyleSheet } from "react-native"

export default function App() {
  return (
    <View style={styles.container}>
      <Video
        source={require("./assets/smoke.mp4")}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Starry Nights</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 40
  }
})
