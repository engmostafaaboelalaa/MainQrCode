import { Component, OnInit } from '@angular/core';
import { PhoneInputComponent } from '../../phone-input/phone-input.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ClientData } from '../../shared/models/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ClientService } from '../../shared/services/client.service';
import Swal from 'sweetalert2';
import { BaseComponent } from '../../shared/global/base/base.component';
import { environment } from '../../environment/environment';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-change-data',
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './change-data.component.html',
  styleUrl: './change-data.component.css',
})
export class ChangeDataComponent extends BaseComponent implements OnInit {
  clientForm: FormGroup;
  baseUrl: string = environment.base;
  clientImage!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _AuthService: AuthService,
    private _ClientService: ClientService
  ) {
    super();
    this.clientForm = this.fb.group({
      Id: [{ value: null, disabled: true }],
      Image: [''],
      Mobile1: [''],
      Mobile2: [''],
      WhatsApp: [''],
      FaceBook: [''],
      Instagram: [''],
      TikTok: [''],
      Email: [''],
      Password: [''],
      ConfirmPassword: [''],
    });
  }
  currentId: string | null = null;
  mode: 'create' | 'edit' = 'create';
  button_loading: boolean = false;
  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('current_user_id');
    console.log('Current Id: ', this.currentId);
    if (this.currentId) {
      this.mode = 'edit';
      this.loadClientData(this.currentId);
    } else {
      this.mode = 'create';
    }
  }
  loadClientData(id: any) {
    this._ClientService
      .GetClientsData(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.clientImage = res.image;
            this.clientForm.patchValue({
              Id: this.currentId,
              Image: res.image || '',
              Mobile1: res.mobile1 || '',
              Mobile2: res.mobile2 || '',
              WhatsApp: res.whatsApp || '',
              FaceBook: res.faceBook || '',
              Instagram: res.instagram || '',
              TikTok: res.tikTok || '',
              Email: res.email || '',
            });
            const passwordControl = this.clientForm.get('Password');
            const confirmPasswordControl =
              this.clientForm.get('ConfirmPassword');
            passwordControl?.disable();
            confirmPasswordControl?.disable();
          }
        },
        error: (err) => {
          console.error('❌ Error fetching client data', err);
          // ممكن تعرض SweetAlert2 هنا لو تحب
        },
      });
  }
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.clientForm.get('Image')?.patchValue(this.selectedFile);

      // اعمل blob URL علشان يظهر فورا
      this.clientImage = URL.createObjectURL(this.selectedFile);
    }
  }

  onSubmit() {
    this.button_loading = true;
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.button_loading = false;
      return;
    }

    const formData: ClientData = this.clientForm.value as ClientData;
    console.log(formData);

    this._ClientService
      .AddOrEditClientData(formData, this.currentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.button_loading = false;

          Swal.fire({
            icon: 'success',
            title: '✅ تم الحفظ بنجاح',
            text: 'تم تسجيل بنجاح',
            confirmButtonText: 'تمام',
          }).then((result) => {
            if (result.isConfirmed) {
              this._AuthService.logout();
              this.router.navigate(['profile', this.currentId]);
            }
          });
        },
        error: (err) => {
          this.button_loading = false;

          Swal.fire({
            icon: 'error',
            title: '❌ خطأ',
            text: 'حصل خطأ أثناء حفظ البيانات، حاول مرة أخرى',
            confirmButtonText: 'تمام',
          });
        },
      });
  }

  ActiveChangePassword: boolean = false;
  onShowChangePassword() {
    this.ActiveChangePassword = !this.ActiveChangePassword;

    const passwordControl = this.clientForm.get('Password');
    const confirmPasswordControl = this.clientForm.get('ConfirmPassword');

    if (this.ActiveChangePassword) {
      passwordControl?.enable();
      confirmPasswordControl?.enable();
    } else {
      passwordControl?.disable();
      confirmPasswordControl?.disable();
    }
  }
}
