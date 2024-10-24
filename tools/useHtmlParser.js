import { Text, Linking } from "react-native";
import { StyleSheet } from "react-native";

export const parseTextWithStyles = (text) => {
  const components = [];

  const parsedText = text
    .replace(/<b>/g, "__BOLD_START__")
    .replace(/<\/b>/g, "__BOLD_END__")
    .replace(/<strong>/g, "__BOLD_START__")
    .replace(/<\/strong>/g, "__BOLD_END__")
    .replace(/<em>/g, "__ITALIC_START__")
    .replace(/<\/em>/g, "__ITALIC_END__")
    .replace(/<a href="(.*?)">/g, "__LINK_START__$1__LINK_URL__")
    .replace(/<\/a>/g, "__LINK_END__")
    .replace(/<p>/g, "__PARAGRAPH_START__")
    .replace(/<\/p>/g, "__PARAGRAPH_END__")
    .replace(/<br\s*\/?>/g, "__LINE_BREAK__");

  const splitText = parsedText.split(
    /(__BOLD_START__|__BOLD_END__|__ITALIC_START__|__ITALIC_END__|__LINK_START__|__LINK_END__|__LINK_URL__|__PARAGRAPH_START__|__PARAGRAPH_END__|__LINE_BREAK__)/
  );

  let isBold = false;
  let isItalic = false;
  let isLink = false;
  let isParagraph = false;
  let linkUrl = "";

  splitText.forEach((part, index) => {
    if (part === "__BOLD_START__") {
      isBold = true;
    } else if (part === "__BOLD_END__") {
      isBold = false;
    } else if (part === "__ITALIC_START__") {
      isItalic = true;
    } else if (part === "__ITALIC_END__") {
      isItalic = false;
    } else if (part === "__LINK_START__") {
      console.log(splitText[index]);
      isLink = true;
    } else if (part === "__LINK_URL__") {
      linkUrl = splitText[index + 1];
    } else if (part === "__LINK_END__") {
      isLink = false;
    } else if (part === "__PARAGRAPH_START__") {
      isParagraph = true;
    } else if (part === "__PARAGRAPH_END__") {
      isParagraph = false;
      components.push(<Text key={index} style={styles.paragraph} />);
    } else if (part === "__LINE_BREAK__") {
      components.push(<Text key={index}>\n</Text>);
    } else {
      let style = [];
      if (isBold) style.push([styles.paragraph, styles.bold]);
      if (isItalic) style.push([styles.paragraph, styles.italic]);

      if (isLink) {
        console.log("url", linkUrl);
        components.push(
          <Text
            key={index}
            style={[styles.paragraph, styles.link]}
            onPress={() => Linking.openURL(linkUrl)}
          >
            {part + " "}
          </Text>
        );
        isLink = false;
      } else if (isParagraph) {
        components.push(
          <Text key={index} style={styles.paragraph}>
            {part}
          </Text>
        );
        isParagraph = false;
      } else {
        components.push(
          <Text key={index} style={styles.length ? styles : null}>
            {part}
          </Text>
        );
      }
    }
  });

  return components;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },

  paragraph: {
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 28,
    color: "rgba(0, 0, 0, 0.7)",
  },

  italic: {
    fontStyle: "italic",
  },

  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
