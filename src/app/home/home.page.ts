import { Component, OnInit } from '@angular/core';
import { SongService } from './../shared/song.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  Songs: any = [];
  content: any = [];
  constructor( private songService: SongService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
  ionViewDidEnter() {
    this.songService.getSongList().subscribe((res) => {
      console.log(res)
      this.Songs = res;
    })
  }

  deleteSong(song, i) {
    if (window.confirm('Do you want to delete user?')) {
      this.songService.deleteSong(song._id)
        .subscribe(() => {
          this.Songs.splice(i, 1);
          console.log('Song deleted!')
        }
        )
    }
  }

}
