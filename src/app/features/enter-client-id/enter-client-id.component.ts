import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enter-client-id',
  imports: [],
  templateUrl: './enter-client-id.component.html',
  styleUrl: './enter-client-id.component.css',
})
export class EnterClientIdComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  uniqueId: string | null = null;

  ngOnInit(): void {
    this.uniqueId = this.route.snapshot.paramMap.get('id');
    console.log(this.uniqueId);

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
      // لو المستخدم أكد وأدخل رقم صحيح → يروح على صفحة التعديل
      this.router.navigate(['/user-form', clientId]);
    } else if (isDismissed) {
      // لو عمل إلغاء → يرجع على الهوم
      this.router.navigate(['user', this.uniqueId]);
    }
  }
}
