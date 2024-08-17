import { Dimensions, StyleSheet } from "react-native";

import Constants from "expo-constants";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: width,
  },
  destinationButton: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 6,
  },
  marker: {
    width: "100%",
    maxWidth: 50,
    maxHeight: 50,
    aspectRatio: 1,
    borderRadius: 100,
  },
  selectedItem: {
    marginLeft: 62,
    position: "absolute",
  },
  animatedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
