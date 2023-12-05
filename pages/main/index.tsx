import { useState } from "react";
import MainPageComponent from "../../features/collection/components/Select/MainPageComponent";

export default function Page() {
  return (
    <>
      {isFormSubmitted && submittedData && (
        <MainPageComponent submittedData={submittedData} />
      )}
    </>
  );
}
