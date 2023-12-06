import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExternalLink } from "./ExternalLink";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.helpContainer}>
      <ExternalLink
        style={styles.helpLink}
        href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
      >
        <Text style={styles.helpLinkText}>
          Tap here if your app doesn't automatically update after making changes
        </Text>
      </ExternalLink>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
