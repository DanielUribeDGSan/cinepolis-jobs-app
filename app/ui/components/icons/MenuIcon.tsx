import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Svg, { Path } from "react-native-svg";

interface MenuIconProps {
  size?: string;
  color?: string;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  size = "16%",
  color = colors.white,
}) => {
  return (
    <Svg width={wp(size)} height={hp(size)} viewBox="0 0 16 16" fill="none">
      <Path
        d="M2.75 4.25C2.75 3.85156 3.07812 3.5 3.5 3.5H12.5C12.8984 3.5 13.25 3.85156 13.25 4.25C13.25 4.67188 12.8984 5 12.5 5H3.5C3.07812 5 2.75 4.67188 2.75 4.25ZM2.75 8C2.75 7.60156 3.07812 7.25 3.5 7.25H9.5C9.89844 7.25 10.25 7.60156 10.25 8C10.25 8.42188 9.89844 8.75 9.5 8.75H3.5C3.07812 8.75 2.75 8.42188 2.75 8ZM7.25 11.75C7.25 12.1719 6.89844 12.5 6.5 12.5H3.5C3.07812 12.5 2.75 12.1719 2.75 11.75C2.75 11.3516 3.07812 11 3.5 11H6.5C6.89844 11 7.25 11.3516 7.25 11.75Z"
        fill={color}
      />
    </Svg>
  );
};
