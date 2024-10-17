import { useMemo } from "react";
import { View, Image } from "react-native";
import SVGAvatar from "../../assets/icons/avatar.svg";
import Text from "../TextComponent";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./speakerStyles";

const Speaker = ({ speaker }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.speaker}>
      <View style={styles.imageContainer}>
        {speaker?.profile_picture ? (
          <Image
            resizeMode="cover"
            source={{ uri: speaker?.profile_picture }}
            style={styles.profilePicture}
          />
        ) : (
          <SVGAvatar />
        )}
      </View>
      <View style={styles.speakerInfo}>
        <Text stylesProp={styles.speakerName}>{speaker.display_name}</Text>
        <Text stylesProp={styles.companyName}>{speaker.company_name}</Text>
        <Text stylesProp={styles.speakerSession}></Text>
      </View>
    </View>
  );
};

export default Speaker;
