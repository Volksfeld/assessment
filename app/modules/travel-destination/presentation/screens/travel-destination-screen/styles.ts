import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: "white",
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