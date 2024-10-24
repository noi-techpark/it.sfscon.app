import { useMemo } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import SVGAvatar from "../../assets/icons/avatar.svg";
import getStyles from "./authorDetailsStyles";
import { getTheme } from "../../tools/getTheme";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import * as Linking from "expo-linking";
import WebViewComponent from "../../components/WebViewComponent";
import Text from "../../components/TextComponent";
import { useShare } from "../../tools/useShare";
import { useDispatch } from "react-redux";
import { toggleTabBarVisibility } from "../../store/actions/AppActions";

export default AuthorDetailsScreen = ({ route, navigation }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const author = route.params.author;
  const dispatch = useDispatch();

  const { share } = useShare();

  const navigateBack = () => {
    dispatch(toggleTabBarVisibility("show"));
    navigation.goBack();
  };

  const onShare = async (link) => {
    await share({ url: link, title: "SFSCon", message: "SFSCon" });
  };

  return (
    <View style={styles.listHolder}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.goBackBtn} onPress={navigateBack}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={theme.textMedium}
              style={styles.goBackIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.authorTop}>
          <View style={styles.authorImageContainer}>
            {author.profile_picture ? (
              <Image
                resizeMode="cover"
                source={{ uri: author?.profile_picture }}
                style={styles.authorImage}
              />
            ) : (
              <SVGAvatar />
            )}
          </View>

          <View style={styles.authorDetails}>
            <Text bold stylesProp={styles.authorName}>
              {author?.display_name}
            </Text>
            <View>
              {Object.keys(author?.social_networks).length > 0 ? (
                <View style={styles.socials}>
                  {author?.social_networks?.facebook ? (
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() =>
                        Linking.openURL(author?.social_networks?.facebook)
                      }
                    >
                      <Feather
                        name="facebook"
                        size={22}
                        style={styles.socialsIcon}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {author?.social_networks?.twitter ? (
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() =>
                        Linking.openURL(author?.social_networks?.twitter)
                      }
                    >
                      <Feather
                        name="twitter"
                        size={22}
                        style={styles.socialsIcon}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {author?.social_networks?.linkedin ? (
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() =>
                        Linking.openURL(author?.social_networks?.linkedin)
                      }
                    >
                      <Feather
                        name="linkedin"
                        size={22}
                        style={styles.socialsIcon}
                      />
                    </TouchableOpacity>
                  ) : null}

                  {author?.social_networks?.site ? (
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() =>
                        Linking.openURL(author?.social_networks?.site)
                      }
                    >
                      <MaterialCommunityIcons
                        name="web"
                        size={22}
                        style={styles.socialsIcon}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <ScrollView style={styles.bioHolderScrollView}>
          <Text bold stylesProp={styles.sectionTitle}>
            Bio
          </Text>

          <WebViewComponent source={author?.bio} />

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.shareAuthorBtn}
              onPress={() =>
                onShare(author.share_link || "https://www.sfscon.it/")
              }
            >
              <Text bold stylesProp={styles.shareAuthorBtnText}>
                Share author info
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
