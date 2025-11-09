import { NgModule } from "@angular/core";
import { ApplicationComponent } from "./application.component";
import { FeatureRoutingModule } from "./feature-routing.module";
import { SharedModule } from "./shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ApplicationComponent],
    imports: [FeatureRoutingModule, SharedModule, CommonModule]
})

export class FeatureModule { }