import React from "react";
import Onboarding from "./Onboarding";
import { images } from "../../constants";

export default function Onboarding2({ navigation }) {
  return (
    <>
      <Onboarding
        title="Build your trust with customers"
        image={images.onboarding_image3}
        buttonNavigate={() => navigation.navigate("EmailScreen")}
        description="Its easy to get verified and build trust with customers"
      />
    </>
  );
}
