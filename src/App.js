import React from "react";
import "./styles.css";
import Image0 from "./images/0.jpg";
import Image1 from "./images/1.jpg";
import Image2 from "./images/2.jpg";
import Image3 from "./images/3.jpg";
import Image4 from "./images/4.jpg";
import Image5 from "./images/5.jpg";
import Image6 from "./images/6.jpg";
import Image7 from "./images/7.jpg";
import Image8 from "./images/8.jpg";
import Image9 from "./images/9.jpg";

const GuessedController = ({ wordArray, usedIdx }) => {
  console.log("wordArray", wordArray);
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      {wordArray && wordArray.map((el, idx) => <h1 key={idx}>{el}</h1>)}
    </div>
  );
};

const Key = ({ label, guessed, onClick }) => {
  return (
    <button
      style={{ backgroundColor: guessed ? "gray" : "yellow", padding: 10 }}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};
const Hangman = ({ word }) => {
  const images = [
    Image0,
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9
  ];
  const [nWrong, setnWrong] = React.useState(0);
  const [wordArray, setWordArray] = React.useState([]);
  const [guessdWord, setGuessedWord] = React.useState([]);
  const [guessed, setGuessed] = React.useState([]);
  React.useEffect(() => {
    if (word) {
      const wordArr = word.split("");
      setWordArray(wordArr);
      getGuessedWords();
      //console.log("wordArray",wordArr)
    }
  }, []);
  function getGuessedWords() {
    return wordArray.map(el => {
      console.log("guessed", guessed);
      return guessed.includes(el) ? el : "_";
    });
  }

  React.useEffect(() => {
    getGuessedWords();
  }, [guessed]);

  const handleClick = label => {
    console.log("label", label);
    setGuessed([...guessed, label]);
    //console.log("wordArray",wordArray)
    if (!wordArray.includes(label)) {
      setnWrong(nWrong + 1);
      console.log("nWrong", nWrong);
    } else {
      setGuessedWord(getGuessedWords());
      // if is found
    }
  };

  const getKeys = () => {
    return "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map(el => <Key key={el} label={el} onClick={handleClick} />);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <img src={images[nWrong]} style={{ width: "40%" }} />
      <GuessedController wordArray={guessdWord} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: 200,
          width: "90%",
          textAlign: "center"
        }}
      >
        {getKeys()}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Hangman word="apple" />
    </div>
  );
}
