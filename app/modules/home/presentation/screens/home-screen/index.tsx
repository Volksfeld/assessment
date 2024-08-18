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
import { useQuery } from "@tanstack/react-query";

const { width } = Dimensions.get("window");

const _closedDestinationWidth = width * 0.1;
const _openDestinationWidth = width * 0.55;

const HomeScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState(0);

  const [lastPressed, setLastPressed] = React.useState(0);

  // The way I'm used to doing thigs is to have a loading state, an error state, and a data state.
  // React Query Implementation also follows!
  const [loading, setLoading] = React.useState(true);

  const [travelDestinations, setTravelDestinations] = React.useState<
    DestinationModel[]
  >([]);

  const [error, setError] = React.useState<string | null>(null);

  const getTravelDestinations = React.useCallback(async () => {
    setLoading(true);
    setError('');

    const travelDestinations = await getFeaturedTravelDestinations(width);
    
    if (!travelDestinations) {
      setError("Oh no!");
    }

    setTravelDestinations(travelDestinations);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    getTravelDestinations();
  }, []);


  // Using query only because it was fun to learn and I didin't know about it until now.
  // Still trying to figure out how to handle the error state with it (i.e bind it to a callback and invoke on button retry. Prolly asigning it to useCallback and etc.)
  const {
    data: queryTravelDestinations,
    error: queryError,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["featuredTravelDestinations for", width],
    queryFn: () => getFeaturedTravelDestinations(width),
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#dced83" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={getTravelDestinations}>
          <Text>Very ugly Retry btn</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const travelDestinationsLastIndex = travelDestinations.length - 1;

  // To avoid inline styling, I'm used to StyledComponents. It's really straightforward and easy to use.
  // I still cant figure out a way to do it with Animations. What would be the best way?
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

  function navigateToTravelDestination(index: number) {
    const id = travelDestinations[index].key;

    router.navigate(
      `/modules/travel-destination/presentation/screens/travel-destination-screen?id=${id}`,
    );
  }

  function handlePressOnSelected(index: number) {
    selectedItem === index
      ? navigateToTravelDestination(index)
      : setSelectedItem(index);
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
                  marginRight: index === travelDestinationsLastIndex ? 0 : 12,
                }}
              >
                <TouchableOpacity
                  style={styles.destinationButton}
                  onPress={() => {
                    // Thinking about "3. When you double tap a card, the user should be taken to a screen where the card picture is shown along with some more details (lorem ipsum)".
                    // I implemented both ways: If user taps on a selected item OR if he double taps a location.
                    // It works for both cases but I dislike the "double tap" implementation. It's kind of hacky. Could be more elegant.
                    const now = new Date().getTime();
                    const timeDiff = now - lastPressed;
                    setLastPressed(now);
                    timeDiff < 300
                      ? navigateToTravelDestination(index)
                      : handlePressOnSelected(index);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      { resizeMode: "cover" },
                    ]}
                  />
                  <Animated.View style={styles.animatedRow}>
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
};

export default HomeScreen;
