import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./TextComponent";
import AntDesign from "@expo/vector-icons/AntDesign";

const Dialog = ({ message = "", isVisible = false, setIsVisible }) => {
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Modal transparent style={styles.modal} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text stylesProp={styles.message}>
            This feature is not available in the offline version of the app.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  header: {
    alignItems: "flex-end",
  },

  content: {
    flex: 1,
    borderRadius: 8,
    position: "absolute",
    zIndex: 100,
    alignSelf: "center",
    backgroundColor: "#FFF",
  },

  message: {
    padding: 16,
    textAlign: "center",
    lineHeight: 22,
  },

  closeButton: {
    padding: 8,
  },
});

export default Dialog;
