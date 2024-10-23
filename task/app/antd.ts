import { ConfigProviderProps } from "antd";

export const antdStyles: ConfigProviderProps["theme"] = {
  token: {
    borderRadius: 0,
    margin: 0,
    marginLG: 0,
  },
  components: {
    Button: {
      paddingInline: "0px",
      defaultBorderColor: "transparent",
      defaultHoverBorderColor: "transparent",
      defaultActiveBorderColor: "transparent",
      // defaultColor: "white",
      defaultHoverColor: "white",
      defaultActiveColor: "white",
      paddingBlock: "0px",
      borderRadius: 5,
    },
    Input: {
      borderRadius: 5,
    },
    Divider: {
      textPaddingInline: 0,
      verticalMarginInline: 0,
      orientationMargin: 0,
    },
  },
};
