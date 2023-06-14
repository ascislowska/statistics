import React from "react";

const About = (props) => {
  console.log("Component About renders");
  return (
    <div className="ui raised very padded text container segment">
      <h2 className="ui header">O stronie </h2>
      <p>
        Dane prezentowane na stronie pochodzą z Banku Danych Lokalnych Głównego
        Urzędu Statystycznego. Dzięki połączeniu z API GUS dane są stale
        aktualizowane.
      </p>
      <p>Wykonanie strony: Anna Ścisłowska</p>
      <p>
        <i className="envelope icon"></i>Kontakt:{" "}
        <a href="mailto:anna.b.scislowska@gmail.com">
          anna.b.scislowska@gmail.com
        </a>
      </p>
      <p>
        <i className="desktop icon"></i>Portfolio:{" "}
        <a href="https://ascislowska.netlify.app">ascislowska.netlify.app</a>
      </p>
    </div>
  );
};
export default About;
