import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  postLoginUrl:UrlSegment[];

  setPostLoginUrl(postLoginUrl:UrlSegment[]){
    this.postLoginUrl=postLoginUrl;
  }

  getPostLoginUrl():UrlSegment[] {
    return this.postLoginUrl;
  }
}
