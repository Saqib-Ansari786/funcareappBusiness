import React from "react";
import Onboarding from "./Onboarding";
import { images } from "../../constants";

export default function Onboarding1({ navigation }) {
  return (
    <>
      <Onboarding
        title="Add your Playland and get more customers"
        image={images.onboarding_image2}
        buttonNavigate={() => navigation.navigate("Onboarding2")}
        description="Customers can book your playland and you can earn money"
      />
    </>
  );
}
