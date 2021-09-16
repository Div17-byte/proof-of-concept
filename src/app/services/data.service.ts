import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentUser: any;
  isLoggedIn = false;
  userId = '';
  base = 'https://proof-of-requirement.herokuapp.com/rio';
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  authListener = new Subject<boolean>();
  updateProfile = new Subject();
  notificaiton = new Subject();
  editProfileData = new BehaviorSubject<object>({});
  ownProfile: any = {};

  // ping a

  pingServer():void {
    this.http.get(`${this.base}/ping`).subscribe(res=> {
      console.log('Server pinged');
    })
  }
  // Get country
  apiGetCountry(): Observable<any> {
    return this.http.get(`${this.base}/master/countries`);
  }
  // Get logged in user Info

  apiGetUser(): Observable<any> {
    return this.http.get(`${this.base}/user`);
  }
  apiGetUserById(id:string): Observable<any> {
    return this.http.get(`${this.base}/user/${id}`);
  }

  // Follow other users

  apiFollowUser(id:string):Observable<any> {
    return this.http.put(`${this.base}/user/${id}/follow-toggle`,null)
  }
  
  apiGetNotifications(): Observable<any> {
    return this.http.get(`${this.base}/notification`);
  }
  apiMarkNotificationRead(): Observable<any> {
    return this.http.put(`${this.base}/notification`, null);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
  apiSignup(obj: any): Observable<any> {
    return this.http.post(`${this.base}/sign-up`, obj);
  }
  apiLogin(obj: any): Observable<any> {
    return this.http.post(`${this.base}/login`, obj, { observe: 'response' });
  }
  apiPostOtp(obj: any): Observable<any> {
    return this.http.post(`${this.base}/send-otp`, obj);
  }
  apiPutOtp(obj: any): Observable<any> {
    return this.http.put(`${this.base}/validate-otp`, obj);
  }

  // user

  apiChangeProfileImage(): Observable<any> {
    return this.http.put(`${this.base}/profile-image`, null);
  }

  // POC's Api

  // Like POC

  apiLikePoc(contextId: string): Observable<any> {
    return this.http.put(`${this.base}/like/toggle`, {
      contextType: 'POC',
      contextId,
    });
  }
  // get liked numbers by USEr

  apiUserLikedPoc(contextId: string): Observable<any> {
    return this.http.get(`${this.base}/${contextId}/likes`);
  }

  apiPostPoc(obj: any): Observable<any> {
    return this.http.post(`${this.base}/proof-of-concept`, obj);
  }
  /// User update own profile

  apiPutUser(obj: any): Observable<any> {
    return this.http.put(`${this.base}/user`, obj);
  }

  // Get all Poc's
  apiGetPoc(): Observable<any> {
    return this.http.get(`${this.base}/proof-of-concept/all`);
  }
  apiGetSavedPoc(): Observable<any> {
    return this.http.get(`${this.base}/proof-of-concept/saved`);
  }
  apiGetOwnPoc(): Observable<any> {
    return this.http.get(`${this.base}/proof-of-concept`);
  }
  apiGetPocById(id: string): Observable<any> {
    return this.http.get(`${this.base}/proof-of-concept/${id}`);
  }

  // Update POC
  apiUpdatePoc(id: string, obj: any): Observable<any> {
    return this.http.put(`${this.base}/proof-of-concept/${id}`, obj);
  }
  // Search Poc

  apiSearch(input: string): Observable<any> {
    return this.http.get(`${this.base}/search/${input}`);
  }

  // Report POC

  // Comments

  apiPostComment(obj: object): Observable<any> {
    return this.http.post(`${this.base}/comment`, obj);
  }

  apiGetCommentsById(contextId: string): Observable<any> {
    return this.http.get(`${this.base}/${contextId}/comment`);
  }

  // Save POC

  apiSavePoc(id: string): Observable<any> {
    return this.http.put(
      `${this.base}/proof-of-concept/${id}/saved/toggle`,
      null
    );
  }

  // Report POC

  apiReportPoc(obj: any): Observable<any> {
    return this.http.post(`${this.base}/report`, obj);
  }



  // REquest POC

  apiRequestPoc(obj:any):Observable<any> {
    return this.http.post(`${this.base}/request`,obj)
  }
}
