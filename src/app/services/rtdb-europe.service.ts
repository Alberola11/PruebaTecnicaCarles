import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../models/user-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RtdbEuropeService {
  private readonly URL_DOMAIN = environment.API_DOMAIN_URL;
  private readonly ENDPOINTS = {
    users: 'users.json',
  };

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtener todas las plataformas de la base de datos.
   * @returns observables con los datos del usuario de la plataforma
   */
  public getPlatformsUsersData(): Observable<UserData[]> {
    return this.http.get<UserData[]>(
      `https://${this.URL_DOMAIN}/${this.ENDPOINTS.users}`,
      {
        params: {
          key: environment.API_KEY,
        },
      }
    );
  }
}
