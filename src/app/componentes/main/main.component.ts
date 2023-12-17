import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, catchError, takeUntil, tap } from 'rxjs';

import { RtdbEuropeService as RtDbEuropeService } from '../../services/rtdb-europe.service';
import { UserData } from '../../models/user-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public users: UserData[] = [];
  public isLoadingUserData: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly rtDbEuropeService: RtDbEuropeService) {}

  ngOnInit(): void {
    this.subsGetUsersData();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to avoid memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TODO: add button to refresh users data
  public refreshUsersData(): void {
    this.subsGetUsersData();
  }

  private subsGetUsersData(): void {
    this.rtDbEuropeService
      .getPlatformsUsersData()
      .pipe(
        catchError((error) => {
          // TODO: Show toast or modal to inform the user about the error
          console.error(error);
          return [];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.isLoadingUserData = false;
        this.users = data;
      });
  }
}
