import "styled-components";
import theme from "@/lib/utils/theme";

type Theme = typeof theme;
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
