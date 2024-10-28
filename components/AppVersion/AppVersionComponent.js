import { useMemo } from "react";
import { View, Text } from "react-native";
import getStyles from "./appVersionComponentStyles";
import {
  BUILD_VERSION,
  BUILD_DATE,
  SERVER,
} from "../../constants/buildVersion";
import Constants from "expo-constants";
import { getTheme } from "../../tools/getTheme";

export default AppVersion = () => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.appVersion}>
      <Text style={styles.appVersionText}>Server:</Text>
      <Text style={styles.appVersionText}>{`${SERVER}`}</Text>
      <Text
        style={styles.appVersionText}
      >{`Version: ${Constants?.expoConfig?.version}`}</Text>
      <Text style={styles.appVersionText}>{BUILD_VERSION}</Text>
      <Text style={styles.appVersionText}>{BUILD_DATE}</Text>
    </View>
  );
};
