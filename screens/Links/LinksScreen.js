import { useMemo } from "react";
import { View } from "react-native";
import Text from "../../components/TextComponent";
import { getTheme } from "../../tools/getTheme";
import Link from "../../components/Link";
import getStyles from "./linksScreenStyles";
import AppVersionComponent from "../../components/AppVersion/AppVersionComponent";

export default LinksScreen = ({ navigation }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const links = [
    {
      link: "https://www.sfscon.it/about/",
      label: "About",
      placeholder: "https://www.sfscon.it/about",
    },
    {
      link: "https://www.sfscon.it/venue/",
      label: "Venue",
      placeholder: "https://www.sfscon.it/venue",
    },
    {
      link: "https://www.sfscon.it/attendee-guide/",
      label: "Attendee's Guide",
      placeholder: "https://www.sfscon.it/attendee-guide",
    },
    {
      link: "https://maps.sfscon.it",
      label: "Conference map",
      placeholder: "https://maps.sfscon.it",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text bold stylesProp={styles.headerTitle}>
          Links
        </Text>
      </View>
      <View style={styles.linksContainer}>
        {links.map(({ label, link, placeholder }, idx) => (
          <Link key={idx} label={label} link={link} placeholder={placeholder} />
        ))}
      </View>

      <View style={styles.footer}>
        <AppVersionComponent />
      </View>
    </View>
  );
};
