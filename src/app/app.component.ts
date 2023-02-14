import { Component, type OnInit, type OnDestroy } from '@angular/core';
import { Router, NavigationStart, type RouterOutlet, type Event } from '@angular/router';
import { filter, type Subscription } from 'rxjs';

import { MessagesService, CustomPreloadingStrategyService } from './core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: { [key: string]: Subscription } = {};

  constructor(
    public messagesService: MessagesService,
    private router: Router,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService
  ) {}

  ngOnInit(): void {
    console.log(
      `Preloading Modules: `,
      this.preloadingStrategy.preloadedModules
    );
    this.setMessageServiceOnRefresh();
  }

  ngOnDestroy(): void {
    this.sub['navigationStart'].unsubscribe();
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }

  onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activated Component', $event, routerOutlet);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Deactivated Component', $event, routerOutlet);
  }

  onRouterLinkActive($event: boolean): void {
    console.log($event);
  }

  private setMessageServiceOnRefresh(): void {
    this.sub['navigationStart'] = this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationStart))
      .subscribe((event: Event) => {
        this.messagesService.isDisplayed = (event as NavigationStart).url.includes('messages:');
      });
  }
}
