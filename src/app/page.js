"use client";

import { PageOne } from "./_features/pageOne";
import { PageThree } from "./_features/pageThree";
import { PageTwo } from "./_features/pageTwo";
import { PageFour } from "./_features/pageFour";
import "./style.css";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(3);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleBackPage = () => {
    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
    }
  };
  return (
    <>
      {" "}
      {page === 1 && <PageOne handleNextPage={handleNextPage} />}
      {page === 2 && (
        <PageTwo
          handleNextPage={handleNextPage}
          handleBackPage={handleBackPage}
        />
      )}
      {page === 3 && (
        <PageThree
          handleNextPage={handleNextPage}
          handleBackPage={handleBackPage}
        />
      )}
      {page === 4 && (
        <PageFour
          handleNextPage={handleNextPage}
          handleBackPage={handleBackPage}
        />
      )}
    </>
  );
}
