import { Platform } from "react-native";
import colors from "../config/colors";

export default {
  text: {
    fontSize: 18,
    color: colors.dark,
    ...Platform.select({
      ios: {
        fontFamily: "Avenir",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },
};
