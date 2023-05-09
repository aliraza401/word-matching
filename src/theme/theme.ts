import { green, gold, red } from "@ant-design/colors";

const primaryColor = "#3A8DFF";
const successColor = green[5];
const warningColor = gold[5];
const errorColor = red[5];

const antdTheme = {
  primaryColor: primaryColor,
  successColor: successColor,
  warningColor: warningColor,
  errorColor: errorColor,
};

const customTheme = { ...antdTheme };

export default customTheme;
