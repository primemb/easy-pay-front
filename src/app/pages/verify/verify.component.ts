import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify',
  standalone: true,
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
  imports: [CommonModule],
})
export class VerifyComponent implements OnInit {
  status: boolean;
  uniqueId: string;
  amount: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.status = params['status'] === 'true' ? true : false;
      this.uniqueId = params['uniqueId'];
      this.amount = Number(params['amount']);
    });
  }

  statusComputedClass() {
    return this.status
      ? 'bg-green-100 text-green-700'
      : 'bg-rose-100 text-rose-700';
  }

  statusComputedText() {
    return this.status ? 'تراکنش موفقیت آمیز بود' : 'تراکنش ناموفق بود';
  }

  back() {
    this.router.navigate(['/']);
  }
}
