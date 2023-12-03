import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApplicationService } from "./application.service";

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    stepId: number | undefined
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private applicationService: ApplicationService
    ) { }

    // getServiceProviderId(){
    //     return parseInt(String(localStorage.getItem('serviceProviderId')));
    // }

    // getPortCityUserToken(){
    //     return parseInt(String(localStorage.getItem('portcityUserToken')));
    // }

}