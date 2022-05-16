import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";

export default function Translate() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState([]);
  const [sentence, setSentence] = useState("");
  const [offset, setOffset] = useState({});


  useEffect(() => {
    let newWord =
      word.includes(",") ||
      word.includes(".") ||
      word.includes("!") ||
      word.includes("?") ||
      word.includes(":") ||
      word.includes("!")
        ? word.slice(0, -1)
        : word;

    console.log(newWord);

    fetch(`http://localhost:3005/toEnglish/${newWord}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          console.log(result.error);
          alert("Error fetching translation");
          setLoading(false);
          return;
        }
        setTranslate(result);
        setLoading(true);
        console.log(result);
      });
  }, [word]);

  const inputWord = useRef();
  const inputText = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setWord(inputWord.current.value);
    console.log(inputText.current.value);
  };

  return (
    <div className="Translate">
      <div className="inputField">
        <form onSubmit={submitHandler}>
          <input placeholder="WORD HERE" ref={inputWord} />
          <Button onClick={submitHandler} size="small" variant="contained">
            SEARCH
          </Button>
        </form>
      </div>

      <div className="textArea">
        <textarea
          onChange={() => setSentence(inputText.current.value)}
          ref={inputText}
          placeholder="Write your words here and hover right side text field's word to get more information."
          className="textField"
        ></textarea>

        <div
          onClick={(e) => console.log(e.target.offsetLeft)}
          className="textDiv"
        >
          {sentence.split(" ").map((item) => (
            <span
              className="individualWord"
              onClick={(e) => {
                setWord(item);
                setOffset({
                  left: e.target.offsetLeft,
                  top: e.target.offsetTop,
                });
              }}
            >
              {" "}
              {item}{" "}
            </span>
          ))}

          <div
            style={{
              position: "absolute",
              zIndex: 1,
              top: `${offset.top + 23}px`,
              left: `${offset.left - 5}px`,
              background: "white",
              borderRadius: "5px",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            {loading == true &&
              translate.meanings[0].synonyms.map((item) => (
                <div
                  onClick={() => {
                    setWord(item);
                  }}
                  className="individualWord"
                  style={{
                    padding: "2px 10px",
                    borderBottom: "1px solid black",
                    borderRadius: "5px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 3px 3px",
                  }}
                > 
                  {item}
                
                </div>
              ))}
          </div>
        </div>
      </div>

      <br />

      {loading == true && (
        <div style={{ position: "sticky" }} className="translated-word">
          <h3>{translate ? translate.word.toUpperCase() : word}</h3>

          <hr />

          <strong>Synonyms: </strong>

          {translate
            ? translate.meanings[0].synonyms.map((item) => (
                <span>{item + ", "} </span>
              ))
            : ""}

          <hr />

          {translate ? (
            <audio
              controls
              src={
                translate.phonetics
                  ? translate.phonetics.filter((item) => item.audio !== "")[0]
                    ? translate.phonetics.filter((item) => item.audio !== "")[0]
                        .audio
                    : ""
                  : ""
              }
            />
          ) : (
            ""
          )}

          <hr />

          <strong>
            {" "}
            {translate
              ? translate.meanings[0].partOfSpeech.toUpperCase()
              : ""}{" "}
          </strong>

          <hr />

          <strong>Definitions: </strong>
          <br />

          {translate
            ? translate.meanings[0].definitions.map((item) => (
                <div style={{ color: "gray" }}>{item.definition}</div>
              ))
            : word}
        </div>
      )}
    </div>
  );
}