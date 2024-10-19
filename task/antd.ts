import { ConfigProviderProps } from "antd";

export const antdStyles: ConfigProviderProps["theme"] = {
  token: {
    // colorPrimary: "orange",
    // colorBgBase: "pink",
    // colorTextBase: "red",
    // colorTextSecondary: semanticColors.fontS,
    // colorPrimaryBgHover: semanticColors.primaryGray,
  },
  components: {
    Button: {
      defaultHoverBg: "black", // overwrite me css
      paddingInline: "0px",
      defaultBorderColor: "transparent",
      defaultHoverBorderColor: "transparent",
      defaultActiveBorderColor: "transparent",
      defaultActiveColor: "orange",
      defaultColor: "white",
      defaultHoverColor: "white",
      defaultActiveBg: "blue", // overwrite me css
      paddingBlock: "0px",
    },
  },
};
