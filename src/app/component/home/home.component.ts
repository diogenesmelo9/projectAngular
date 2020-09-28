import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  showFiller = true;
  imagePathLogo = 'assets/img/alelo-logo.png';
  private mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ){
    matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/search-solid.svg'));
    matIconRegistry.addSvgIcon('car', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/car-side-solid.svg'));
    matIconRegistry.addSvgIcon('border', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/border-all-solid.svg'));
    matIconRegistry.addSvgIcon('chart', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/chart-bar-solid.svg'));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
  }

  goToVehicle(): void {
    this.router.navigate(['']);
  }

}
