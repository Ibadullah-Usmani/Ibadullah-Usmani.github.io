function randomColor() {
    var colors = ["red", "blue", "purple", "green", "yellow", "black", "orange", "white"];
    var randomColor = colors[Math.floor(Math.random()*colors.length)];
    return randomColor;
}

function randomShape() {
    var shape = ["triangle", "square", "circle", "rectangle"];
    var randomShape = shape[Math.floor(Math.random()*shape.length)];
    return randomShape;
}

function randomNumbers(val) {
    var nums = [];
    for (var i = 1; i <= val; i++) {
        nums.push(i);
    }
    return shuffleArray(nums);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateShape(val, shape, shapeColor) {   

    if (shape == "triangle") {
        var shapeDiv = document.createElement("div");
        shapeDiv.classList.add('shape');
        shapeDiv.setAttribute("id", "triangle" + val);
        shapeDiv.style.borderBottom = "192px solid " + shapeColor;
        document.getElementById("box" + val).appendChild(shapeDiv);

    } else if (shape == "circle") {
        var shapeDiv = document.createElement("div");
        shapeDiv.classList.add('shape');
        shapeDiv.setAttribute("id", "circle" + val);
        shapeDiv.style.backgroundColor = shapeColor;
        document.getElementById("box" + val).appendChild(shapeDiv);

    } else if (shape == "square") {
        var shapeDiv = document.createElement("div");
        shapeDiv.classList.add('shape');
        shapeDiv.setAttribute("id", "square" + val);
        shapeDiv.style.backgroundColor = shapeColor;
        document.getElementById("box" + val).appendChild(shapeDiv);

    } else if (shape == "rectangle") {
        var shapeDiv = document.createElement("div");
        shapeDiv.classList.add('shape');
        shapeDiv.setAttribute("id", "rectangle" + val);
        shapeDiv.style.backgroundColor = shapeColor;
        document.getElementById("box" + val).appendChild(shapeDiv);
    }
}

function generateText(val, boxID, shapeText, textColor, textBGColor, num, numColor) {

    var txtColor = document.createElement("label");
    txtColor.classList.add('txtColor');
    txtColor.setAttribute("id", "txtColor" + val);
    txtColor.innerHTML = textColor.toUpperCase();
    txtColor.style.color = textBGColor;
    document.getElementById(boxID).appendChild(txtColor);

    var numLabel = document.createElement("label");
    numLabel.classList.add('num');
    numLabel.setAttribute("id", "num" + val);
    numLabel.innerHTML = num;
    numLabel.style.color = numColor;
    document.getElementById(boxID).appendChild(numLabel);
    
    var txtShape = document.createElement("label");
    txtShape.classList.add('txtShape');
    txtShape.setAttribute("id", "txtShape" + val);
    txtShape.innerHTML = shapeText.toUpperCase();
    txtShape.style.color = textBGColor;
    document.getElementById(boxID).appendChild(txtShape);
}

function createCards(trueNums) {

    return new Promise(function(resolve, reject) {
        console.log("CREATE CARDS");
        document.getElementById("tileBox").style.display = "flex";
        document.getElementById("question").style.display = "grid";
        document.getElementById("inputBox").style.display = "flex";
        document.getElementById("time").style.display = "block";
        document.getElementById("questionId").style.display = "grid";
        document.getElementById("qsLabel").style.display = "block";
        document.getElementById("answer").style.display = "block";
        document.getElementById("restart").style.display = "block";
        document.getElementById("answer").focus();
        document.getElementById("answer").value = "";

        //Stores the random generated attributes for each box
        var boxAttributes = [];

        //Stores the answer along with the true numbers
        var trueAnswer = [];

        //Set the index for which box to select, making sure it's not duplicated
        var card1Index = trueNums[Math.floor(Math.random() * trueNums.length)];
        var card2Index = trueNums[Math.floor(Math.random() * trueNums.length)];
        while (card2Index == card1Index) {
            card2Index = trueNums[Math.floor(Math.random() * trueNums.length)];
        }
        console.log("card1Index are: " + card1Index);
        console.log("card2Index are: " + card2Index);

        //Store card answers
        var card1Answer;
        var card2Answer;

        //Set # of tiles to display
        var numOfTiles = trueNums.length;

        //Random non-duplicating number that appears on each card
        var randoNums = randomNumbers(numOfTiles);
        
        // var offsetWidth = document.getElementById('cont').offsetWidth;
        // var offsetHeight = document.getElementById('cont').offsetHeight;

        //Generate the box cards
        for (var i = 0; i < trueNums.length; i++) {
            console.log("CARD FORLOOP");

            //Generate random colors, shapes and text for the card
            var bgColor = randomColor();
            var shape = randomShape();
            var shapeColor = randomColor();
            var shapeText = randomShape();
            var textColor = randomColor();
            var textBGColor = randomColor();
            var numBGColor = randomColor();
         
            //Prevent scenarios where it becomes hard to see certain shapes/text with same colour of background
            while (shapeColor == bgColor) {
                shapeColor = randomColor();
            }
            while (textBGColor == shapeColor || textBGColor == bgColor) {
                textBGColor = randomColor();
            }
            while (numBGColor == shapeColor || numBGColor == bgColor) {
                numBGColor = randomColor();
            }

            //Will be used to select random attributes for the answer
            boxAttributes = [["BACKGROUND COLOR", bgColor], 
                            ["SHAPE", shape], 
                            ["SHAPE COLOR", shapeColor],
                            ["SHAPE TEXT", shapeText],
                            ["TEXT COLOR", textColor],
                            ["TEXT BACKGROUND COLOR", textBGColor],
                            ["NUMBER COLOR", numBGColor]];

            //Set random answers while tracking the true number index
            if (trueNums[i] == card1Index) {
                card1Answer = boxAttributes[Math.floor(Math.random() * boxAttributes.length)];
                while (card2Answer == card1Answer) {
                    card2Answer = boxAttributes[Math.floor(Math.random() * boxAttributes.length)];
                }
                trueAnswer.push([0, card1Answer[0], card1Index, card1Answer[1]]);
            }

            if (trueNums[i] == card2Index) {
                card2Answer = boxAttributes[Math.floor(Math.random() * boxAttributes.length)];
                while (card2Answer == card1Answer) {
                    card2Answer = boxAttributes[Math.floor(Math.random() * boxAttributes.length)];
                }
                trueAnswer.push([1, card2Answer[0], card2Index, card2Answer[1]]);
            } 

            //Generates divs for the boxes along with the background color
            var boxDiv = document.createElement("div");
            boxDiv.classList.add('box');
            boxDiv.setAttribute("id", "box" + i);
            boxDiv.style.width = 1024 / numOfTiles + "px";
            boxDiv.style.height = 1024 / numOfTiles + "px";
            boxDiv.style.background = bgColor;
            document.getElementById("tileBox").appendChild(boxDiv);            

            generateShape(i, shape, shapeColor);
            generateText(i, "box" + i, shapeText, textColor, textBGColor, randoNums[i], numBGColor);     
        }

        document.getElementById("question").innerHTML= "Enter the " + trueAnswer[0][1] + " (" + trueAnswer[0][2] + ") and the " + trueAnswer[1][1] + " (" + trueAnswer[1][2] + ")";
        console.log("LEAVING CARD SCREEN");
        resolve (trueAnswer);
    });
}

function createPrompt(promptTime, nums) {

    return new Promise(function(resolve, reject) {
        document.getElementById("order").style.display = "flex";
        document.getElementById("resultContainer").style.display = "none";
        document.getElementById("streak").style.display = "none";
        document.getElementById("time").style.display = "none";
        document.getElementById("questionId").style.display = "none";
        document.getElementById("qsLabel").style.display = "none";
        document.getElementById("answer").style.display = "none";
        document.getElementById("restart").style.display = "none";

        //Real number order
        var trueNums = nums;
        var numOfTiles = trueNums.length; 
               
        //Generate the box cards with the true numbers
        for (var i = 1; i <= numOfTiles; i++) {
            console.log("PROMPT FORLOOP");
            var boxDiv = document.createElement("div");
            boxDiv.classList.add('promptBox');
            boxDiv.setAttribute("id", "promptBox" + i);
            boxDiv.style.width = 1024 / numOfTiles + "px";
            boxDiv.style.height = 1024 / numOfTiles + "px";
            boxDiv.style.background = "#1b1b1b";
            document.getElementById("order").appendChild(boxDiv);

            var numLabel = document.createElement("label");
            numLabel.classList.add('num');
            numLabel.setAttribute("id", "numPrompt" + i);
            numLabel.innerHTML = trueNums[i-1];
            document.getElementById("promptBox" + i).appendChild(numLabel);
        }
        console.log("EXITING PROMPT FORLOOP");
        //Display the prompt for X number of seconds and then hide the prompt screen
        var tick = function() {
            console.log("HIDING PROMPT SCREEN");
            document.getElementById("order").style.display = "none";
            resolve(clearInterval(prompt));  
        };       
        var prompt = setInterval(tick, promptTime*1000);  
    });   
}

function menuPage() {

    return new Promise(function(resolve, reject) { 
        //Display Menu page and hide everything else
        document.getElementById("mainPage").style.display = "flex";
        document.getElementById("answer").value = "";
        document.getElementById("tileBox").style.display = "none";
        document.getElementById("question").style.display = "none";
        document.getElementById("time").style.display = "none";
        document.getElementById("resultContainer").style.display = "none";
        document.getElementById("streak").style.display = "none";
        document.getElementById("inputBox").style.display = "none";
        document.getElementById("order").style.display = "none";

        $('#start').click(function() {
            document.getElementById("mainPage").style.display = "none";
            resolve(document.getElementById("order").style.display = "flex");
        })
    });
}

function checkTime(timeAllowed, input) {

    return new Promise(function(resolve, reject) {
        console.log("CHECK TIME");
        var answer = false;
        var timerVar = setInterval(counter, 1000);
        var totalSeconds = 0;
        var timeReducer;
        // var transition = document.querySelector('#timer');
        // var transitionEnded = false;

        $('#restart').click(function() {
            clearInterval(timerVar);
            document.getElementById("timer").style.width = "100%";
            resolve("restart");
        })

        //Send answer false if timer is up
        function counter() {
                  
            ++totalSeconds;
            timeReducer = totalSeconds/timeAllowed * 100;
            console.log("TIME = " + totalSeconds);
   
            document.getElementById("timer").style.width = 100 - (timeReducer) + "%"; 
            //document.getElementById("timer").style.transition = "width 1s linear";
            // if (document.getElementById("timer").style.width.slice(0, -1) >= 0) {
  
            // }      
            console.log("TIMER WIDTH = " + document.getElementById("timer").style.width);
             //Time to answer is up
             if (totalSeconds >= timeAllowed) {
                clearInterval(timerVar);
                resolve(answer);
            } 
        }

        //Check the answer inputted by user and send state of answer being true/false
        $(document).keyup(function(event) {
            if ($("#answer").is(":focus") && event.key == "Enter") {
                // Do work
                clearInterval(timerVar);
                if ($("#answer").val().toLowerCase() == input.toLowerCase() && !(totalSeconds >= timeAllowed)) {
                    $('#tileBox').empty();
                    $('#order').empty();
                    answer = true;
                    document.getElementById("timer").style.width = "100%";
                    resolve(answer);
                } else {
                    resolve(answer);
                }
            }
        });  
    });
}

async function checkAnswer(promptTime, answerTime) {
    
    var correct = true;
    var streak = 0;
    

    //Show menu
    if (retry == false) {
        await menuPage();
    }
    

    //Option select (maybe 4-6 tiles and speed)

    //Start option to trigger prompt (but leave a header menu with setting change)
    while(correct == true) {
        var trueNums = randomNumbers(4);
        var answer;
   
        await createPrompt(promptTime, trueNums);
        answer = await createCards(trueNums);

        answer = answer[0][3] + " " + answer[1][3];
        console.log("Answer is " + answer);
             
        //do Answer validation and pass it to checkTime
        var timeLeft = await checkTime(answerTime, answer);
        console.log("TIME LEFT = " + timeLeft);

        if (timeLeft == true) {
            streak++;
        } else {  
            if (timeLeft != "restart") {
                document.getElementById("realNums").innerHTML= "REAL NUMBERS: " + trueNums;
                document.getElementById("realAnswer").innerHTML= "SOLUTION: " + answer.toUpperCase();
                document.getElementById("resultContainer").style.display = "block";
                document.getElementById("streak").style.display = "grid";
                document.getElementById("streak").innerHTML = "STREAK: " + streak;
                console.log("STREAK = " + streak);
            }   
            correct = false;
            retry = true;
        }
    } 
}

var retry = false;  
checkAnswer(3, 6);
$('#restart').click(function() {
    $('#tileBox').empty();
    $('#order').empty();
    checkAnswer(3, 6);
})  