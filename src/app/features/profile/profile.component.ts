import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/global/base/base.component';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Client } from '../../shared/models/client.model';
import { ClientService } from '../../shared/services/client.service';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent extends BaseComponent implements OnInit {
    currentId: string | null = null;
     profile!: Client;
     basUrl:string = environment.base;
     constructor(
       private _ClientService: ClientService,
       private router: Router,
       private route: ActivatedRoute
     ) {
       super();
       this.currentId = this.route.snapshot.paramMap.get('current_user_id');
       if(!this.currentId){
         this.router.navigateByUrl('No-clientId'); 
       }
     }
     ngOnInit(): void {
       this.onGetClientData(this.currentId);
     }
     onGetClientData(client_id: any) {
       this._ClientService
         .GetClientsData(client_id)
         .pipe(takeUntil(this.destroy$))
         .subscribe({
           next: (res: any) => {
             this.profile = res;
             //this used to check if this is the first time or not if the first tie is true return redirsect to edit page else (false still in the page)
            //'user/:current_user_id/user-form/:update_id'
            if(this.profile.firstTime){
              console.log('mosdtafa')
              const productId = this.route.snapshot.paramMap.get('product_id')
              this.router.navigate([`/user/${this.currentId}/user-form/${productId}`]);
            }else{
              return
            }
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
           const  productId = this.route.snapshot.paramMap.get('product_id')
           this.router.navigate(['user', this.currentId, 'user-form' ]);
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
     callMobile(mobile: string | null| undefined) {
       if (mobile) {
         window.open(`tel:${mobile}`, '_self');
       }
     }
   
     // Call telephone number
     callTelephone(mobile: string | null | undefined) {
       if (mobile) {
         window.open(`tel:${mobile}`, '_self');
       }
     }
   
     // Open WhatsApp chat
     openWhatsApp(number: string | null | undefined) {
       if (number) {
         const cleanNumber = number.replace(/\D/g, '');
         window.open(`https://wa.me/${cleanNumber}`, '_blank');
       }
     }
   
     // Open Facebook
     openFacebook(username: string | null | undefined) {
       if (username) {
         window.open(`${username}`, '_blank');
       }
     }
   
     // Open Instagram
     openInstagram(username: string | null | undefined) {
       if (username) {
         window.open(`https://instagram.com/${username}`, '_blank');
       }
     }
   
     // Open TikTok
     openTikTok(username: string | null | undefined) {
       if (username) {
         window.open(`https://www.tiktok.com/@${username}`, '_blank');
       }
     }
   
     // Send email
     sendEmail(email: string | null | undefined) {
       if (email) {
         window.open(`mailto:${email}`, '_self');
       }
     }
   
     shareProfile() {
   
       // Clean the object (skip null/undefined & skip image)
       const cleanData: any = {};
       Object.entries(this.profile).forEach(([key, value]) => {
         if (value && key !== "image") {
           cleanData[key] = value;
         }
       });
   
       // Add current URL into the object
       cleanData["url"] = window.location.href;
   
       // Convert to a readable text format
       const textToShare = Object.entries(cleanData)
         .map(([key, value]) => `${key}: ${value}`)
         .join("\n");
   
       const shareData: any = {
         title: "My Digital Profile",
         text: textToShare,       // ✅ all info goes here
         //url: window.location.href 
       };
   
       if (navigator.share) {
         navigator
           .share(shareData)
           .then(() => console.log("Shared successfully"))
           .catch((error) => console.error("Error sharing", error));
       } else {
         // fallback لو المتصفح مش بيدعم share
         const dummy = document.createElement("textarea");
         dummy.value = textToShare;
         document.body.appendChild(dummy);
         dummy.select();
         document.execCommand("copy");
         document.body.removeChild(dummy);
         alert("تم نسخ البيانات 👍");
       }
     }
   
}
