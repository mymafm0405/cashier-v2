import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  currentUser: User;
  cuurentUserChangedSub: Subscription;
  path: string;
  showSelectSentence = true;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser();
    this.cuurentUserChangedSub = this.usersService.currentUserChanged.subscribe(
      () => {
        this.currentUser = this.usersService.getCurrentUser();
      }
    );

    this.route.url.subscribe((res) => {
      this.path = res[0].path;
    });

    // console.log(this.route.snapshot.firstChild.url[0].path);
  }

  checkPermission() {
    if (this.currentUser.userType === 'admin') {
      // This part of the code only check which url you're visit right now.
      if (
        this.route.snapshot.firstChild &&
        this.route.snapshot.firstChild.url
      ) {
        if (this.route.snapshot.firstChild.url[0].path !== '') {
          this.showSelectSentence = false;
        }
      }
      //
      return true;
    } else if (
      (this.currentUser.userType === 'user' && this.path === 'categories') ||
      this.path === 'reports'
    ) {
      // This part of the code only check which url you're visit right now.
      if (
        this.route.snapshot.firstChild &&
        this.route.snapshot.firstChild.url
      ) {
        if (this.route.snapshot.firstChild.url[0].path === 'new-sell') {
          this.showSelectSentence = false;
          return true;
          // } else if (this.route.snapshot.firstChild.url[0].path === 'all-bills') {
          //   this.showSelectSentence = false;
          //   return true;
        } else {
          this.showSelectSentence = false;
          return false;
        }
        //
      }
    } else {
      this.showSelectSentence = false;
      return false;
    }
  }

  ngOnDestroy() {
    this.cuurentUserChangedSub.unsubscribe();
  }
}
