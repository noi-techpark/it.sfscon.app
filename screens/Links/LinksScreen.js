import { useMemo } from "react";
import { View } from "react-native";
import { getTheme } from "../../tools/getTheme";
import Link from "../../components/Link";
import getStyles from "./linksScreenStyles";

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
      link: "https://www.sfscon.it/programs-archive/",
      label: "Past editions",
      placeholder: "https://www.sfscon.it/programs-archive",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.linksContainer}>
        {links.map(({ label, link, placeholder }, idx) => (
          <Link key={idx} label={label} link={link} placeholder={placeholder} />
        ))}
      </View>
    </View>
  );
};
