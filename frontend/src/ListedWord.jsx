import { useEffect, useState } from "react";

export default function ListedWord() {
  const [wordsList, setWordsList] = useState([]);
  const [hideList, setHideList] = useState(true);

  function getAllEnglishWords() {
    fetch(`http://localhost:3005/toEnglish/`)
      .then((response) => response.json())
      .then((result) => {
        const finalList = result.map((w) => w.word[0].word);
        setWordsList(finalList);
        console.log("finalList the list of word ----->", finalList);
      });
  }

  function getAllGermanWords() {
    fetch(`http://localhost:3005/toGerman/`)
      .then((response) => response.json())
      .then((result) => {
        const finalList = result.map((w) => w.german_word[0].l1_text);
        // setWordsList(finalList);
        console.log("German words list ----->", finalList);
      });
  }

  return (
    <div id="listedWord">
      <div className="englishListedWords">
        <div>
          <button onClick={getAllEnglishWords}>English words</button>
          <button onClick={() => setHideList(false)}>hide list</button>
        </div>

        <ol className="wordsList">
          {wordsList.map((item) => (
            <li>
              {item} <button>x</button>
            </li>
          ))}
        </ol>
      </div>

      <div className="germanListedWords">
        <div>
          <button onClick={getAllGermanWords}>German words</button>
          <button onClick={() => setHideList(false)}>hide list</button>
        </div>
        <ol className="wordsList">
          {wordsList.map((item) => (
            <li>
              {item} <button>x</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
