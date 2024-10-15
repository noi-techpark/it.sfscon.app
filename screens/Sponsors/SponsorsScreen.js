import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import getStyles from "./sponsorsScreenStyles";
import { fromObjectToArray } from "../../tools/sessions";
import * as Linking from "expo-linking";

export default SponsorsScreen = ({ route, navigation }) => {
  const styles = getStyles();
  const db = useSelector((state) => state.app.db);
  const sponsors = fromObjectToArray(db?.conference?.db?.sponsors);

  const slicePxs = (str) => {
    return Number(str.slice(0, str.length - 2));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.sponsorsContainer}
        showsVerticalScrollIndicator={true}
      >
        {sponsors?.length
          ? sponsors?.map((s, idx) => {
              return (
                <TouchableOpacity
                  onPress={() => Linking.openURL(s.url)}
                  key={idx}
                  style={styles.sponsor}
                >
                  <Image
                    resizeMode="contain"
                    source={{ uri: s.logo_url }}
                    style={{
                      width: slicePxs(s.width) / 1.1,
                      height: slicePxs(s.height),
                    }}
                  />
                </TouchableOpacity>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};
