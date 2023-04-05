const cardArray = [
    //* This array are the Cards or options that displays on game and can be fliped
    {
        name: 'Skyline R34 GTR',
        img: 'images/cards/r34.jpg'
    },
    {
        name: 'The Ultimate Drift Machine',
        img: 'images/cards/180sx.jpg'
    },
    {
        name: '86 in Retro Vibe',
        img: 'images/cards/86retro.jpg'
    },
    {
        name: '370z',
        img: 'images/cards/370z.jpg'
    },
    {
        name: 's12 with Pop-ups',
        img: 'images/cards/s12.jpg'
    },
    {
        name: 'Shinigami no skyline',
        img: 'images/cards/shinigamiR32.jpg'
    },
    //* Repeating the same images after this point
    {
        name: 'Skyline R34 GTR',
        img: 'images/cards/r34.jpg'
    },
    {
        name: 'The Ultimate Drift Machine',
        img: 'images/cards/180sx.jpg'
    },
    {
        name: '86 in Retro Vibe',
        img: 'images/cards/86retro.jpg'
    },
    {
        name: '370z',
        img: 'images/cards/370z.jpg'
    },
    {
        name: 's12 with Pop-ups',
        img: 'images/cards/s12.jpg'
    },
    {
        name: 'Shinigami no skyline',
        img: 'images/cards/shinigamiR32.jpg'
    }
]
//* Sorting/Shuffling an array randomly
//* Generates a random value between -0.5 and 0.5 which can be positive negative zero that way it can sort the array in most random order everytime the page is refreshed
cardArray.sort(() => 0.5 - Math.random());

//! VARIABLES 

//* Selects the element by the ID and put in the const 
const grid_Display = $('#grid');
const resultDisplay = $('#result');
//* Setting the Header and span hiden by default so it' doesn't look sloppy be defualt
let chosenCard = []; //* Cards that are chosen by player
let chosenCardIDs = []; //* Chosen IDs of the cards that are chosen 
let cardsWon = []; //* Number of Cards that a player picked and matched Score depends on this 
//!FUNCTIONS 

//* Creating the Board Game with the Cards by arranging them in order and covering them by the CoverImage
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {

        const card = $('<img>').attr({
            'src': 'images/Cover.png',
            'data-id': i
        });
        card.on('click', flip_card);
        grid_Display.append(card);
    }
}

//* Function to to check if the Player picked two same cards or other Matching Cards
function checkMatch() {

    // cards is grabbing all the images present in the #grid section and storing it in the array
    const cards = $('img');

    //OptionID1 and OptionID2 are the Cards that is fliped by the user and setting up with a constant
    const optionID1 = chosenCardIDs[0];
    const optionID2 = chosenCardIDs[1];


    if (optionID1 == optionID2) {
        cards.eq(optionID1).attr('src', 'images/Cover.png');
        cards.eq(optionID2).attr('src', 'images/Cover.png');
        // alert('you clicked the same card');
        $('#target').show();
        resultDisplay.text("You Clicked the same card");
    }
    else if (chosenCard[0] === chosenCard[1]) {
        // alert('you found a match');
        $('#target').show();
        resultDisplay.text("you found a match");
        // cards.eq(optionID1).attr('src', 'images/white.png');
        // cards.eq(optionID2).attr('src', 'images/white.png');
        cards.eq(optionID1).attr('src', 'images/transparent.png');
        cards.eq(optionID2).attr('src', 'images/transparent.png');
        cards.eq(optionID1).off('click', flip_card);
        cards.eq(optionID2).off('click', flip_card);
        cardsWon.push(chosenCard);
        if (cardsWon.length === (cardArray.length / 2)) {
            // resultDisplay.textContent = 'Congratulations You found them all';
            $('#target').show();
            resultDisplay.text("Congratulations You found them all");
            cardsWon = [];
            setTimeout(() => {
                $('#target').hide();
                $('#t2').hide();
                $('#cringe').mouseenter(function () {
                    $('#cringe button').removeClass('hide');
                });
                $('#cringe').mouseleave(function () {
                    $('#cringe button').addClass('hide');
                });
            }, 2000);
            autoBG();
        }
    }
    else {
        cards.eq(optionID1).attr('src', 'images/Cover.png');
        cards.eq(optionID2).attr('src', 'images/Cover.png');
        // alert('sorry try again');
        $('#target').show();
        resultDisplay.text("Sorry Try again");
    }
    chosenCard = [];//* Resting the value of the array so it'll be ready for the next card
    chosenCardIDs = [];//same thing
    // resultDisplay.text("");
    // resultDisplay.text(cardsWon.length);
}

