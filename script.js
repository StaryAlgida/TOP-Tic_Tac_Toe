function createImg(src, id){
    const img = document.createElement("img");
    img.src = src;
    img.setAttribute('id',id);
    return img;
}

const game = (rounds) =>{
    let roundsCounter = 0;
    let score = [0,0];
    let whoType = "X"

    const player1Score = document.querySelector("#player1");
    const player2Score = document.querySelector("#player2");
    
    const setType = () =>{
        whoType = whoType === "X" ? "O" : "X";
    }

    const getWhoType = () => whoType;

    const setScore = (winner) =>{
        if(winner.getType === "X"){
            score[0]++;
        }
        else{
            score[1]++;
        }
    };
    const updateScore = () =>{
        player1Score.innerText = score[0];
        player2Score.innerText = score[1];
    };
    const setRound = () => roundsCounter++;

    return{setScore, updateScore, setRound, setType, getWhoType};
}


const player = (type, img) =>{
    const getType = () => type;
    const getImg = () => img;

    return {getType, getImg};
};

const player1 = player("X", "https://img.icons8.com/nolan/64/x.png");
const player2 = player("O", "https://img.icons8.com/nolan/64/o.png");
const newGame = game(2);

const fileds = document.querySelectorAll(".field");

let moveCounter = 0;

fileds.forEach(element =>{
    element.counter = 0; 
    element.addEventListener('click',()=>{

        if(newGame.getWhoType() === "X" && element.counter === 0)
        {
            element.counter ++;
            const img = createImg(player1.getImg(), "X");
            element.appendChild(img);
        }
        else if(element.counter === 0)
        {
            element.counter ++;
            const img = createImg(player2.getImg(), "O");
            element.appendChild(img);
        }
        round()
    });
});

function round(){
    moveCounter ++;
    newGame.setType();
    // let winner = isWinner();
    if(moveCounter === 9 || winner){
        //check a winner
        //clear the board
        
    }
}

// function checkId(filed, mark){
//     const child = filed.childNodes;
//     console.log(`filed id = ${child[0].id}`);
//     return filed.id === mark;
// }

// function isWinner(){
//     checkRows("X");
// }

// function checkRows(mark){
//     let counter = 0;
//     for(let i=0; i<9; i++){
//         if(checkId(fileds[i], mark)){
//             counter++;
//         }
//         if(i%3===0 && counter === 3){
//             return mark;
//         }
//     }
// }
