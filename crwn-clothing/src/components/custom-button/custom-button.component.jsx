import React from "react";

// import "./custom-button.styles.scss";
import { CustomButtonContainer } from "./custom.button.styles";

// const CustomButton = ({
//   children,
//   isGoogleSignIn,
//   inverted,
//   ...otherProps
// }) => {
//   return (
//     <button
//       className={`${inverted ? "inverted" : ""} ${
//         isGoogleSignIn ? "google-sign-in" : ""
//       } custom-button`}
//       {...otherProps}
//     >
//       {children}
//     </button>
//   );
// };

// const CustomButton = props => (
//   <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
// );

const CustomButton = ({ children, ...props }) => {
  return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;
};

export default CustomButton;
