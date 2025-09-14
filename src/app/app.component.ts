import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseComponent } from './shared/global/base/base.component';
import { ClientService } from './shared/services/client.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(private _ClientService: ClientService) {
    super();
  }
  profile = {
    id: 1,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Colorado_2022_%28cropped%29.jpg', // public profile photo
    mobile1: '1234567890',
    mobile2: '0987654321',
    whatsApp: '1234567890',
    faceBook: 'https://www.facebook.com/ElonMusk',
    instagram: 'https://www.instagram.com/elonmusk',
    tikTok: 'https://www.tiktok.com/@elonmusk',
    email: 'elon.musk@tesla.com',
  };

  ngOnInit(): void {
    this._ClientService
      .GetClientsData(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
  }
  showSuccessAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'This is a SweetAlert2 popup.',
      icon: 'success',
      confirmButtonText: 'Cool',
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
      confirmButtonText: 'موافق',
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
}
