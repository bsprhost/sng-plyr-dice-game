

class clsSngDiceMgr {
    constructor(newDiceConfigs) {
        this.DiceConfigs = newDiceConfigs;

        this.putBtnsOnScreen();
        this.startDiceGame();
    }

    putBtnsOnScreen = () => {
        this.DiceConfigs.commands.forEach(strBtnName => {
            let intIndex = 0;
            const domButtons = document.getElementById("btn-panel");
            const domBtn = document.createElement('button');
            domBtn.classList.add('btn');
            domBtn.name = strBtnName;
            domBtn.innerText = this.getCaptions(strBtnName);
            domButtons.appendChild(domBtn);
            intIndex++;
        })
    }
    
    getCaptions = (strElementName) => {
        let strKeyValue = "";
        for(const entry of Object.entries(this.DiceConfigs)) {
            if (entry[0] == strElementName) {
                strKeyValue = entry[1];
                break;
            }
        }  
        return strKeyValue;   
    }

    rollDice = () => {
		let dice = document.getElementById("dice");
		let status = document.getElementById("status");
        let btnStart = document.getElementsByClassName("btn")[0];

		let diceResult = Math.floor(Math.random() * 6) + 1;
		diceTotal = diceTotal + diceResult;
		dice.innerHTML = diceResult;
        status.innerText = `You have rolled the number: ${diceResult}.\n`;
		status.innerText += `Your total score is: ${diceTotal}.\n\n`;
        btnStart.innerText = "Start";

		if(diceTotal > 20){
            this.procWinScore();
		}
        else if (diceResult == 1) {
            this.procLoseScore();
        }
    }

    procLoseScore = () => {
		let status = document.getElementById("status");
        let btnStart = document.getElementsByClassName("btn")[0];
        let btnRoll = document.getElementsByClassName("btn")[1];

        status.innerText += " UNLUCKY! You have lost his time.\n";
        status.innerText += " Please press the Restart button to play again.";
        btnStart.innerText = "--> Restart <--";
        btnRoll.innerText = "Roll";
        btnRoll.disabled = true;
        btnStart.disabled = false;
        diceTotal = 0;
        diceResult = 0;
    }

    procWinScore = () => {
		let dice = document.getElementById("dice");
		let status = document.getElementById("status");
        let btnStart = document.getElementsByClassName("btn")[0];
        let btnRoll = document.getElementsByClassName("btn")[1];

        status.innerText += "You have beaten the score of 20\n";
        status.innerText += " You are the WINNER!!\n";
        status.innerText += " Please press the Restart button to play again.";
        btnStart.innerText = "--> Restart <--";
        btnRoll.innerText = "Roll";
        btnRoll.disabled = true;
        btnStart.disabled = false;
        diceTotal = 0;
        dice.innerHTML = "";
    }

    hndClickInputs = (strClickElement) => {
        switch(strClickElement) {
                case "start":
                    this.startDiceGame();
                    break;
            
                case "roll":
                    this.rollDice();
                    break;
            }        
    }

    startDiceGame = () => {
        let dice = document.getElementById("dice");
        let status = document.getElementById("status");
        let btnStart = document.getElementsByClassName("btn")[0];
        let btnRoll = document.getElementsByClassName("btn")[1];

        status.innerText = " Welcome to a Single Player Dice Game.\n";
        status.innerText += "\n";
        status.innerText += " To roll the dice, please click the Roll button.";
        btnStart.innerText = "Start\n"
        btnRoll.innerText = "--> Roll <--";
        btnRoll.disabled = false;
        btnStart.disabled = true;
        dice.innerText = "";
    }
}

const objDiceConfigs = {"start":"Start",
                        "roll":"Roll",
                        "startFocus":"--> Restart <--",
                        "rollFocus":"--> Roll <--",
                        "playAgain":" Press the Restart button to play again.",
                        "diceTotal":"0",
                        commands: ['start',
                                    'roll']
};

let diceTotal = 0;

const objSngDiceMgr = new clsSngDiceMgr(objDiceConfigs);

// Listen for click events
document.addEventListener("click", (event) => {
    objSngDiceMgr.hndClickInputs(event.target.name);
});



