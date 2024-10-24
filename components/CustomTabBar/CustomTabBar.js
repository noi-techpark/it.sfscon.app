import { useEffect, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import getStyles from "./customTabBarStyles";
import Text from "../TextComponent";
import { getTheme } from "../../tools/getTheme";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default CustomTabBar = ({ state, descriptors, navigation }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const tabBarVisibility = useSelector((state) => state.app.tabBarVisibility);

  const height = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: 100 }),
    };
  });

  const toggleHeight = () => {
    height.value = tabBarVisibility === "show" ? 50 : 0;
  };

  useEffect(() => {
    setTimeout(() => {
      toggleHeight();
    }, 500);
  }, [tabBarVisibility]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options.tabBarLabel;

        const focused = state.index === index;

        const tabBarIcons = {
          Schedule: (
            <Feather
              name="calendar"
              size={18}
              color={
                focused ? theme.bottomTabNavActive : theme.bottomTabNavInactive
              }
            />
          ),

          Authors: (
            <Feather
              name="users"
              size={18}
              color={
                focused ? theme.bottomTabNavActive : theme.bottomTabNavInactive
              }
            />
          ),

          MySchedule: (
            <Feather
              name="bookmark"
              size={18}
              color={
                focused ? theme.bottomTabNavActive : theme.bottomTabNavInactive
              }
            />
          ),

          Links: (
            <AntDesign
              color={
                focused ? theme.bottomTabNavActive : theme.bottomTabNavInactive
              }
              name="link"
              size={18}
            />
          ),

          Supporters: (
            <AntDesign
              color={
                focused ? theme.bottomTabNavActive : theme.bottomTabNavInactive
              }
              name="staro"
              size={18}
            />
          ),
        };

        const icon = tabBarIcons[route.name];

        const color = focused
          ? theme?.bottomTabNavActive
          : theme?.bottomTabNavInactive;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TouchableOpacity
            key={route?.name}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            {icon}
            <Text stylesProp={{ ...styles.text, color }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};
