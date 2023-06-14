import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import ShowVariables from "./ShowVariables";
import ShowSubjects from "./ShowSubjects";



const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ShowSubjects />} />
        <Route path="about" element={<About />} />
        <Route path="/rankingi" element={<ShowSubjects />} />
        <Route path="rankingi/:categoryId/:subjectId" element={<ShowVariables />} />
      </Routes>
    </div>
  );
};

export default App;
