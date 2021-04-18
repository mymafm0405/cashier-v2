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
      console.log(res);
      console.log(this.path);
    });

    // console.log(this.route.snapshot.firstChild.url[0].path);
  }

  checkPermission() {
    if (this.currentUser.userType === 'admin') {
      return true;
    } else if (
      this.currentUser.userType === 'user' &&
      this.path === 'categories'
    ) {
      if (
        this.route.snapshot.firstChild &&
        this.route.snapshot.firstChild.url
      ) {
        console.log(this.route.snapshot.firstChild);
        if (this.route.snapshot.firstChild.url[0].path === 'new-sell') {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.cuurentUserChangedSub.unsubscribe();
  }
}
