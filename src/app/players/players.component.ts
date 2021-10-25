import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  PlayerName: String = 'Player';
  Score: Number = 0;
  myTurn: boolean = false;
  @ViewChild('turn') turn: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
  }

}
