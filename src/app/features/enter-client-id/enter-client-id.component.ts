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
    // this.productId = this.route.snapshot.paramMap.get('product_id');
    this.askForClientId();
  }

  async askForClientId() {
    const { value: password } = await Swal.fire({
      title: 'يرجى إدخال كلمة السر',
      input: 'password',
      inputPlaceholder: 'كلمة السر',
      showCancelButton: true,
      confirmButtonText: 'متابعة',
      cancelButtonText: 'إلغاء',
      inputValidator: (value) => {
        console.log(value)
        if (!value) {
          return 'يجب إدخال كلمة السر!';
        }
        return null;
      },
      preConfirm: (password) => {
        return this._AuthService
          .signin(this.currentUserId, password)
          .toPromise()
          .then((res: any) => {
            if ((res = true)) {
              console.log('sadasd');
              this._AuthService.login();
              this.router.navigate(['profile', this.currentUserId, 'edit']);
            }
          })
          .catch((err) => {
            Swal.showValidationMessage(err.error);
          });
      },
    });

    if (password) {
      this.router.navigate(['profile', this.currentUserId, 'edit']);
    } else {
      this.router.navigate(['profile', this.currentUserId]);
    }
  }
}
