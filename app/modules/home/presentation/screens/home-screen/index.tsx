import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MotiView, ScrollView } from "moti";
import Animated, {
  Easing,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";

import { getFeaturedTravelDestinations } from "@/lib/data";
import { router } from "expo-router";
import { ItemType } from "./types";
import { DestinationModel } from "@/app/common/domain/models";

import styles from "./styles";


const { width } = Dimensions.get("window");

const _closedDestinationWidth = width * 0.1;
const _openDestinationWidth = width * 0.55;

const HomeScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState(0);

  const [lastPressed, setLastPressed] = React.useState(0);

  const [loading, setLoading] = React.useState(true);

  const [travelDestinations, setTravelDestinations] = React.useState<
    DestinationModel[]
  >([]);

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getTravelDestinations() {
      setLoading(true);
      const travelDestinations = await getFeaturedTravelDestinations(width);

      // As defined in the rules, we shouldn't override getFeaturedTravelDestinations, so error handling
      // is a dummy implementation here. In a real-world scenario, we would handle this differently.
      // This function would be a callback to a error state, allowing users to retry, or a toast message.
      //   if (travelDestinations.error) {
      //     setError(travelDestinations.error);
      //   }

      setTravelDestinations(travelDestinations);
      setLoading(false);
    }

    getTravelDestinations();
  }, []);

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
                  flex:
                    selectedItem === index ? travelDestinationsLastIndex : 1,
                  width:
                    selectedItem === index
                      ? _openDestinationWidth
                      : _closedDestinationWidth,
                }}
                transition={{
                  type: "timing",
                  duration: 500,
                  easing: Easing.inOut(Easing.ease),
                }}
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  marginRight:
                    index === travelDestinationsLastIndex ? 0 : 12,
                }}
              >
                <TouchableOpacity
                  style={styles.destinationButton}
                  onPress={() => {
                    const now = new Date().getTime();
                    const timeDiff = now - lastPressed;
                    setLastPressed(now);
                    timeDiff < 300                    
                      ? router.navigate(`/modules/travel-destination/presentation/screens/travel-destination-screen?id=${travelDestinations[index].key}`)
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
                    style={styles.animatedRow}
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



export default HomeScreen;