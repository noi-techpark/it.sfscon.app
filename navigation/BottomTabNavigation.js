import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import AuthorsNavigation from "./AuthorsNavigation";
import ScheduleNavigation from "./ScheduleNavigation";
import MyScheduleNavigation from "./MyScheduleNavigation";
import { getTheme } from "../tools/getTheme";
import { Feather, AntDesign } from "@expo/vector-icons";
import LinksScreen from "../screens/Links/LinksScreen";
import SponsorsScreen from "../screens/Sponsors/SponsorsScreen";
import CustomTabBar from "../components/CustomTabBar/CustomTabBar";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default BottomTabNavigation = () => {
  const theme = getTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => {
        return <CustomTabBar {...props} />;
      }}
      backBehavior="history"
      initialRouteName="Schedule"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleNavigation}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Schedule", {
              screen: "ScheduleScreen",
            });
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="calendar"
                size={18}
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
              />
            );
          },
          tabBarLabel: "Programme",
        }}
      />
      <Tab.Screen
        name="Authors"
        component={AuthorsNavigation}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Authors", {
              screen: "AuthorsScreen",
            });
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="users"
                size={18}
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
              />
            );
          },
          tabBarLabel: "Speakers",
        }}
      />

      <Tab.Screen
        name="MySchedule"
        component={MyScheduleNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="bookmark"
                size={18}
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
              />
            );
          },
          tabBarLabel: "My Schedule",
        }}
      />
      <Tab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
                name="link"
                size={18}
              />
            );
          },
          tabBarLabel: "Links",
        }}
      />

      <Tab.Screen
        name="Supporters"
        component={SponsorsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
                name="staro"
                size={18}
              />
            );
          },
          tabBarLabel: "Supporters",
        }}
      />
    </Tab.Navigator>
  );
};
