import { Component, OnInit } from '@angular/core';
import { QrCodeService } from '../../shared/services/qr-code.service';
import { ClientService } from '../../shared/services/client.service';
import { BaseComponent } from '../../shared/global/base/base.component';
import { takeUntil } from 'rxjs';
import { environment } from '../../environment/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-qr-image',
  imports: [CommonModule],
  templateUrl: './qr-image.component.html',
  styleUrl: './qr-image.component.css'
})
export class QrImageComponent extends BaseComponent implements OnInit{
      baseUrl:string  = "https://main-qr-code.vercel.app/user";
      clientId!:number;
      fullUrl!:string;
      constructor(
        private qrService:QrCodeService,
        private _ClientService:ClientService,
        private route:ActivatedRoute
      ){
        super()
      }
     ngOnInit(): void {
       const clientId = this.route.snapshot.paramMap.get('clientId');
       this.loadClientData(clientId)
     }

      loadClientData(id: any) {
      this._ClientService
        .GetClientsData(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: async (res: any) => { // ✅ make the callback async
            if (res) {
              this.clientId = res.id;
              this.fullUrl = await this.qrService.generateQrCodeUrl(this.baseUrl , this.clientId)
            }
          },
          error: (err) => {
            console.error('❌ Error fetching client data', err);
            // هنا ممكن تعرض SweetAlert2 لو حابب
          }
        });
    }
}
