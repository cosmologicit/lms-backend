import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../api-models/auth-model';


/*
Class: AppState
Purpose: Holds application state
Notes: Keep this class small, components that need access will subscribe to observables from AppState Service
*/
export class AppState {
    public isLoggedIn$: BehaviorSubject<boolean>;
    public isProcessing$: BehaviorSubject<boolean>;
    public currentUser$: BehaviorSubject<AuthResponse>;


    constructor() {
        this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
        this.isProcessing$ = new BehaviorSubject<boolean>(false);

        const user: AuthResponse = {
            name:'',
            phone: '',
            email: '',
            address: '',
            token: '',
            instituteId: undefined,
        };
        this.currentUser$ = new BehaviorSubject<AuthResponse>(user);
        // const company: getCompanyDetails = {};
        // this.currentCompany$ = new BehaviorSubject<getCompanyDetails>(company);

        // const permissions = {
        //     userId: 0,
        //     permissions: {
        //         'dashboard': {}, 'company': {}, 'item': {}, 'service': {}, 'item group': {}, 'warehouse': {},
        //         'party': {}, 'bank': {}, 'sale order': {}, 'sale invoice': {}, 'tax invoice': {}, 'pos invoice': {},
        //         'service invoice': {}, 'credit note': {}, 'purchase order': {}, 'purchase bills': {}, 'debit note': {}, 'payment in': {},
        //         'payment out': {}, 'journal': {}, 'expense category': {}, 'expense item': {}, 'report': {}, 'company settings': {},
        //     }
        // };
        // this.currentUserPermission$ = new BehaviorSubject<UserPermissions>(permissions);
    }
}
