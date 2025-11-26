import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Svg, { Path } from "react-native-svg";

interface UserIconProps {
  size?: string;
  color?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({
  size = "16%",
  color = colors.white,
}) => {
  return (
    <Svg width={wp(size)} height={hp(size)} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 8C6.92188 8 5.9375 7.4375 5.39844 6.5C4.85938 5.58594 4.85938 4.4375 5.39844 3.5C5.9375 2.58594 6.92188 2 8 2C9.05469 2 10.0391 2.58594 10.5781 3.5C11.1172 4.4375 11.1172 5.58594 10.5781 6.5C10.0391 7.4375 9.05469 8 8 8ZM6.92188 9.125H9.05469C11.375 9.125 13.25 11 13.25 13.3203C13.25 13.6953 12.9219 14 12.5469 14H3.42969C3.05469 14 2.75 13.6953 2.75 13.3203C2.75 11 4.60156 9.125 6.92188 9.125Z"
        fill={color}
      />
    </Svg>
  );
};
