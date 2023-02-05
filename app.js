document.addEventListener('DOMContentLoaded', () => {
    //This array are the Cards or options that displays on game and can be fliped
    const cardArray = [
        {
            name: 'Skyline R34 GTR',
            img: 'images/r34.jpg'
        },
        {
            name: 'The Ultimate Drift Machine',
            img: 'images/180sx.jpg'
        },
        {
            name: '86 in Retro Vibe',
            img: 'images/86retro.jpg'
        },
        {
            name: '370z',
            img: 'images/370z.jpg'
        },
        {
            name: 's12 with Pop-ups',
            img: 'images/s12.jpg'
        },
        {
            name: 'Shinigami no skyline',
            img: 'images/shinigamiR32.jpg'
        },//Repeating the same images after this point
        {
            name: 'Skyline R34 GTR',
            img: 'images/r34.jpg'
        },
        {
            name: 'The Ultimate Drift Machine',
            img: 'images/180sx.jpg'
        },
        {
            name: '86 in Retro Vibe',
            img: 'images/86retro.jpg'
        },
        {
            name: '370z',
            img: 'images/370z.jpg'
        },
        {
            name: 's12 with Pop-ups',
            img: 'images/s12.jpg'
        },
        {
            name: 'Shinigami no skyline',
            img: 'images/shinigamiR32.jpg'
        }
    ]
    //sorting an array randomly
    //Generates a random value between -0.5 and 0.5 which can be positive negative zero that way it can sort the array in most random order everytime the page is refreshed
    cardArray.sort(() => 0.5 - Math.random());

    const grid_Display = document.querySelector('#grid'); //Selects the element by the ID and put in the const 
    const resultDisplay = document.querySelector('#result');// ||     ||          ||            ||
    let chosenCard = []; //Cards that are chosen by player
    let chosenCardIDs = []; //Chosen IDs of the cards that are chosen 
    let cardsWon = []; //Number of Cards that a player picked and matched Score depends on this 
    // console.log(grid_Display);




    //Creating the Board Game with the Cards by arranging them in order and covering them by the CoverImage
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img')//Dynamically allocating the image
            card.setAttribute('src', 'images/coverImageR.jpe');//setAttribute () mod HTML and add image and more.
            //data-id is setting the data for the each card that's gonna display on the game so that we can identify which card is which 
            card.setAttribute('data-id', i);
            //EventLisnter to register any clicks on the Cards and callback to flip_card event when it gets invoked
            card.addEventListener('click', flip_card);
            // grid_Display.append(card); //adding the each card within each loop in the HTML
            grid_Display.appendChild(card);
            // console.log(card, i);
        }
    }


    //Function to to check if the Player picked two same cards or other Matching Cards
    function checkMatch() {

        //cards is grabbing all the images present in the #grid section and storing it in the array
        const cards = document.querySelectorAll('img');

        //OptionID1 and OptionID2 are the Cards that is fliped by the user and setting up with a constant
        const optionID1 = chosenCardIDs[0];
        const optionID2 = chosenCardIDs[1];


        // console.log('checkmatch for match'
        if (optionID1 == optionID2) {
            cards[optionID1].setAttribute('src', 'images/CoverImageR.jpe');
            cards[optionID2].setAttribute('src', 'images/CoverImageR.jpe');
            alert('you clicked the same card');
        }
        else if (chosenCard[0] === chosenCard[1]) {
            alert('you found a match');
            cards[optionID1].setAttribute('src', 'images/white.png');
            cards[optionID2].setAttribute('src', 'images/white.png');
            cards[optionID1].removeEventListener('click', flip_card);
            cards[optionID2].removeEventListener('click', flip_card);
            cardsWon.push(chosenCard);
        }
        else {
            cards[optionID1].setAttribute('src', 'images/CoverImageR.jpe');
            cards[optionID2].setAttribute('src', 'images/CoverImageR.jpe');
            alert('sorry try again');
        }
        chosenCard = [];//Resting the value of the array so it'll be ready for the next card
        chosenCardIDs = [];//same thing
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === (cardArray.length / 2)) {
            resultDisplay.textContent = 'Congratulations You found them all';
        }
    }

    //This function will flip the cover Image and reveal the Hidden Card that is under the image
    function flip_card() {
        // console.log(cardArray);

        //Retrieving the Card by it's Data-ID which we set earlier to identify the Card and storing it in a Array 
        let cardID = this.getAttribute('data-id');
        // console.log(cardArray[cardID].name);

        //Picking the Card that is fliped by the user and putting it's name  in New Constant Array
        chosenCard.push(cardArray[cardID].name);
        // console.log('clicked',cardID);
        // console.log(chosenCard);

        //Pushing the CardID of the the card that is fliped by the player in the new Array
        chosenCardIDs.push(cardID);

        //The main function that display the the Picked Card basically flip the cover Card by using the setAttribute()
        //It's replacing the Cover Image with that card underneath by grabbing it with the CardID that is with the Card itself
        this.setAttribute('src', cardArray[cardID].img);

        //This function invoked when Two cards get flipped it calls a function checkMatch()
        if (chosenCard.length === 2) {
            setTimeout(checkMatch, 500);
            // checkMatch();
        }
    }

    createBoard();//calling the createBoard function to set up the Initial Game UI
});