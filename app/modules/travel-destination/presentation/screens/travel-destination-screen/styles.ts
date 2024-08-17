import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: "white",
    },
    backButton: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: 40,
      zIndex: 2,
      left: 20,
      top: Constants.statusBarHeight + 20,
    },
    imageContainer: {
      width: "100%",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    content: {
      padding: 16,
      borderRadius: 16,
      marginTop: -15,
    },
    title: {
      fontSize: 28,
      lineHeight: 30,
      color: "#333",
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: "#333",
    },
  });

  export default styles;