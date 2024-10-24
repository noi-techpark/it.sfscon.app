import { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import getStyles from "./moreScreenStyles";
import { getTheme } from "../../tools/getTheme";
import { useDispatch, useSelector } from "react-redux";
import Text from "../../components/TextComponent";
import AppVersionComponent from "../../components/AppVersion/AppVersionComponent";

export default MoreScreen = ({ navigation }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const registeredUser = useSelector((state) => state.auth.registeredUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text bold stylesProp={styles.displayName}>{`${
          registeredUser?.first_name || "Guest"
        } ${registeredUser?.last_name || "user"}`}</Text>
        <Text stylesProp={styles.text}>
          {registeredUser?.data?.organization}
        </Text>
        <Text stylesProp={styles.text}>
          {registeredUser?.data?.pretix_order
            ? registeredUser?.data?.pretix_order
            : ""}
        </Text>
        <Text stylesProp={styles.email}>{registeredUser?.email ?? ""}</Text>
      </View>

      <View style={styles.listItemContainer}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate("Sponsors")}
        >
          <AntDesign name="staro" size={22} style={styles.itemIcon} />
          <Text stylesProp={styles.itemText}>Supporters</Text>
          <Ionicons
            name="chevron-forward"
            size={22}
            style={styles.itemSecondIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.listItemContainer}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate("Links")}
        >
          <AntDesign name="link" size={22} style={styles.itemIcon} />
          <Text stylesProp={styles.itemText}>Links</Text>
          <Ionicons
            name="chevron-forward"
            size={22}
            style={styles.itemSecondIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.appVersion}>
        <AppVersionComponent />
      </View>
    </View>
  );
};
