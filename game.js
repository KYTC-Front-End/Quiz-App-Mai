const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");  //استدعيت البروقرس بار فل 
const start = document.getElementById('start');
const divQuestion = document.getElementById('divQuestion');
const divstart = document.getElementById('divstart');
const divscore = document.getElementById('divscore');
const divend = document.getElementById('divend');
const playAgain = document.getElementById('playAgain');
const gohome = document.getElementById('gohome');
const local = document.getElementById('local');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
 const mostRecentScore = localStorage.getItem('mostRecentScore');
let currentQuestion = {};
let acceptingAnswers = false;  //هنا بقله ما تخليه يجاوب قبل ما احمل الاسئلة 
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question:"What is the correct way to declare a variable in JavaScript?" ,
    choice1: "var myVariable;",
    choice2: "variable myVariable;",
    choice3: " let myVariable;",
    choice4: "const myVariable;",
    answer: 3
  },
  {
    question:
    "How do you check the type of a variable in JavaScript?" ,
    choice1: "typeof myVariable;",
    choice2:" typeOf(myVariable);",
    choice3:  "checkType(myVariable);",
    choice4: "myVariable.getType();",
    answer: 1
  },
  {
    question:  "Which keyword is used to define a function in JavaScript?" ,
    choice1:  "method",
    choice2:  " function",
    choice3: " def" ,
    choice4: "func" ,  
    answer: 2
  },
  {
    question:"Which operator is used for equality comparison in JavaScript?" ,
    choice1:  "==",
    choice2: "=" ,
    choice3: " ===",
    choice4:  "=>",
    answer: 3
  },
  {
    question: "What is the correct way to write a single-line comment in JavaScript?" ,
    choice1: " // This is a comment" ,
    choice2: "  <!-- This is a comment -->",
    choice3:  " /* This is a comment */" ,
    choice4:  " # This is a comment" ,
    answer: 1
  },
  {
    question:  "How do you add an element to the end of an array in JavaScript?" ,
    choice1:  "array.push(element);" ,
    choice2:"array.add(element);",
    choice3: "array.insert(element);",
    choice4:  "array.append(element);",
    answer: 1
  },
  {
    question:"What does the NaN value represent in JavaScript?" ,
    choice1: "Negative number",
    choice2:  " Not a Number",
    choice3:  "Null value",
    choice4: "Negative infinity",
    answer: 2
  },
  {
    question: "Which method is used to remove the last element from an array in JavaScript?" ,
    choice1: "array.removeLast();",
    choice2: " array.pop();",
    choice3: " array.deleteLast();",
    choice4:" array.splice(-1);",
    answer: 2
  },
  {
    question: "How do you convert a string to an integer in JavaScript?" ,
    choice1: " parseString()",
    choice2:  " convertToInt()",
    choice3:  "  parseInt()",
    choice4: " stringToInteger()",
    answer: 3
  },
  {
    question: "Which method is used to select an HTML element by its ID in JavaScript?" ,
    choice1: " selectElementById()",
    choice2:  " getElementByID()",
    choice3:  " getID()" ,
    choice4: "document.getElementById()",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

start.addEventListener('click',(event)=>{
  event.preventDefault();
  divstart.style.display ='none'
  divQuestion.style.display ='block';
  startGame();
})

playAgain.addEventListener('click',(event)=>{
  event.preventDefault();
  divstart.style.display ='none'
  divQuestion.style.display ='block';
  startGame();
})

gohome.addEventListener('click',()=>{
  divstart.style.display ='block'
  divQuestion.style.display ='none';
  divend.style.display ='none';
})

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {//بعد ما خلصو عدد الاسئلة اللي حطيتهم بدي ياه يروح لصفحة الايند
    localStorage.setItem("mostRecentScore", score);
    divQuestion.style.display = 'none';
    divend.style.display ='block';
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;  // عداد الاسئلة عشان يكون داينمكلي سو حطيت الكاونتر وقسمته على الماكس من عدد الاسئلة
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //هنا بقلك الويدث حدثه واضربه بمية عشان بدل ما يكون كسور 

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question ;

   choices.forEach(choice => {            //عشان أصل للخيارات واعمل لفة عليهم واخد الاجابة الصح
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);  //عشان اتخلص من السؤال اللي انعرض مرة ما يرجع يتكرر
  acceptingAnswers = true;                   //بسمح لليوزر يختار اجابة بعد كا احمل الاسئلة و الخيارات
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {    //عملت فور ايش للخيارات عشان اكون قادرة اضغط على الخيارات وفي الكونسول بيبين اني اخترت الاجابة بس لسا ما حددت اذا صح او غلط
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];  //بعد ما جاوبت السؤال بدي اروح للي بعده 

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //هاد اف بالتيرنيري اوبريتور ازا الاجابة صح اللي اخترتها بتساوي الاجابة اللي انا محددها للجواب حط كلاس كوريكت اللي هو الباك قراوند الو اخضر غير هيك احمر 

    if (classToApply === "correct") {   // هنا بستدعي الانكرمنت سكور بقله ازا الاجابة كانت كوريكت حطلي بالانكرمن بونص اللي هي +10
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);  //هنا لما اختار اجابة هيحط اخضر او احمر بس مش هتروح عشان اخليها تروح تحت ضفت نفس الجملة بس ريموف مش ادد

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply); //خليه يشيل الباكقراوند بعد ما اختار بس لو حطيته بدون سيت تايم اوت هيبين كانو ما عملت اشي عشان هيك عملت زي ديلاي قبل ما يعمل ريموف وهو فنكشن
      getNewQuestion();   // اعمل ريموف بهدها جيب السؤال اللي بعده بعد هاد الديلاي
    }, 1000);  //زمن الديلاي اللي بدي ياه
  });
});

incrementScore = num => {    // هنا عشان يعمل عداد للسكور ويزود عليها بس لازم استدعيه
  score += num;
  scoreText.innerText = score;
};
startGame();
//......................................... end js .......................................
const MAX_HIGH_SCORES = 3;
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;   //اعمله ديسبل ازا كان ما دخل يوزر نيم
});
const highScoresList = document.getElementById("highScoresList");
 const highScores = JSON.parse(localStorage.getItem('highScores')) || [];   
const saveHighScore = (e) => {
    e.preventDefault();
   
    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); 
};
saveScoreBtn.addEventListener('click', saveHighScore);
 localStorage.setItem('highScores', JSON.stringify(highScores));

// ..........................................high score .........................................
local.addEventListener('click',(e)=>{
  divstart.style.display = 'none';
  divscore.style.display = 'block';
 
highScoresList.innerHTML = highScores
.map(score => { return`<li class="high-score">${score.name} - ${score.score}</li>`;
  })  
  .join("");
})









 

  

    
 
