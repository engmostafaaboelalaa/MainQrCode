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
  currentId: string | null = null;

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('current_user_id');
    this.askForClientId();
  }

  async askForClientId() {
    const {
      value: clientId,
      isConfirmed,
      isDismissed,
    } = await Swal.fire({
      title: 'يرجى إدخال الرقم التعريفي',
      input: 'text',
      inputPlaceholder: 'الرقم التعريفي',
      showCancelButton: true,
      confirmButtonText: 'متابعة',
      cancelButtonText: 'إلغاء',
      inputValidator: (value) => {
        if (!value) {
          return 'يجب إدخال رقم الكود!';
        }
        if (!/^[0-9]+$/.test(value)) {
          return 'رقم الكود يجب أن يكون أرقام فقط!';
        }
        return null;
      },
    });

    if (isConfirmed && clientId) {
      this._AuthService.login();
      this.router.navigate(['user', this.currentId, 'edit']);
    } else if (isDismissed) {
      // لو عمل إلغاء → يرجع على الهوم
      this.router.navigate(['user', this.currentId]);
    }
  }
}
