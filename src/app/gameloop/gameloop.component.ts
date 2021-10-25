import { PlayersComponent } from './../players/players.component';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ThisReceiver } from '@angular/compiler';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameloop',
  templateUrl: './gameloop.component.html',
  styleUrls: ['./gameloop.component.css']
})
export class GameloopComponent implements OnInit {
  @ViewChildren(CardComponent) cards: QueryList<CardComponent> | any;
  @ViewChildren(PlayersComponent) players: QueryList<PlayersComponent> | any;
  @ViewChild('inputNames') inputNames: any;
  @ViewChild('player1') player1: any;
  @ViewChild('player2') player2: any;
  @ViewChild('matchImg') matchImg: any;
  @ViewChild('gameOver') gameOver: any;
  @ViewChild('astro1') astro1: any;
  @ViewChild('astro2') astro2: any;
  
  deck: CardComponent[] = [];
  cardsSelected : number = 0;
  choiceOne : number = 0;
  choiceTwo : number = 0;
  matches : number = 0;
  

  ngAfterViewInit(): void {
    this.initializeDeck()
    this.players._results[0].turn.nativeElement.innerHTML = "Its Your Turn &nbsp;";
  }

  ngOnInit(): void {
  }  

  toggleAvatars(){ //show and hide astronauts to give more space on smaller screens
    if(this.astro1.nativeElement.style.display == ""){
      this.astro1.nativeElement.style.display = "none"; 
    }
    else{
      this.astro1.nativeElement.style.display = "";
    }

    if(this.astro2.nativeElement.style.display == ""){
      this.astro2.nativeElement.style.display = "none"; 
    }
    else{
      this.astro2.nativeElement.style.display = "";
    }

  }

  hideGame(){ //hide gameover banner
    this.gameOver.nativeElement.style.display = 'none';
  }

  hideMatch(){//hide card match banner
    this.matchImg.nativeElement.style.display = 'none';
  }

  closeModal(){//close popupmodal
    this.inputNames.nativeElement.style.display = 'none';
  }

  newgame(){ //when newgame starts ask for player names
    this.inputNames.nativeElement.style.display = 'flex';
    
  }

  restartgame(){ //restart game reset all values and set player 1 to start
    this.players._results[0].turn.nativeElement.innerHTML = "Its Your Turn &nbsp;";
    this.players._results[1].turn.nativeElement.innerHTML = "&nbsp;";
    this.inputNames.nativeElement.style.display = 'none';
    this.players._results[0].PlayerName = this.player1.nativeElement.value;
    this.players._results[1].PlayerName = this.player2.nativeElement.value;
    this.matches = 0;
    this.shuffle();
    this.players._results[0].Score = 0;
    this.players._results[1].Score = 0;
    this.players._results[0].myTurn = true;
    this.players._results[1].myTurn = false;
  }

  cardClick(cardNum : number){ //card click
    if(this.cardsSelected == 0){
      this.inGameAllCardsDown(); //flip non-matched cards
    }
    this.cardsSelected++;

    if(this.cardsSelected == 2){  //once two selected check match and swap turns
      this.choiceTwo = cardNum;
      this.checkMatch()
      this.swapTurns();
      this.cardsSelected = 0; 
    }
    else{
      this.choiceOne = cardNum;
    }
  }

  checkMatch(){ //check values and colour match as well 
    if((this.cards._results[this.choiceOne].value == this.cards._results[this.choiceTwo].value) && (this.choiceOne!=this.choiceTwo)){
      if(this.cards._results[this.choiceOne].colour == this.cards._results[this.choiceTwo].colour){
        this.matchImg.nativeElement.style.display = 'flex';
        this.cards._results[this.choiceOne].cardMatched();
        this.cards._results[this.choiceTwo].cardMatched();
        this.matches++;
        if(this.players._results[1].myTurn == true){
          this.players._results[1].Score++; //if match score goes up
        }
        else{
          this.players._results[0].Score++;
        }
      }
    }
    this.checkGameOver(); 
  }

  checkGameOver(){//game over once all matches made
    if(this.matches == 27){
      console.log(this.matches);
      this.gameOver.nativeElement.style.display = 'flex';
    }
  }

  swapTurns(){//turn indicator changes
    console.log();
    if(this.players._results[1].myTurn == true){
      this.players._results[0].turn.nativeElement.innerHTML = "Its Your Turn &nbsp;";
      this.players._results[1].turn.nativeElement.innerHTML = "&nbsp;";
      this.players._results[0].myTurn = true;
      this.players._results[1].myTurn = false;
    }
    else{
      this.players._results[1].turn.nativeElement.innerHTML = "Its Your Turn &nbsp;";
      this.players._results[0].turn.nativeElement.innerHTML = "&nbsp;";
      this.players._results[0].myTurn = false;
      this.players._results[1].myTurn = true;
    }

  }


  

  initializeDeck(){//set all card values 
    let suite = 0;
    let val = 1;
    for (let i = 0; i < 52; i++) {
      this.deck.push(this.cards._results[i]);
      if(val!=1){
        if(11>val){
          this.deck[i].value = val.toString();
        }
        else{
          switch (val) {
            case 11:
              this.deck[i].value = 'j';
                break;
            case 12:
              this.deck[i].value = 'q';
                break;
            case 13:
              this.deck[i].value = 'k';
                break;
          }
        }
      }
      switch (suite) {
        case 0:
          this.deck[i].suite = 's';
          this.deck[i].colour = 'b';
          break;
        case 1:
          this.deck[i].suite = 'd';
          this.deck[i].colour = 'r';
          break;
        case 2:
          this.deck[i].suite = 'c';
          this.deck[i].colour = 'b';
          break;
        case 3:
          this.deck[i].suite = 'h';
          this.deck[i].colour = 'r';
          break;
      }
      val++;
      if(val == 14){
        val = 1;
        suite++;
      }
    }

    this.deck.push(this.cards._results[52]);
    this.deck.push(this.cards._results[53]);

    this.deck[52].value = 'e';
    this.deck[52].suite = 's';
    this.deck[52].colour = 'b';
    

    this.deck[53].value = 'e';
    this.deck[53].suite = 'h';
    this.deck[53].colour = 'b';

    this.shuffle();
    console.log(this.cards._results);

  }


  shuffle() {//shuffle the deck
    this.allCardsDown();
    let currentIndex = this.deck.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [this.deck[currentIndex], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[currentIndex]];
      [this.deck[currentIndex].value, this.deck[randomIndex].value] = [this.deck[randomIndex].value, this.deck[currentIndex].value];
      [this.deck[currentIndex].colour, this.deck[randomIndex].colour] = [this.deck[randomIndex].colour, this.deck[currentIndex].colour];
      [this.deck[currentIndex].suite, this.deck[randomIndex].suite] = [this.deck[randomIndex].suite, this.deck[currentIndex].suite];
    }
  }
  constructor() { }

  allCardsDown(){//turn all cards down
    for(let i = 0; i < 54; i++){
      this.cards._results[i].placeDown();
    }
  }

  inGameAllCardsDown(){//turn all non-matched cards down
    for(let i = 0; i < 54; i++){
      if(!this.cards._results[i].matched){
        this.cards._results[i].placeDown();
      }
    }
  }
  

}
