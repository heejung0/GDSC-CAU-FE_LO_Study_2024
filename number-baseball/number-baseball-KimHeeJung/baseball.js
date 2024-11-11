let computerNumber = generateRandomNumber();

function generateRandomNumber() {
    let digits = new Set();
    while (digits.size < 3) {
        digits.add(Math.floor(Math.random() * 10));
    }
    return Array.from(digits).join('');
}

function playGame() {
    const userInput = document.getElementById("user-input").value;
    if (!/^\d{3}$/.test(userInput) || new Set(userInput).size !== 3) {
        alert("서로 다른 세 자리 숫자를 입력하세요.");
        return;
    }
    
    const result = checkGuess(userInput, computerNumber);
    
    if (result.strikes === 0 && result.balls === 0) {
        document.getElementById("result").innerText = "아웃";
    } else {
        document.getElementById("result").innerText = `${result.strikes} 스트라이크, ${result.balls} 볼`;
    }
    
    addHistory(userInput, result.strikes, result.balls);

    if (result.strikes === 3) {
        const restart = confirm("축하합니다! 숫자를 맞추셨습니다!\n재시작하려면 확인을, 게임을 종료하려면 취소를 눌러주세요.");
        if (restart) {
            computerNumber = generateRandomNumber();
            document.getElementById("result").innerText = "";
            document.getElementById("user-input").value = "";
            document.getElementById("history").innerHTML = "<h2>기록</h2>";
        } else {
            window.close();
        }
    }
}

function checkGuess(userInput, computerNumber) {
    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < 3; i++) {
        if (userInput[i] === computerNumber[i]) {
            strikes++;
        } else if (computerNumber.includes(userInput[i])) {
            balls++;
        }
    }

    return { strikes, balls };
}

function addHistory(input, strikes, balls) {
    const historyDiv = document.getElementById("history");
    const entry = document.createElement("p");
    
    if (strikes === 0 && balls === 0) {
        entry.textContent = `${input} : 아웃`;
    } else {
        entry.textContent = `${input} : ${strikes} 스트라이크, ${balls} 볼`;
    }
    
    historyDiv.appendChild(entry);
}
