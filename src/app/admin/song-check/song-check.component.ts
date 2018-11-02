import { Component, OnInit } from '@angular/core';
import { AngularFireAction } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AdminService } from '../admin.service';
import { FormControl, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'cusc-song-check',
  templateUrl: './song-check.component.html',
  styleUrls: ['./song-check.component.css']
})
export class SongCheckComponent implements OnInit {
  checked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  urlInputs: {[key: string]: FormControl} = {};

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit() {
    this.checked$ = this.adminService.userList.pipe(
      map(users => {
        return users.filter(user => {
          return !!user.payload.val().selectedSong;
        });
      }),
      map(users => {
        return users.sort((userA, userB) => {
          return (
            userA.payload.val().slipTimestamp -
            userB.payload.val().slipTimestamp
          );
        });
      }),
      tap(users => {
        for (const user of users) {
          if (!this.urlInputs[user.key]) {
            this.urlInputs[user.key] = this.fb.control('', checkUrlFormat);
          }
        }
      })
    );
  }

  saveStatus(uid: string) {
    const control = this.urlInputs[uid];
    if (control.valid) {
      this.adminService.saveSongUrl(uid, control.value).subscribe();
      this.adminService.toggleSongStatus(uid).subscribe(_ => {
        control.reset();
      });
    }
  }

  deleteStatus(uid: string) {
    this.adminService.toggleSongStatus(uid).subscribe();
  }
}

const checkUrlFormat = (c: AbstractControl) => {
  if ((c.value as string).match(/^https:\/\/drive\.google\.com\/open\?id=.+$/)) {
    return null;
  } else {
    return {format: true};
  }
};
