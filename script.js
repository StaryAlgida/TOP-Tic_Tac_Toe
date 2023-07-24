function createImg(src){
    const img = document.createElement("img");
    img.src = src;
    img.classList.add('imgs');
    return img;
}

const winRule = (()=>{

    const findWinner = (gameBoard) =>{
        let winnerRows;
        let winnerColumns;
        let winnerCorners;
        if(winnerRows = checkRows(gameBoard)){
            console.log(`winnerRows ${winnerRows}`);
            return winnerRows;
        }
        else if(winnerColumns = checkColumns(gameBoard)){
            console.log(`winnerColumns ${winnerColumns}`);
            return winnerColumns;
        }
        else if(winnerCorners = checkCorners(gameBoard)){
            console.log(`winnerCorners ${winnerCorners}`);
            return winnerCorners;
        }
        else{
            return null;
        }
        
    }

    const checkTypeRows = (board, start, end) =>{
        let xCounter = 0;
        let oCounter = 0;

        for(let i = start; i <= end; i++){
            if(board[i] === 'X'){
                xCounter++;
                if(xCounter === 3) return 'X';
            }
            else if(board[i] === 'O'){
                oCounter++;
                if (oCounter === 3) return 'O';
            }
        }
        return null;
    }

    const checkTypeColumns = (board, start)=>{
        let xCounter = 0;
        let oCounter = 0;

        for(let i = start; i <= start + 6; i += 3 ){
            if(board[i] === 'X'){
                xCounter++;
                if(xCounter === 3) return 'X';
            }
            else if(board[i] === 'O'){
                oCounter++;
                if (oCounter === 3) return 'O';
            }
        }
        return null;
    }

    const checkCornersType = (board, start, end, iterator) => {

        let xCounter = 0;
        let oCounter = 0;

        for(let i = start;i <= end; i+=iterator){
            if(board[i] === 'X'){
                xCounter++;
                if(xCounter === 3) return 'X';
            }
            else if(board[i] === 'O'){
                oCounter++;
                if (oCounter === 3) return 'O';
            }
        }
        return null;
    }

    const checkCorners = (gameBoard)=>{
        let winner;

        if((winner = checkCornersType(gameBoard, 0, 8, 4)) !== null || (winner = checkCornersType(gameBoard, 2, 6, 2)) !== null){
            return winner;
        }
        else return null;
    }

    const checkColumns = (gameBoard) =>{
        let winner
        for(let i = 0; i <= 3; i++){
            if(winner = checkTypeColumns(gameBoard, i)){
                return winner;
            }
        }
        return null;
    }

    const checkRows = (gameBoard) =>{
        let winner;
        if(((winner = checkTypeRows(gameBoard, 0, 2)) !== null) || ((winner = checkTypeRows(gameBoard, 3, 5)) !== null)|| ((winner = checkTypeRows(gameBoard, 6, 8)) !== null)){
            return winner;
        }
        else return null;
    };
    return{findWinner};
})();

const game = () =>{
    let score = [0,0];
    let whoType = "X"
    let gameBoard = new Array(9).fill(0);

    const player1Score = document.querySelector("#player1");
    const player2Score = document.querySelector("#player2");
    
    const setType = () =>{
        whoType = whoType === 'X' ? 'O' : 'X';
    }

    const getWhoType = () => whoType;
    const getBoard = () => gameBoard;

    const updateBoard = (type, id) => gameBoard[id] = type;

    const setScore = (winner) =>{
        if(winner === 'X'){
            score[0]++;
        }
        else if (winner === 'O'){
            score[1]++;
        }
    };
    const updateScore = () =>{
        player1Score.innerText = score[0];
        player2Score.innerText = score[1];
    };

    const isWinner = () => winRule.findWinner(gameBoard);

    const clearBoard = () =>{
        gameBoard.fill(0);
        document.querySelectorAll('.imgs').forEach((e)=>{
            e.parentNode.removeChild(e);
        });

        whoType = "X";
    } 

    return{setScore, updateScore, setType, getWhoType, getBoard, isWinner, updateBoard, clearBoard};
}


const player = (type, img) =>{
    const getType = () => type;
    const getImg = () => img;

    return {getType, getImg};
};

const player1 = player('X', "https://img.icons8.com/nolan/64/x.png");
const player2 = player('O', "https://img.icons8.com/nolan/64/o.png");
const newGame = game();

const fileds = document.querySelectorAll(".field");

let moveCounter = 0;

fileds.forEach(element =>{
    element.counter = 0; 
    element.addEventListener('click',()=>{

        if(newGame.getWhoType() === 'X' && element.counter === 0)
        {
            element.counter ++;
            const img = createImg(player1.getImg());
            newGame.updateBoard('X', element.id);
            element.appendChild(img);
            round();
        }
        else if(element.counter === 0)
        {
            element.counter ++;
            const img = createImg(player2.getImg());
            newGame.updateBoard('O', element.id);
            element.appendChild(img);
            round();
        }
        console.log(newGame.getBoard());
        
    });
});

function round(){
    moveCounter ++;
    newGame.setType();
    let winner;
    if(moveCounter >= 5){
        //check a winner
        if(winner = newGame.isWinner()){
            console.log(`winner: ${winner}`);
            
            //set and update score
            newGame.setScore(winner);
            newGame.updateScore();

            //clear the borad
            newGame.clearBoard();


            //reste winner and fileds counter
            winner = null;
            fileds.forEach((e)=>{
                e.counter = 0;
            });

            //reset move counter
            moveCounter = 0;
            
        }

        else if(moveCounter === 9){
            console.log(`Draw`);

            //clear the borad
            newGame.clearBoard();

            //reste winner and fileds counter
            winner = null;
            fileds.forEach((e)=>{
                e.counter = 0;
            });

            //reset move counter
            moveCounter = 0;
        }
    }
    
}

