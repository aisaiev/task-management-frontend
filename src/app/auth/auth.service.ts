import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN } from '../app.constants';
import { AuthCredentialsDto } from './models/dto/auth-credentials.dto';
import { JwtToken } from './models/jwt-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + '/auth';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  signIn(authCredentialsDto: AuthCredentialsDto): Observable<void> {
    return this.httpClient.post<JwtToken>(`${this.url}/signin`, authCredentialsDto)
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  signUp(authCredentialsDto: AuthCredentialsDto): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/signup`, authCredentialsDto);
  }

  private authenticateSuccess(response: JwtToken): void {
    const { accessToken } = response;
    this.localStorageService.store(ACCESS_TOKEN, accessToken);
  }
}
