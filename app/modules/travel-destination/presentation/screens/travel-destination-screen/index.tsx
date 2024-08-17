import React from "react";
import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import {
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import Icons from '@expo/vector-icons/EvilIcons';

import { GetTravelDestinationById } from "@/lib/data";
import { DestinationModel } from "@/app/common/domain/models";
import styles from "./styles";

const _smallerPortionFlex = 1;
const _largerPortionFlex = 3;

const { width } = Dimensions.get("window");

const TravelDestinationScreen: React.FC = () => {
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState<string | null>(null);

  const [destination, setDestination] = React.useState<
  DestinationModel
  >();

  const [snapState, setSnapState] = React.useState(3);

  React.useEffect(() => {
    async function getDestination() {
      setLoading(true);
      const destination = await GetTravelDestinationById(
        width,
        Number(id),
      );

      // As defined in the rules, we shouldn't override getFeaturedTravelDestinations, so error handling
      // is a dummy implementation here. In a real-world scenario, we would handle this differently.
      // This function would be a callback to a error state, allowing users to retry, or a toast message.
      // if (destination.error) {
      //   setError(destination.error);
      // }

      setDestination(destination);
      setLoading(false);
    }

    getDestination();
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

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.y;
    const hasScrolled = position > 50
    setSnapState(hasScrolled ? _smallerPortionFlex : _largerPortionFlex);
  };

  const isImageSmaller = snapState === 1;

  const contentFlex = isImageSmaller ? _largerPortionFlex : _smallerPortionFlex;

  const genericDescription = `Discover the enchanting allure of ${destination?.location}, where every day brings a new adventure. Over the course of ${destination?.numberOfDays} days, immerse yourself in breathtaking landscapes, vibrant cultures, and unforgettable experiences. Wander through stunning vistas, savor local flavors, and connect with the heart of the destination. Whether you're seeking tranquility or excitement, ${destination?.location} offers the perfect escape to recharge and create lasting memories. Embrace each moment as you explore the wonders that await you in this extraordinary journey.`;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={router.back}>
        <Icons name="chevron-left" size={48} color={destination?.color}/>
      </TouchableOpacity>
      <MotiView
        animate={{
          flex: snapState,
        }}
        transition={{
          type: "timing",
          duration: 300,
        }}
        style={styles.imageContainer}
      >
        <Image source={{ uri: destination?.image }} style={styles.image} />
      </MotiView>
      <MotiView
        animate={{
          flex: contentFlex,
        }}
        transition={{
          type: "timing",
          duration: 300,
        }}
        style={{...styles.content, backgroundColor: destination?.color}}
      >
        <ScrollView
          onScrollEndDrag={handleScrollEnd}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{destination?.location}</Text>
          <Text style={styles.description}>
            {genericDescription}
            {genericDescription}
            {genericDescription}
          </Text>
        </ScrollView>
      </MotiView>
    </View>
  );
};



export default TravelDestinationScreen;
