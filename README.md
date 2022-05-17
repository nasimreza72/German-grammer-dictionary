    // fetch(
    //   `https://petapro-translate-v1.p.rapidapi.com/?query=${newWord}&langpair=de-en`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-host": "petapro-translate-v1.p.rapidapi.com",
    //       "x-rapidapi-key":
    //         
    //     },
    //   }
    // )
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((result) => {
    //     setLoading(true);
    //     return setTranslate(result);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });



    ////////////////////// end of part 1




 ///// Function to Delete specific item from list

  //   function deleteWord (item) {
  //       console.log(item);
  //      const newSentance = sentence.filter(u => u !== item)
  //      setSentance(newSentance)
  //   }

  ///////////////  end of Function






          {/* <h5>{translate[0] ? translate[0].l1_text : word}:</h5>
          {translate[0] ? translate[0].l2_text : word}
          <hr />
          <h6>Synoneme :</h6>
          {translate[0] ? translate[0]"".synonyme1 : "" }
          <hr />
          <h6>Wortart :</h6>
          {translate[0] ? translate[0].wortart :  "" }
          <hr />
          <h6>Sentences :</h6>
          {translate[0] ? translate[0].sentences[0] ?translate[0].sentences[0].join("").replaceAll("<b>", "").replaceAll("</b>", "").replace(".", ". Translation: '' ")+'"' : "" :  "" }
          <br /> <br />
          {translate[0] ? translate[0].sentences[0]? translate[0].sentences[1].join("").replaceAll("<b>", "").replaceAll("</b>", "").replace(".", ". Translation: '' ")+'"' :  "" : "" } */}





          /////////////////////////////



          import { useEffect, useState } from "react";

export default function Translate() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState([]);

  let sentence =
    "This is a story of a long fight between an old, experienced fisherman and the best fish he ever caught. Santiago has returned to the village without any fish for 84 days. The young boy who helps Santiago is told by his parents to join another boat. But the young boy continues to help the fisherman at night. On the eighty-fifth day, his luck changes and so does his life. Santiago sails his boat further away. He drops his fishing lines. At 12 pm, a huge fish (a marlin) takes the bait (the food used to attract fish). The man tries to pull the fish up, but the fish is too big and strong. Instead, the fish begins to pull the boat. The old man continues to fight and hold on to the line. The fish pulls the boat around the sea for two days. On the third day, the fish gets tired. Santiago is able to pull the fish closer and kill it. It is the biggest fish he has seen in his life. He begins to sail back to the village, but the blood of the fish attracts sharks. The boat is attacked by a Mako shark, but Santiago is able to kill it. He kills most of the sharks, but there is a problem. They have eaten the meat of the fish and now only the skeleton (bones) is left. He returns back to his home and falls asleep. All the people of the village are amazed at the size of the fish skeleton. The young boy agrees to be the fishing partner of Santiago once more.";

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

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`)
      .then((response) => response.json())
      .then((result) => {
        setTranslate(result[0]);
        setLoading(true);

        const config = {
          method: "POST",
          body: JSON.stringify(result[0]),
          headers: {
            "Content-type": "application/json",
          },
        };

        fetch("http://localhost:3005/translate", config)
          .then((response) => response.json())
          .then((result) => result);
      });
  }, [word]);

  console.log(translate);

  return (
    <div className="Translate">
      {sentence.split(" ").map((item) => (
        <span onClick={() => setWord(item)}> {item} </span>
      ))}

      <br />

      {loading == true && (
        <div className="translated-word">
          <h5>{translate ? translate.word : word}:</h5>

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
            {translate ? translate.meanings[0].partOfSpeech : ""}{" "}
          </strong>

          <hr />

          <strong>Definitions: </strong>
          <br />

          {translate
            ? translate.meanings[0].definitions.map((item) => (
                <li>{item.definition}</li>
              ))
            : word}
        </div>
      )}
    </div>
  );
}

