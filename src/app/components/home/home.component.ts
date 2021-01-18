import { Kural } from './../../models/kural';
import { Odul } from './../../models/odul';
import { Sonuc3 } from './../../models/sonuc3';
import { Sonuc2 } from './../../models/sonuc2';
import { Sonuc } from './../../models/sonuc';
import { Kayit } from './../../models/kayit';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  kayitlar;
  oduller;
  kurallar;
  secKural: Kural = new Kural();
  secKayit: Kayit = new Kayit();
  secOdul: Odul = new Odul();
  sonuc: Sonuc = new Sonuc();
  sonuc2: Sonuc2 = new Sonuc2();
  sonuc3: Sonuc3 = new Sonuc3();
  ekleduzenle: boolean = false;
  ekleduzenle2: boolean = false;
  ekleduzenle3: boolean = false;
  detay: boolean = false;
  detay2: boolean = false;
  detay3: boolean = false;
  silme: boolean = false;
  silme2: boolean = false;
  silme3: boolean = false;

  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.KayitLislele();
    this.OdulListele();
    this.KuralListele();
  }
  OdulListele() {
    this.fbServis.OdulListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key2: c.payload.key, ...c.payload.val() })

        )
      )
    ).subscribe(data => {
      this.oduller = data;
    })
  }

  KuralListele() {
    this.fbServis.KuralListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key3: c.payload.key, ...c.payload.val() })

        )
      )
    ).subscribe(data => {
      this.kurallar = data;
    })
  }

  KayitLislele() {
    this.fbServis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data;
    });
  }

  Kaydet() {
    var tarih = new Date();
    if (this.secKayit.key == null) {
      this.secKayit.kayTarih = tarih.getTime().toString();
      this.secKayit.duzTarih = tarih.getTime().toString();
      this.secKayit.islem = false;
      this.fbServis.KayitEkle(this.secKayit).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Turnuva Eklendi";
      });

    } else {
      this.secKayit.duzTarih = tarih.getTime().toString();
      this.secKayit.islem = false;
      this.secOdul.islem2 = false;
      this.fbServis.KayitDuzenle(this.secKayit).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Turnuva Güncellendi";
      });

    }
  }

  Kaydet2() {
    if (this.secOdul.key2 == null) {
      this.secOdul.islem2 = false;
      this.fbServis.OdulEkle(this.secOdul).then(d => {
        this.sonuc2.islem2 = true;
        this.sonuc2.mesaj2 = "Ödül Eklendi";
      })
    } else {
      this.fbServis.OdulDuzenle(this.secOdul).then(d => {
        this.sonuc2.islem2 = true;
        this.sonuc2.mesaj2 = "Ödül Güncellendi";
      });

    }
  }

  Kaydet3() {
    if (this.secKural.key3 == null) {
      this.secKural.islem3 = false;
      this.fbServis.KuralEkle(this.secKural).then(d => {
        this.sonuc3.islem3 = true;
        this.sonuc3.mesaj3 = "Kural Eklendi";
      })
    } else {
      this.fbServis.KuralDuzenle(this.secKural).then(d => {
        this.sonuc3.islem3 = true;
        this.sonuc3.mesaj3 = "Kural Güncellendi";
      });

    }
  }


  KayitSec(k: Kayit) {
    Object.assign(this.secKayit, k);

  }

  OdulSec(k: Odul) {
    Object.assign(this.secOdul, k);

  }

  KuralSec(k: Kural) {
    Object.assign(this.secKural, k);

  }

  Sil() {

    this.fbServis.KayitSil(this.secKayit.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Turnuva Silindi";
      this.silme = false;
    });
  }


  Sil2() {
    this.fbServis.OdulSil(this.secOdul.key2).then(d => {
      this.sonuc2.islem2 = true;
      this.sonuc2.mesaj2 = "Ödül Silindi";
      this.silme2 = false;
    });
  }

  Sil3() {
    this.fbServis.KuralSil(this.secKural.key3).then(d => {
      this.sonuc3.islem3 = true;
      this.sonuc3.mesaj3 = "Kural Silindi";
      this.silme3 = false;
    });
  }

  TamamlaIptal(k: Kayit, islem: boolean) {
    var tarih = new Date();
    k.duzTarih = tarih.getTime().toString();
    k.islem = islem;
    this.fbServis.KayitDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Turnuva Güncellendi";
    });

  }

  TamamlaIptal2(k: Odul, islem: boolean) {

    k.islem2 = islem;
    this.fbServis.OdulDuzenle(k).then(d => {
      this.sonuc2.islem2 = true;
      this.sonuc2.mesaj2 = "Ödül Güncellendi";
    });

  }

  TamamlaIptal3(k: Kural, islem: boolean) {

    k.islem3 = islem;
    this.fbServis.KuralDuzenle(k).then(d => {
      this.sonuc3.islem3 = true;
      this.sonuc3.mesaj3 = "Kural Güncellendi";
    });

  }

  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }
}
