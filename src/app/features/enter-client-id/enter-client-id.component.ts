import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-enter-client-id',
  imports: [],
  templateUrl: './enter-client-id.component.html',
  styleUrl: './enter-client-id.component.css',
})
export class EnterClientIdComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _AuthService: AuthService
  ) {}
  currentUserId: string | null = null;
  productId!: string | null;

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.paramMap.get('current_user_id');
    this.productId =  this.route.snapshot.paramMap.get('product_id');
    this.askForClientId();
  }

  async askForClientId() {
    const {
      value: password,
      isConfirmed,
      isDismissed,
    } = await Swal.fire({
      title: 'يرجى إدخال كلمة السر',
      input: 'text',
      inputPlaceholder: ' كلمة السر',
      showCancelButton: true,
      confirmButtonText: 'متابعة',
      cancelButtonText: 'إلغاء',
      inputValidator: (value) => {
        if (!value) {
          return 'يجب إدخال كلمة السر!';
        }
        return null;
      },
    });

    if (isConfirmed && password) {
      this.router.navigate(['user', this.currentUserId, 'user-form', this.productId  ]);
    } else if (isDismissed) {
      // لو عمل إلغاء → يرجع على الهوم
      this.router.navigate(['user', this.currentUserId]);
    }
  }
}
