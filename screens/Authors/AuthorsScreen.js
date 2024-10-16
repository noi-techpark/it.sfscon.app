import { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SVGAvatar from "../../assets/icons/avatar.svg";
import getStyles from "./authorsScreenStyles";
import { getTheme } from "../../tools/getTheme";
import { AntDesign } from "@expo/vector-icons";
import { fromObjectToArray } from "../../tools/sessions";
import { useIsFocused } from "@react-navigation/native";
import Text from "../../components/TextComponent";
import EmptyScreenSVG from "../../assets/icons/empty.svg";
import EmptyScreen from "../../components/EmptyScreen";
import { toggleTabBarVisibility } from "../../store/actions/AppActions";

export default AuthorsScreen = ({ navigation }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const db = useSelector((state) => state.app.db);
  const lecturers = db?.conference?.db?.lecturers;

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [authors, setAuthors] = useState(fromObjectToArray(lecturers));

  const filterAuthors = (term) => {
    if (!term) {
      return;
    }
    const filteredAuthors = fromObjectToArray(lecturers);
    setAuthors(
      filteredAuthors.filter((aut) =>
        aut.display_name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const inputRef = useRef();

  useEffect(() => {
    if (showSearchInput) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 500);
    }
  }, [showSearchInput]);

  useEffect(() => {
    if (!isFocused) {
      setShowSearchInput(false);
      setAuthors(fromObjectToArray(lecturers));
    }
  }, [isFocused]);

  const navigateToAuthorDetails = (author) => {
    dispatch(toggleTabBarVisibility("hidden"));
    navigation.navigate("AuthorDetails", { author });
  };

  const openSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.wrapper} onPress={() => Keyboard.dismiss()}>
        <View style={styles.header}>
          {showSearchInput ? (
            <View style={styles.searchContainer}>
              <>
                <TextInput
                  onChangeText={(term) => {
                    filterAuthors(term);
                  }}
                  ref={inputRef}
                  placeholder="Search speakers"
                  style={styles.searchInput}
                />

                <AntDesign
                  name="search1"
                  size={22}
                  style={styles.searchInputIcon}
                />

                <TouchableOpacity
                  onPress={() => {
                    setShowSearchInput(false);
                    setAuthors(fromObjectToArray(lecturers));
                  }}
                >
                  <Text stylesProp={styles.cancelBtnTxt}>Cancel</Text>
                </TouchableOpacity>
              </>
            </View>
          ) : (
            <>
              <Text bold stylesProp={styles.headerTitle}>
                Speakers
              </Text>
              {!authors || authors?.length === 0 ? null : (
                <TouchableOpacity
                  onPress={openSearchInput}
                  style={
                    showSearchInput
                      ? { ...styles.searchBtn, left: 10 }
                      : styles.searchBtn
                  }
                >
                  <AntDesign
                    name="search1"
                    size={22}
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <View style={styles.flatListContainer}>
          {authors?.length === 0 || !authors ? (
            <EmptyScreen title="No authors found" />
          ) : (
            <FlatList
              data={authors}
              contentContainerStyle={styles.flatList}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.lecturer}
                    onPress={() => navigateToAuthorDetails(item)}
                  >
                    <View style={styles.imageContainer}>
                      {item.profile_picture ? (
                        <Image
                          resizeMode="cover"
                          source={{ uri: item.profile_picture }}
                          style={styles.lectProfilePic}
                        />
                      ) : (
                        <SVGAvatar width={150} height={175} />
                      )}
                    </View>

                    <View style={styles.lectInfo}>
                      <Text numberOfLines={1} stylesProp={styles.lectName}>
                        {item.display_name}
                      </Text>
                      <Text stylesProp={styles.lectCompany}>
                        {item.company_name ?? ""}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};
