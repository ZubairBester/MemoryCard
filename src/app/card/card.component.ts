import { Component, OnInit, Input, Output, EventEmitter,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {
  heading: String = 'Card';
  down: Boolean = true;
  matched: Boolean = false;
  value: String;
  colour: String;
  suite: String;
  @Output() cardClick = new EventEmitter();
  @ViewChild('card') card: any;


  constructor() { 
    this.value = "a";
    this.colour = "b";
    this.suite = "s";
  }
  ngAfterViewInit(): void {
    //this.card.nativeElement.src = 'assets/cardImages/2c.png';
    
  }

  onClick(){
    if(!this.matched){
      
      this.cardClick.emit();
      if(!this.matched){
        this.flipCard();
      }
    }
  }

  

  flipCard(){//turn card over
    if(this.down){
      this.card.nativeElement.src = 'assets/cardImages/' + this.value + this.suite +'.png';
      this.down = false;
    }
    else{
      this.card.nativeElement.src = 'assets/cardImages/back.png';
      this.down = true;
    }
  }

  placeDown(){
    this.card.nativeElement.src = 'assets/cardImages/back.png';
    this.down = true;
    this.matched = false;
  }

  cardMatched(){
    this.card.nativeElement.src = 'assets/cardImages/matched.png';
    this.matched = true;
  }

  ngOnInit(): void {
    
  }

}
