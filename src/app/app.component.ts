import { Component, type OnInit } from '@angular/core';
import { Router, type RouterOutlet } from '@angular/router';

import { MessagesService, CustomPreloadingStrategyService } from './core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public messagesService: MessagesService,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService
  ) {}

  ngOnInit(): void {
    console.log(
      `Preloading Modules: `,
      this.preloadingStrategy.preloadedModules
    );
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

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }
}
