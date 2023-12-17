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
    // Cancelar la suscripción a todas las suscripciones para evitar pérdidas de memoria
    this.destroy$.next();
    this.destroy$.complete();
  }


  public refreshUsersData(): void {
    this.subsGetUsersData();
  }

  private subsGetUsersData(): void {
    this.rtDbEuropeService
      .getPlatformsUsersData()
      .pipe(
        catchError((error) => {
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
