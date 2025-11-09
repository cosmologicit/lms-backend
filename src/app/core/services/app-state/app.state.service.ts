import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { BroadcasterService } from '../broadcaster/broadcaster.service';
import { AppState } from '../../models/app-state';
import { AppEvents } from '../../models/appenums';
import { AppEvent } from '../../models/appevents';

// Our Modules

/* ****************** App State service. *****************
Used to store app state as observables
components subscribe to data as needed and values are delivered by this service injection
 ********************************************************/
@Injectable({
    providedIn: 'root'
})

export class AppStateService {

    private _appState$: BehaviorSubject<AppState>;

    constructor(private broadcaster: BroadcasterService, private authService: AuthenticationService) {
        const self = this;
        this._appState$ = new BehaviorSubject<AppState>(new AppState());
        // subscribe to some events of the application
        this.broadcaster.receive<any>('AppEvent').subscribe({
            next(response) {
                self.onEventTriggered(response);
            },
            error(err) {
                self.onAppError(err);
            },
            complete() { }
        });
    }

    // recieve events
    onEventTriggered($event: any) {
        switch ($event.id) {
            case AppEvents.LoggedIn: {
                this._appState$.value.isLoggedIn$.next($event.data);
                break;
            }
            case AppEvents.Processing: {
                this._appState$.value.isProcessing$.next($event.data);
                break;
            }
            case AppEvents.SetUser: {
                this._appState$.value.currentUser$.next($event.data);
                break;
            }
                
            default:
                break;
        }
    }

    onAppError(appError: any) {
        alert(appError);
    }

    public sendEvent(eventId: number, payLoad: any) {
        const eventData = new AppEvent(
            eventId,
            `App Event Created: Id ${eventId}`,
            payLoad
        );
        this.broadcaster.broadcast('AppEvent', eventData);
    }

    // Observable accessors
    public isLoggedIn() {
        return this._appState$.value.isLoggedIn$;
    }

    public currentUser() {
        return this._appState$.value.currentUser$;
    }

     public isProcessing() {
        return this._appState$.value.isProcessing$;
    }
}
