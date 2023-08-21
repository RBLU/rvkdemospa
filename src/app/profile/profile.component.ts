import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me?$select=givenName,surname,companyName,mail,id';
const RVK_RAT_ENDPOINT = 'http://localhost:8080/Admin';

type ProfileType = {
  givenName?: string,
  surname?: string,
  mail?: string,
  id?: string,
  companyName?:string
};

type LerbType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

type GrpahBeType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  lerb!: LerbType;
  graphbe: GrpahBeType;

  constructor(
    private authService: MsalService, 
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    )
    .subscribe((result: EventMessage) => {
      console.log(result);
    });
    this.getProfile();
    this.getLerb();
    this.getGraphBe();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  getLerb() {
    this.http.get("http://localhost:8080/Admin")
      .subscribe(lerb => {
        this.lerb = lerb;
      })
  }

  getGraphBe() {
    this.http.get("http://localhost:8080/callgraph")
      .subscribe(graphbe => {
        this.graphbe = graphbe;
      })

  }
}
