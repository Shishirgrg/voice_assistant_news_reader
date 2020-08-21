import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import "./App.css";
import wordsToNumber from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";

const alanKey =
  "c4759a20926e90a243f3309613ed42ad2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setactiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setactiveArticle(-1);
        } else if (command === "highlight") {
          setactiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsToNumber(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening..");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="alan logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
