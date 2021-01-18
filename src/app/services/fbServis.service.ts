import { Kural } from './../models/kural';
import { Odul } from './../models/odul';
import { Kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  private dbKayit = '/Turnuva Bilgileri';
  private dbOdul = '/Ödül Bilgileri';
  private dbKural = '/Kurallar';

  kayitRef: AngularFireList<Kayit> = null;
  odulRef: AngularFireList<Odul> = null;
  kuralRef: AngularFireList<Kural> = null;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.odulRef = db.list(this.dbOdul);
    this.kuralRef = db.list(this.dbKural);
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }

  KayitListele() {
    return this.kayitRef;
  }
  KayitEkle(k: Kayit) {
    return this.kayitRef.push(k);
  }
  KayitDuzenle(k: Kayit) {
    return this.kayitRef.update(k.key, k);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }

  OdulListele() {
    return this.odulRef;
  }

  OdulEkle(k: Odul) {
    return this.odulRef.push(k);
  }

  OdulDuzenle(k: Odul) {
    return this.odulRef.update(k.key2, k);
  }

  OdulSil(key2: string) {
    return this.odulRef.remove(key2);
  }

  KuralListele() {
    return this.kuralRef;
  }

  KuralEkle(k: Kural) {
    return this.kuralRef.push(k);
  }

  KuralDuzenle(k: Kural) {
    return this.kuralRef.update(k.key3, k);
  }

  KuralSil(key3: string) {
    return this.kuralRef.remove(key3);
  }
}
