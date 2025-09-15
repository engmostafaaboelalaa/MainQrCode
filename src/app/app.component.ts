import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseComponent } from './shared/global/base/base.component';
import { ClientService } from './shared/services/client.service';
import { takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { Client } from './shared/models/client.model';
import { ChangeDataComponent } from './change-data/change-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChangeDataComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(private _ClientService: ClientService) {
    super();
  }
  profile: Client = {
    id: 1,
    image: null, // public profile photo
    mobile1: '1234567890',
    mobile2: '0987654321',
    whatsApp: '1234567890',
    faceBook: 'https://www.facebook.com/ElonMusk',
    instagram: 'https://www.instagram.com/elonmusk',
    tikTok: 'https://www.tiktok.com/@elonmusk',
    email: 'elon.musk@tesla.com',
  };

  ngOnInit(): void {
    this.onGetClientData(1);
  }
  onGetClientData(client_id: number) {
    this._ClientService
      .GetClientsData(client_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.profile = res;
        },
      });
  }
  showSuccessAlert() {
    Swal.fire({
      title: 'تم الحفظ بنجاح',
      text: 'تم إضافة البيانات إلى جهات الاتصال',
      icon: 'success',
      confirmButtonText: 'تم',
    });
  }
  ConfirmPopup() {
    Swal.fire({
      title: 'هل ترغب في إعادة إدخال بياناتك؟',
      text: 'سيتم تحويلك إلى صفحة التسجيل لإدخال البيانات مرة أخرى.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم',
      cancelButtonText: 'الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  }
  openPromo() {
    Swal.fire({
      html: `
        <div class="promo-popup" dir="rtl">
          <h2>👉 خليك ديجيتال 👈</h2>
          <p>امتلك صفحتك الرقمية الآن بخصم</p>
          <h1 class="discount">60%</h1>
          <p>و أحصل على هدية <br> QR Code استيكر</p>
          <div class="qr-box">
            <img src="assets/qr_placeholder.jpg" height="150" alt="QR Code"/>
          </div>
          <p class="note">😎 خطوتك الأولى نحو المستقبل تبدأ هنا</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'اطلبه الآن',
      cancelButtonText: 'خروج',
      cancelButtonColor: '#d33',
      customClass: {
        popup: 'promo-swal',
      },
    });
  }
  saveVcf() {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${this.profile.id || ''}
TEL;TYPE=cell:${this.profile.mobile1}
TEL;TYPE=cell:${this.profile.mobile2}
TEL;TYPE=whatsapp:${this.profile.whatsApp}
EMAIL:${this.profile.email}
URL:${this.profile.faceBook || ''}
URL:${this.profile.instagram || ''}
URL:${this.profile.tikTok || ''}
PHOTO;VALUE=URI:${this.profile.image || ''}
END:VCARD
  `.trim();

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.profile.faceBook || 'contact'}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.showSuccessAlert();
  }
  // Call mobile number
  callMobile(mobile: string | null) {
    if (mobile) {
      window.open(`tel:${mobile}`, '_self');
    }
  }

  // Call telephone number
  callTelephone(mobile: string | null) {
    if (mobile) {
      window.open(`tel:${mobile}`, '_self');
    }
  }

  // Open WhatsApp chat
  openWhatsApp(number: string | null) {
    if (number) {
      const cleanNumber = number.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    }
  }

  // Open Facebook
  openFacebook(username: string | null) {
    if (username) {
      window.open(`https://facebook.com/${username}`, '_blank');
    }
  }

  // Open Instagram
  openInstagram(username: string | null) {
    if (username) {
      window.open(`https://instagram.com/${username}`, '_blank');
    }
  }

  // Open TikTok
  openTikTok(username: string | null) {
    if (username) {
      window.open(`https://www.tiktok.com/@${username}`, '_blank');
    }
  }

  // Send email
  sendEmail(email: string | null) {
    if (email) {
      window.open(`mailto:${email}`, '_self');
    }
  }
  shareProfile() {
    const shareData: any = {
      title: this.profile.faceBook || 'My Digital Profile',
      text: `تقدر تتواصل مع ${this.profile.faceBook || 'الشخص'} عن طريق:
📱 Mobile: ${this.profile.mobile1}
📧 Email: ${this.profile.email}`,
      url: window.location.href, // أو رابط ثابت للصفحة
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      // fallback لو المتصفح مش بيدعم share
      const dummy = document.createElement('textarea');
      dummy.value = `${shareData.text}\n${shareData.url}`;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      alert('تم نسخ رابط المشاركة 👍');
    }
  }
}