//* This function will flip the cover Image and reveal the Hidden Card that is under the image

function flip_card() {

    //Retrieving the Card by it's Data-ID which we set earlier to identify the Card and storing it in a Array 
    let cardID = this.getAttribute('data-id');

    //Picking the Card that is fliped by the user and putting it's name  in New Constant Array
    chosenCard.push(cardArray[cardID].name);

    //Pushing the CardID of the the card that is fliped by the player in the new Array
    chosenCardIDs.push(cardID);

    //The main function that display the the Picked Card basically flip the cover Card by using the setAttribute()
    //It's replacing the Cover Image with that card underneath by grabbing it with the CardID that is with the Card itself
    this.setAttribute('src', cardArray[cardID].img);

    //This function invoked when Two cards get flipped it calls a function checkMatch()
    if (chosenCard.length === 2) {
        setTimeout(checkMatch, 100);
    }
    // Reseting the span so it don't display content all the time unless it have to
    resultDisplay.text("");
}

createBoard();//calling the createBoard function to set up the Initial Game UI

function playAgain() {
    $('#t2').show();
    $('#grid img').remove();
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
}
//! Functions for Stylings and stuff
//Todo: Short this function with a for loop instead of fucking around like this
bgObj = {
    bg1: "url(images/bg/86blackandwhite.png) no-repeat center center/cover",
    bg2: "url(images/bg/86illustration.jpg) no-repeat center center/cover",
    bg3: "url(images/bg/86loli.jpg) no-repeat center center/cover",
    bg4: "url(images/bg/86purple.jpg) no-repeat center center/cover",
    bg5: "url(images/bg/86redwidebody.jpg) no-repeat center center/cover",
    bg6: "url(images/bg/86sexy.jpg) no-repeat center center/cover",
    bg7: "url(images/bg/86skid.jpg) no-repeat center center/cover",
    bg8: "url(images/bg/86sun.png) no-repeat center center/cover",
    bg9: "url(images/bg/86WP.jpg) no-repeat center center/cover",
    bg10: "url(images/bg/carmeet.jpg) no-repeat center center/cover",
    bg11: "url(images/bg/og.jpg) no-repeat center center/cover",
    bg12: "url(images/bg/ogAngle.jpg) no-repeat center center/cover",
    bg13: "url(images/bg/86goat.jpg) no-repeat center center/cover",
    bg14: "url(images/bg/jdmBros.jpg) no-repeat center center/cover",
    bg15: "url(images/bg/lambo86.jpg) no-repeat center center/cover",
    bg16: "url(images/bg/nostalgia.jpg) no-repeat center center/cover",
    bg17: "url(images/bg/ogGang.jpg) no-repeat center center/cover",
    bg18: "url(images/bg/rx7&Nsx.jpg) no-repeat center center/cover"
}
let clicks = 0;
function changeBackground() {
    clicks++;
    switch (clicks) {
        case 1:
            $('.container').css("background", bgObj.bg1);
            break;
        case 2:
            $('.container').css("background", bgObj.bg2);
            break;
        case 3:
            $('.container').css("background", bgObj.bg3);
            break;
        case 4:
            $('.container').css("background", bgObj.bg4);
            break;
        case 5:
            $('.container').css("background", bgObj.bg5);
            break;
        case 6:
            $('.container').css("background", bgObj.bg6);
            break;
        case 7:
            $('.container').css("background", bgObj.bg7);
            break;
        case 8:
            $('.container').css("background", bgObj.bg8);
            break;
        case 9:
            $('.container').css("background", bgObj.bg9);
            break;
        case 10:
            $('.container').css("background", bgObj.bg10);
            break;
        case 11:
            $('.container').css("background", bgObj.bg11);
            break;
        case 12:
            $('.container').css("background", bgObj.bg12);
            break;
        case 13:
            $('.container').css("background", bgObj.bg13);
            break;
        case 14:
            $('.container').css("background", bgObj.bg14);
            break;
        case 15:
            $('.container').css("background", bgObj.bg15);
            break;
        case 16:
            $('.container').css("background", bgObj.bg16);
            break;
        case 17:
            $('.container').css("background", bgObj.bg17);
            break;
        case 18:
            $('.container').css("background", bgObj.bg18);
            break;
        default:
            clicks = 0;
            console.log("Here we go Again");
            break;
    }
}
function autoBG() {
    setInterval(() => {
        changeBackground();
    }, 4000);
}
// autoBG();
// $('#cringe').mouseleave(function () {

//     $('#cringe button').addClass('hide');
// });

