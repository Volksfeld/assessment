import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Constants from "expo-constants";
import { MotiView, ScrollView } from "moti";
import Animated, {
  Easing,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";
import { LocationModel } from "./common/domain/models";
import { getFeaturedTravelDestinations } from "@/lib/data";
import { ItemType } from "./types";
import { router } from "expo-router";

const _spacing = 12;

const { width } = Dimensions.get("window");

const _closedLocationWidth = width * 0.1;
const _openLocationWidth = width * 0.55;

export default function App() {
  const [selectedItem, setSelectedItem] = React.useState(0);

  const [lastPressed, setLastPressed] = React.useState(0);

  const [loading, setLoading] = React.useState(true);

  const [travelDestinations, setTravelDestinations] = React.useState<
    LocationModel[]
  >([]);

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getTravelDestinations() {
      setLoading(true);
      const travelDestinations = await getFeaturedTravelDestinations(12);

      // As defined in the rules, we shouldn't override getFeaturedTravelDestinations, so error handling
      // is a dummy implementation here. In a real-world scenario, we would handle this differently.
      // This function would be a callback to a error state, allowing users to retry, or a toast message.
      if (travelDestinations.error) {
        setError(travelDestinations.error);
      }

      setTravelDestinations(travelDestinations);
      setLoading(false);
    }

    getTravelDestinations();
  }, []);

  function SelectedItem({ item }: ItemType) {
    return (
      <Animated.View style={styles.selectedItem}>
        <Animated.Text
          style={{ color: item.color, fontWeight: "bold" }}
          entering={FadeInRight.delay(50)}
          exiting={FadeOutLeft.delay(100)}
        >
          {item.location}
        </Animated.Text>
        <Animated.Text
          style={{ color: item.color, fontWeight: "bold" }}
          entering={FadeInRight.delay(100)}
          exiting={FadeOutLeft.delay(50)}
        >
          {item.location}
        </Animated.Text>
      </Animated.View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#dced83" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  const travelDestinationsLastIndex = travelDestinations.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {travelDestinations.map((item, index) => {
            return (
              <MotiView
                key={item.key}
                animate={{
                  flex: selectedItem === index ? travelDestinationsLastIndex : 1,
                  width:
                    selectedItem === index
                      ? _openLocationWidth
                      : _closedLocationWidth,
                }}
                transition={{
                  type: "timing",
                  duration: 500,
                  easing: Easing.inOut(Easing.ease),
                }}
                style={{
                  borderRadius: _spacing * 2,
                  overflow: "hidden",
                  marginRight: index === travelDestinationsLastIndex ? 0 : _spacing,
                }}
              >
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={() => {
                    const now = new Date().getTime();
                    const timeDiff = now - lastPressed;
                    setLastPressed(now);
                    timeDiff < 300
                      ? router.navigate('/modules/travel-location')
                      : setSelectedItem(index);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      { resizeMode: "cover" },
                    ]}
                  />
                  <Animated.View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MotiView
                      animate={{
                        backgroundColor:
                          selectedItem === index ? item.color : "#fff",
                      }}
                      transition={{
                        type: "timing",
                        duration: 1000,
                      }}
                      style={styles.marker}
                    />
                    {selectedItem === index && <SelectedItem item={item} />}
                  </Animated.View>
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

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
  locationButton: {
    flex: 1,
    justifyContent: "flex-end",
    padding: _spacing / 2,
  },
  marker: {
    width: "100%",
    maxWidth: 50,
    maxHeight: 50,
    aspectRatio: 1,
    borderRadius: 100,
  },
  selectedItem: {
    marginLeft: 50 + _spacing,
    position: "absolute",
  },
});
