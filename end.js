const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value; //burada kullanıcı ismi girilmemişse kaydet butonu actif olmaz
});

saveHighScore = e => {
  console.log("clicked the save button!");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score); //Alinan puanlari buyukten kucuge sirala
  highScores.splice(10); //Sadece 10 skoru goster
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("./index.html");
};