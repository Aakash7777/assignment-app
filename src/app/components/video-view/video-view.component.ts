import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {
  @Input() video;

  videoToPlay: any;
  playerVars = {
    cc_lang_pref: 'en'
  };
  version = '...';
  player;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log('vide:', this.video)
  }

  savePlayer(player) {
    this.player = player;
  }

}
