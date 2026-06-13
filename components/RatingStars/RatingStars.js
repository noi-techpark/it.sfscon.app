import { useMemo } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, StyleSheet } from "react-native";
import Text from "../TextComponent";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./ratingStyles";

const StarRating = ({ rating = 0, numberOfReviews = 0, maxStars = 5 }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const fullStar = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStar = maxStars - fullStar - halfStar;

  return (
    <View style={styles.starContainer}>
      {Array(fullStar)
        .fill()
        .map((_, index) => (
          <FontAwesome
            key={index}
            name="star"
            style={styles.rateIcon}
            size={20}
            color="#FEC82E"
          />
        ))}

      {halfStar === 1 && (
        <FontAwesome
          name="star-half-full"
          style={styles.rateIcon}
          size={20}
          color="#FEC82E"
        />
      )}

      {Array(emptyStar)
        .fill()
        .map((_, index) => (
          <FontAwesome
            key={index}
            name="star-o"
            style={styles.rateIcon}
            size={20}
            color="rgba(0, 0, 0, 0.1)"
          />
        ))}

      <Text stylesProp={styles.ratingText}>{rating.toFixed(2)}</Text>
      <Text
        stylesProp={styles.reviewCount}
      >{`(${numberOfReviews} reviews)`}</Text>
    </View>
  );
};

export default StarRating;
