//variables
questionNumber = 0;
correctAnswers = 0;

function changeQuestion(){
  questionNumber++;
}

function questionCounter(){
  let questionCounter = questionNumber;
  $('.displayNumber').text(questionCounter+1);
}

function scoreCounter(){
  correctAnswers++;
  $('.displayScore').text(correctAnswers);
}

function updateDisplay(){
  changeQuestion();
  questionCounter();
}

//generates the html for the question and form
function generateQuestionHTML(QUIZ){
  return `<h1 class="textContainer">${QUIZ[questionNumber].content}</h1>
  <form>
    <fieldset>
      <legend>Pick One:</legend>
        <label class="formContainer">
          <input type="radio" name="group1" id="input1" value="${QUIZ[questionNumber].input1}" checked>${QUIZ[questionNumber].input1}</input>
        </label>
          <br>
        <label class="formContainer"> 
          <input type="radio" name="group1" id="input2" value="${QUIZ[questionNumber].input2}" >${QUIZ[questionNumber].input2}</input>
        </label>
          <br>
        <label class="formContainer">
          <input type="radio" name="group1" id="input3" value="${QUIZ[questionNumber].input3}" >${QUIZ[questionNumber].input3}</input>
        </label>
          <br>
        <label class="formContainer">
          <input type="radio" name="group1" id="input4" value="${QUIZ[questionNumber].input4}" >${QUIZ[questionNumber].input4}</input>
        </label>
    </fieldset>
  </form>
  <button type="submit" class=buttonBox id="js-submit-button">Submit</button>`;
}

function generateResultsHTML(){
  if (correctAnswers == 10){
    console.log("10 out of 10");
    return `<h1 class="textContainer">Final Score: ${correctAnswers} out of 10 correct</h1>
  <img src="https://i.giphy.com/media/orLVhnnoegyIM/giphy.webp" type="image/webp" alt="10 gif" class="feedbackImg">
  <button type="button" class="buttonBox" id="js-reset-button">Start Over?</button>`;
  }
  else if (correctAnswers <= 5){
    console.log("Ehh");
    return `<h1 class="textContainer">Final Score: ${correctAnswers} out of 10 correct</h1>
  <img src="https://fat.gfycat.com/WelcomeLeadingEyra.gif" type="image/gif" alt="disappoint gif" class="feedbackImg">
  <button type="button" class="buttonBox" id="js-reset-button">Start Over?</button>`;
  }
  else {
    console.log("Not bad");
    return `<h1 class="textContainer">Final Score: ${correctAnswers} out of 10 correct</h1>
  <img src="https://media1.tenor.com/images/c9e275989e2db24c1baa3a790e32ceca/tenor.gif?itemid=4088266" type="image/gif" alt="celebrate gif" class="feedbackImg">
  <button type="button" class="buttonBox" id="js-reset-button">Start Over?</button>`;
  }
}

function generateCorrectFeedback(){
  return `<h1 class="textContainer">Correct!</h1>
  <img src="https://i.giphy.com/media/xT1XGPDVdqIWOX1DTG/giphy.webp" type="image/webp" alt="clapping gif" class="feedbackImg">
  <button type="button" class="buttonBox" id="js-next-button">Next</button>`;
}

function correctFeedback(){
  $('.content').html(generateCorrectFeedback);
}

function generateinCorrectFeedback(){
  return `<h1 class="textContainer">
		<b>Wrong!<b>
		<p>The correct answer was ${QUIZ[questionNumber].rightAnswer}!<p>
	</h1>
  <img src="https://i.giphy.com/media/jGeuf0mcBdh3q/giphy.webp" type="image/webp" alt="wrong gif" class="feedbackImg">
	<button type="button" class="buttonBox" id="js-next-button">Next</button>`;
}

function incorrectFeedback(){
  $('.content').html(generateinCorrectFeedback);
}

function generateForm(){
  if (questionNumber < QUIZ.length) {
    $('.content').html(generateQuestionHTML(QUIZ));
  }
  else {
    $('.content').html(generateResultsHTML);
    $('.displayNumber').text(10);
  }
}

function handleStartButton(){
  $('#js-start-button').click(function(event) {
    console.log('Starting quiz')
    generateForm();
    questionCounter();
  });
}

function checkAnswer(){
  console.log('Checking answers');
  let selected = $('input:checked');
  let answer = selected.val();
  let answerKey = `${QUIZ[questionNumber].rightAnswer}`;
  if (answer == answerKey) {
    console.log('Correct');
    correctFeedback();
    scoreCounter();
  }
  else {
    console.log('Incorrect');
    incorrectFeedback();
  }
}

function handleSubmitButton(){
   $('.content').on('click', '#js-submit-button', function(event){
    console.log('Submit');
    event.preventDefault();
    checkAnswer();
   });
}

  function handleNextButton(){
    $('.content').on('click', '#js-next-button', function(event){
      console.log('Next');
      updateDisplay();
      generateForm();
    });
  }

  function handleResetButton(){
    $('.content').on('click', '#js-reset-button', function(event){
      console.log('Starting Over...');
      questionNumber = 0;
      correctAnswers = 0;
      generateForm();
      questionCounter();
      $('.displayScore').text(correctAnswers);
    });
  }

function startGame(){
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleResetButton();
}

$(document).ready();
startGame();