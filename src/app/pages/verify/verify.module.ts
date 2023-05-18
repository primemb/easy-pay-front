import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VerifyComponent }]),
  ],
})
export class VerifyModule {}
