//Selami bey uzun süredir CORONA dolayisi ile ücüzleri ile beraber evdedir. Cocuklarina carpim tablosunu ögretmek zorundadir. Fakat cocuklar bir türlü carpim tablosunu anlamamaktadirlar. Selami beyin, acilen cocuklarinin, carpim tablosunu ögrenebilecekleri bir programa ihtiyaci vardir. Fakat istenilen programin, Selami beyin hayatini kolaylastiracak bazi özelliklere sahip olmasi gerekiyor.

//Program akisi:
//- 10 soru sorulacak ve program bitecektir 
//-  Her soru oturumun süresi 10 saniyedir. 
//- soru siklarina ve soruya sorular random bir sekilde gelecektir(data kullanilmayacak)

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText'); //score gostergesi 
const timeText = document.getElementById('timeText'); //score gostergesi
const timeBarFull = document.getElementById('timeBarFull');
let timeCounter = 0;
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQueston = {}; // sorulan soru
let acceptingAnswers = false; //verilen cevap
let score = 0; //ekranda 0 dan baslayan bir skor tablosu
let questionCounter = 0; //
let availableQuesions = []; // tekrak aynı soruları sorulmaması icin mevcut sorulardan cıkarılacak

setInterval(() => soruolustur, 1)

soruolustur = () => {
  const sayi1 = Math.round(Math.random() * 9)
  const sayi2 = Math.round(Math.random() * 9)
  const sayitoplam = sayi1 * sayi2
  var sayilar = [];
  sayilar[0] = sayitoplam

  do {
    sayilar[1] = Math.round(Math.random() * 99)
    sayilar[2] = Math.round(Math.random() * 99)
    sayilar[3] = Math.round(Math.random() * 99)
  } while ((sayilar[0] == sayilar[1]) || (sayilar[0] == sayilar[2]) || (sayilar[0] == sayilar[3]) ||
    (sayilar[1] == sayilar[2]) || (sayilar[1] == sayilar[3]) || (sayilar[2] == sayilar[3]));

  //diziyi karıştırmak icin yapilan bolum
  var choice = [];

  do {
    choice[0] = sayilar[Math.floor(Math.random() * sayilar.length)]
    choice[1] = sayilar[Math.floor(Math.random() * sayilar.length)]
    choice[2] = sayilar[Math.floor(Math.random() * sayilar.length)]
    choice[3] = sayilar[Math.floor(Math.random() * sayilar.length)]
  } while ((choice[0] == choice[1]) || (choice[0] == choice[2]) || (choice[0] == choice[3]) ||
    (choice[1] == choice[2]) || (choice[1] == choice[3]) || (choice[2] == choice[3]));

  for (i = 0; i < 4; i++) {
    if (choice[i] == sayitoplam)
      answerIndex = i + 1;
  }
  let k = new Object;
  k = {
    question: sayi1 + " " + "*" + " " + sayi2 + "   " + "Bu iki sayının carpımı kactır",
    choice1: choice[0],
    choice2: choice[1],
    choice3: choice[2],
    choice4: choice[3],
    answer: answerIndex
  }
  return k;
}
let questions = [];
for (let k = 0; k < 10; k++) {
  questions.push(soruolustur())
}
timerPrint = () => {
  setInterval(() => {
    timeCounter++;
    timeText.innerText = `Time ${timeCounter}/${maxtime}`;
    timeBarFull.style.width = `${(timeCounter / maxtime) * 100}%`;
    if (timeCounter == 10) {
      getNewQuestion()
      timeCounter = 0
    }
  }, 1000)

}
timerPrint();

const correct_paun = 10;
const maxQuestions = 10;
const maxtime = 10;
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions]; //Spread Operatör
  console.log(availableQuesions);
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign('./end.html');
  }

  questionCounter++; //soru sayacını bir arttırma
  progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;

  // progress bar
  console.log;
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`; //soru sayısına gore ilerleyen bar 
  const questionindex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionindex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => { //burada foreach ile soru numarasina ulasiriz 
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuesions.splice(questionindex, 1); //sorunun doğru yanlıs sorgulaması 
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;
    timeCounter = 0;
    acceptingAnswers = false;
    const selectedChoise = e.target; //tıklanan secenegi aktarıyoruz
    const selectedAnswer = selectedChoise.dataset['number'];
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //burada cevabın doğru yanlış olduğu sorgulaması yapiliyor
    if (classToApply === 'correct') {
      incrementScore(correct_paun);
    }
    selectedChoise.parentElement.classList.add(classToApply); //burası seceneklere tıklanınca zemin rengi ekliyor(kirmizi,yesil)
    setTimeout(() => {
      selectedChoise.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000); // bir saniye bekledikten sonra yeni soru gelmesi
  });
});
incrementScore = num => { // scor tablosunun 
  score += num;
  scoreText.innerText = score;
}

startGame();