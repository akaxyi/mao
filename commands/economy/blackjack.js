const { MessageEmbed } = require('discord.js');
const { attentionembed } = require('../../utils/embed');
const x = '<a:No:830530976631095326>'

module.exports.execute = async (client, message, args) => {

    const userData = await client.fetchUser(message.author.id);
    let betAmount = 0;

    if (args[0] === 'all' || args[0] === 'max') {
        betAmount = userData.coinsInWallet;
    } else {
        betAmount = parseInt(args[0]);
    }

    if (!betAmount || betAmount < 1 || betAmount > userData) {

        return attentionembed(message, `That isn't a valid amount!`).catch();
        //return message.channel.send('That\'s not a number.');
        return
    }

    if (!userData) {
        return attentionembed(message, `Sad times, you don't have an account!`)
    }
    if (betAmount > userData.coinsInWallet) {

        return attentionembed(message, `Sad times, you don't have that much coins!`)
    }
    if (betAmount < 100) {

        return attentionembed(message, `Sorry, you have to bet at least **100** <:maocoin:819634260352303154>!`)
    }

    // ** BEGIN Javascript blackjack game from echohatch1. Modified for Grape.

    var numCardsPulled = 0;
    var gameOver = false;

    var player = {
        cards: [],
        score: 0
    };
    var dealer = {
        cards: [],
        score: 0
    };

    function getCardsValue(a) {
        var cardArray = [],
            sum = 0,
            i = 0,
            dk = 10.5,
            doubleking = "QQ",
            aceCount = 0;
        cardArray = a;
        for (i; i < cardArray.length; i += 1) {
            if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
                sum += 10;
            } else if (cardArray[i].rank === "A") {
                sum += 11;
                aceCount += 1;
            } else if (cardArray[i].rank === doubleking) {
                sum += dk
            } else {
                sum += cardArray[i].rank;
            }
        }
        while (aceCount > 0 && sum > 21) {
            sum -= 10;
            aceCount -= 1;
        }
        return sum;
    }

    var deck = {
        deckArray: [],
        initialize: function () {
            var suitArray, rankArray, s, r, n;
            suitArray = ["clubs", "diamonds", "hearts", "spades"];
            rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
            n = 13;
            for (s = 0; s < suitArray.length; s += 1) {
                for (r = 0; r < rankArray.length; r += 1) {
                    this.deckArray[s * n + r] = {
                        rank: rankArray[r],
                        suit: suitArray[s]
                    };
                }
            }
        },
        shuffle: function () {
            var temp, i, rnd;
            for (i = 0; i < this.deckArray.length; i += 1) {
                rnd = Math.floor(Math.random() * this.deckArray.length);
                temp = this.deckArray[i];
                this.deckArray[i] = this.deckArray[rnd];
                this.deckArray[rnd] = temp;
            }
        }
    };

    deck.initialize();
    deck.shuffle();

    async function bet(outcome) {
        if (outcome === "win") {
            const wonCoins = parseInt(betAmount + (betAmount * 0.15));
            userData.coinsInWallet += parseInt(wonCoins);
            await userData.save();
        }
        if (outcome === "lose") {
            userData.coinsInWallet -= parseInt(betAmount);
            await userData.save();
        }
    }

    function endMsg(title, msg, dealerC) {
        let cardsMsg = "";
        player.cards.forEach(function (card) {
            cardsMsg += "[`" + card.rank.toString();
            if (card.suit == "hearts") cardsMsg += "♥"
            if (card.suit == "diamonds") cardsMsg += "♦"
            if (card.suit == "spades") cardsMsg += "♠"
            if (card.suit == "clubs") cardsMsg += "♣"
            cardsMsg += "`](https://www.google.com/) "
        });
        cardsMsg += "\n**Total** : " + player.score.toString()

        let dealerMsg = "";
        if (!dealerC) {
            dealerMsg = "[`" + dealer.cards[0].rank.toString();
            if (dealer.cards[0].suit == "hearts") dealerMsg += "♥"
            if (dealer.cards[0].suit == "diamonds") dealerMsg += "♦"
            if (dealer.cards[0].suit == "spades") dealerMsg += "♠"
            if (dealer.cards[0].suit == "clubs") dealerMsg += "♣"
            dealerMsg += " ? ?`](https://www.google.com/)"
        } else {
            dealerMsg = "";
            dealer.cards.forEach(function (card) {
                dealerMsg += "[`" + card.rank.toString();
                if (card.suit == "hearts") dealerMsg += "♥"
                if (card.suit == "diamonds") dealerMsg += "♦"
                if (card.suit == "spades") dealerMsg += "♠"
                if (card.suit == "clubs") dealerMsg += "♣"
                dealerMsg += "`](https://www.google.com/) "
            });
            dealerMsg += "\n**Total** : " + dealer.score.toString()
        }

        const gambleEmbed = new MessageEmbed()
            .setColor('#FFDF32')
            .setTitle(message.author.username + `'s Blackjack Game`,)
            .addField(`${message.author.username} Cards`, cardsMsg, true)
            .addField('Mao\'s Cards', dealerMsg, true)
            .addField(title, msg)
            .setThumbnail(`https://imgur.com/w9TlO7x.png`);

        message.channel.send(gambleEmbed);
    }

    async function endGame() {
        const wonCoin = parseInt(betAmount + (betAmount * 0.15));
        if (player.score === 21) {
            bet('win');
            gameOver = true;
            await endMsg("You won!", `You got 21 on the dot!\nYou won **${wonCoin}** <:maocoin:819634260352303154>!`, true)
        }
        if (player.score > 21) {
            bet('lose');
            gameOver = true;
            await endMsg("You lost!", `You went over 21 \`bust\`!`, true)
        }
        if (dealer.score === 21) {
            bet('lose');
            gameOver = true;
            await endMsg("You lost!", "Mao got 21 on the dot!", true)
        }
        if (dealer.score > 21) {
            bet('win');
            gameOver = true;
            await endMsg("You won!", `Mao went over 21 \`bust\`\nYou won **${wonCoin}** <:maocoin:819634260352303154>!`, true)
        }
        if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
            bet('win');
            gameOver = true;
            await endMsg("You won!", `Mao stopped on 17 and didn't get higher than you!\nYou won **${wonCoin}** <:maocoin:819634260352303154>!`, true)
        }
        if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
            bet('lose');
            gameOver = true;
            await endMsg("You lost", "Mao has won!", true)
        }
        if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
            gameOver = true;
            await endMsg("You both drew", "You and Mao have the same total!", true)
        }
    }

    function dealerDraw() {

        dealer.cards.push(deck.deckArray[numCardsPulled]);
        dealer.score = getCardsValue(dealer.cards);
        numCardsPulled += 1;
    }

    function newGame() {
        hit();
        hit();
        dealerDraw();
        endGame();
    }

    function hit() {
        player.cards.push(deck.deckArray[numCardsPulled]);  // END Javascript blackjack game from echohatch1. Modified by Brandon-The-Dev for Hydra+
        player.score = getCardsValue(player.cards);

        numCardsPulled += 1;
        if (numCardsPulled > 2) {
            endGame();
        }
    }

    function stand() {
        while (dealer.score < 17) {
            dealerDraw();
        }
        endGame();
    }


    newGame();
    async function loop() {
        if (gameOver) return;

        endMsg("How to play:", " What do you want to do? Type [\`h\`](https://www.google.com/) to hit, type [\`s\`](https://www.google.com/) to stand, or type [\`cancel\`](https://www.google.com/) to end the game!", false)
        let filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 25000,
            errors: ['time']
        }).then(message => {
            message = message.first()
            if (message.content === "h" || message.content.includes("H") || message.content.includes("Hit") || message.content.includes("hit")) { // if (colour == "b" || colour.includes("black")) colour = 0;
                hit();
                loop();
                return
            } else if (message.content === "s" || message.content.includes("S") || message.content.includes("Stand") || message.content.includes("stand")) {
                stand();
                loop();
                return
            } else {
                //message.channel.send("you bafoon. I am taking all of your money");
                return attentionembed(message, `You canceled the game!`)
                bet("lose");
            }
        }).catch(_ => {
            return attentionembed(message, `You canceled the game, you took to long to pick!`).catch();
        })
    }

    await loop()
}
module.exports.help = {
    name: 'blackjack',
    aliases: ["bj"],
    category: 'Economy',
    usage: '<amount>',
    description: 'You start a card game of blackjack!'
}
