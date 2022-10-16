import { Component, OnInit } from '@angular/core';
import { siparisAliniyorText, siparisAlindiText, siparisKontrolEdildiText, siparisKontrolEdiliyorText, siparisKontrolEdilemediText, hamburgerHazirlanamadiText, hamburgerHazirlandiText, hamburgerHazirlaniyorText, kofteMiTavukMuText, kofteText, patatateslerKizartildiText, patatateslerKizartiliyorText, tavukPisirildiText, tavukPisiriliyorText, tavukText, iceceklerHazirlaniyorText, patatateslerKizartilamadiText, iceceklerHazirlanamadiText, iceceklerHazirlandiText, soslarHazirlanamadiText, soslarHazirlandiText, soslarHazirlaniyorText, musteriyeServisEdildiText, musteriyeServisEdiliyorText, musteriyeServisEdilemediText } from '../statics/informationMessages';
import { hamburgerYapimiSuresi, icecegiHazirlamaSuresi, kofteAzPismisSuresi, kofteCokPismisSuresi, kofteMiTavukMuSuresi, kofteOrtaPismisSuresi, MüşteriyeServisEtmeSuresi, patatesleriKizartmaSuresi, siparisAlmaSuresi, SoslariUrunleriServisTepsisineKoymaSuresi, stokKontroluSuresi, tavukPisirmeSuresi } from '../services/times';
import { consoleLogWriter } from '../services/consoleService';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  title: string = 'Burger Cafe\' Hoşgeldiniz.';
  azPismis: string
  ortaPismis: string
  cokPismis: string
  orderList: any;
  productList: any;
  checkedList: any;

  siparisAlButtonIsToggle: boolean;
  siparisAlindiMi: boolean;
  musteriyeTeslimEdildi: boolean;
  siparisIptalEdildiMi: boolean;
  siparisOnaylandiMi: boolean;
  siparisTamamlandiMi: boolean;
  stoguListeleToggle: boolean;

  tavukToggle: boolean;
  kofteToggle: boolean;

  azPismisToggle: boolean;
  ortaPismisToggle: boolean;
  cokPismisToggle: boolean;
  masterSelected: boolean;

  pisirmeDerecesiText: string;

  ordersList: string;
  splitted: any;



  constructor() {
    this.pisirmeDerecesiText = '';

    this.azPismis = 'Az'
    this.ortaPismis = 'Orta'
    this.cokPismis = 'Çok'

    this.stokVarsayılanaAyarla();
    this.stoguListeleToggle = false;
    this.musteriyeTeslimEdildi = false;

    this.siparisAlButtonIsToggle = false;
    this.masterSelected = false;
    this.siparisAlindiMi = false;
    this.siparisIptalEdildiMi = false;
    this.siparisOnaylandiMi = false;
    this.musteriyeTeslimEdildi = false;

    this.tavukToggle = false;
    this.kofteToggle = false;
    this.azPismisToggle = false;
    this.ortaPismisToggle = false;
    this.cokPismisToggle = false;


  }
  stokVarsayılanaAyarla() {

    this.orderList = [];

    this.productList = [

      { value: 'Marul', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Turşu', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Paket Sos', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Soğan', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Domates', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Ekmek', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Patates', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Cola', isSelected: false, stockQuantity: 5, isShown: true },
      { value: 'Tavuk', isSelected: false, stockQuantity: 5, isShown: false },
      { value: 'Köfte', isSelected: false, stockQuantity: 5, isShown: false },

    ];

  }


  stokSifirla() {

    this.stokVarsayılanaAyarla();

    this.siparisAlButtonIsToggle = false;
    this.siparisAlindiMi = false;
    this.siparisIptalEdildiMi = false;
    this.siparisTamamlandiMi = false;
  }
  stoguListele() {
    let stokListesiElement: HTMLElement | null = document.getElementById('stokListesi');

    this.stoguListeleToggle = !this.stoguListeleToggle;

    if (stokListesiElement) {
      if (this.stoguListeleToggle) {
        stokListesiElement.style.display = 'block';
      }
      if (!this.stoguListeleToggle) {
        stokListesiElement.style.display = 'none';
      }
    }
  }

  ngOnInit(): void {
    this.stokVarsayılanaAyarla();
  }

  tavukSecildi() {

    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].value == 'Köfte') {
        this.productList[i].isSelected = false;
      }
    }

    let pisirmeDereceleriElement: HTMLElement | null = document.getElementById('pisirmeDereceleri');
    if (pisirmeDereceleriElement && pisirmeDereceleriElement.style.display == 'block')
      pisirmeDereceleriElement.style.display = 'none';

  }

  kofteSecildi() {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].value == 'Tavuk') {
        this.productList[i].isSelected = false;
      }
    }

    let pisirmeDereceleriElement: HTMLElement | null = document.getElementById('pisirmeDereceleri');
    if (pisirmeDereceleriElement)
      pisirmeDereceleriElement.style.display = (this.productList[9].isSelected)
        ? 'none'
        : 'block';

  }


  checkValue(values: any) {

    let checkedProduct: string = values.currentTarget.id;
    //let checked: boolean = values.currentTarget.checked;

    //btnradioTavuk id'si
    if (checkedProduct == 'btnTavuk') {
      this.tavukSecildi();
    }
    else if (checkedProduct == 'btnKofte') {
      this.kofteSecildi();
    }
    this.sepeteEkle();
    this.getCheckedList();
  }

  sepeteEkle() {

    this.orderList.splice(0);
    for (let i = 0; i < this.productList?.length; i++)
      if (this.productList[i].isSelected)
        this.orderList.push(this.productList[i].value);
  }

  getCheckedList() {

    let jsonElement = document.getElementById('json');
    let orderListLengthElement = document.getElementById('orderList.length');
    let warningElement = document.getElementById('warning');

    if (jsonElement) {
      let data = `orderlist : ${JSON.stringify(this.orderList, undefined, 1)}`;
      jsonElement.textContent = data;
    }
    if (orderListLengthElement) {
      let data = `orders length: ${JSON.stringify(this.orderList.length, undefined, 1)}`;
      orderListLengthElement.textContent = data;
    }
    if (warningElement) {
      warningElement.textContent = `Köfte ve Tavuk seçimi anlık yansımamaktadır. Ama listeye eklenmektedir`;
    }

  }


  async siparisAl() {

    let modalElement = document.getElementById('siparisOlusturModal');

    modalElement?.addEventListener('hidden.bs.modal', () => {

      consoleLogWriter(this.siparisOnaylandiMi + '');
      consoleLogWriter((this.siparisIptalEdildiMi == false) + '');

      if (this.siparisOnaylandiMi) {

        if (!this.siparisIptalEdildiMi) {
          this.siparisAlButtonIsToggle = !this.siparisAlButtonIsToggle;
          this.siparisAlPromise();
        }
        else {
          setTimeout(() => {
            this.siparisAlindiMi = false;
            this.siparisIptalEdildiMi = false;
            this.siparisAlButtonIsToggle = false;
          }, 500);
        }
      }

    });
  }

  async siparisAlPromise() {

    this.step1Promise()
      .then(async data => {

        consoleLogWriter(data);
        await this.step2Promise()
          .then(data => {
            consoleLogWriter(data)
          })
          .catch(err => {
            consoleLogWriter(err);
            this.siparisIptalEdildiMi = true;
            this.siparisleriIptalEt('Step2 hata');
          });

        await Promise.all([this.step3Promise(), this.step4Promise(), this.step5Promise()])
          .then(([promiseData3, promiseData4, promiseData5]) => {

            consoleLogWriter(promiseData3);
            consoleLogWriter(promiseData4);
            consoleLogWriter(promiseData5);

          }).catch(([promiseError3, promiseError4, promiseError5]) => {
            consoleLogWriter(promiseError3);
            consoleLogWriter(promiseError4);
            consoleLogWriter(promiseError5);
            this.siparisIptalEdildiMi = true;
            this.siparisleriIptalEt('Step3,4,5 hata');
          });

        await this.step6Promise()
          .then(data => {
            consoleLogWriter(data)
          }).catch(err => {
            consoleLogWriter(err);
            this.siparisIptalEdildiMi = true;
            this.siparisleriIptalEt('Step6 hata');
          });

        await this.step7Promise()
          .then(data => {
            consoleLogWriter(data);
            consoleLogWriter('', true);
            setTimeout(() => {
              this.musteriyeTeslimEdildi = true;
              this.siparisAlindiMi = false;
              this.siparisIptalEdildiMi = false;
              this.siparisAlButtonIsToggle = !this.siparisAlButtonIsToggle;
            }, 500);

          }).catch(err => {
            consoleLogWriter(err);
            this.siparisIptalEdildiMi = true;
            this.siparisleriIptalEt('Step7 hata');
          });
      })
      .catch(err => {
        consoleLogWriter(err);
        this.siparisIptalEdildiMi = true;
        this.siparisleriIptalEt('Step1 hata');
      });


  }
  // Promises

  public step1Promise(): Promise<string> {
    return new Promise<string>((resolve) => {

      consoleLogWriter(siparisAliniyorText);
      setTimeout(() => {
        resolve(siparisAlindiText);
      }, siparisAlmaSuresi);
    });
  }
  public step2Promise(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      consoleLogWriter(siparisKontrolEdiliyorText);
      setTimeout(() => {
        if (this.siparisleriKontrolEt())
          resolve(siparisKontrolEdildiText);
        else
          reject(siparisKontrolEdilemediText);
      }, stokKontroluSuresi);
    });
  }

  public step3Promise(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      consoleLogWriter(`${kofteMiTavukMuText}`);

      setTimeout(() => {
        if (this.tavukToggle) {
          consoleLogWriter(`${tavukText}`);
          consoleLogWriter(`${tavukPisiriliyorText}`);
          setTimeout(() => {
            consoleLogWriter(`${tavukPisirildiText}`);
          }, tavukPisirmeSuresi);
        }
        if (this.kofteToggle) {

          consoleLogWriter(`${kofteText}`);
          if (this.azPismisToggle) {
            setTimeout(() => {
              consoleLogWriter(`Köfte az pişmiş olarak ayarlandı.`);
            }, kofteAzPismisSuresi);
          }
          if (this.ortaPismisToggle) {
            setTimeout(() => {
              consoleLogWriter(`Köfte orta pişmiş olarak ayarlandı.`);
            }, kofteOrtaPismisSuresi);
          }
          if (this.cokPismisToggle) {
            setTimeout(() => {
              consoleLogWriter(`Köfte çok pişmiş olarak ayarlandı.`);
            }, kofteCokPismisSuresi);
          }

        }
      }, kofteMiTavukMuSuresi);

      consoleLogWriter(hamburgerHazirlaniyorText);
      let state: Boolean = this.siparisleriKontrolEt();

      setTimeout(() => {
        if (state)
          resolve(hamburgerHazirlandiText);
        else
          reject(hamburgerHazirlanamadiText);
      }, hamburgerYapimiSuresi);
    });
  }
  public step4Promise(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      consoleLogWriter(patatateslerKizartiliyorText);
      let state: Boolean = this.siparisleriKontrolEt();

      setTimeout(() => {
        if (state)
          resolve(patatateslerKizartildiText);
        else
          reject(patatateslerKizartilamadiText);
      }, patatesleriKizartmaSuresi);
    });
  }
  public step5Promise(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      consoleLogWriter(iceceklerHazirlaniyorText);
      let state: Boolean = this.siparisleriKontrolEt();

      setTimeout(() => {
        if (state)
          resolve(iceceklerHazirlandiText);
        else
          reject(iceceklerHazirlanamadiText);
      }, icecegiHazirlamaSuresi);
    });
  }
  public step6Promise(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      consoleLogWriter(soslarHazirlaniyorText);
      let state: Boolean = this.siparisleriKontrolEt();

      setTimeout(() => {
        if (state)
          resolve(soslarHazirlandiText);
        else
          reject(soslarHazirlanamadiText);
      }, SoslariUrunleriServisTepsisineKoymaSuresi);
    });
  }
  public step7Promise(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      consoleLogWriter(musteriyeServisEdiliyorText);
      let state: Boolean = this.siparisleriKontrolEt();

      setTimeout(() => {
        if (state) {
          //
          for (let i = 0; i < this.productList.length; i++) {
            let [isSelected, stockQuantity] = [this.productList[i].isSelected, this.productList[i].stockQuantity];
            if (isSelected) {
              this.productList[i].stockQuantity = stockQuantity - 1;
              this.productList[i].isSelected = false;
            }
          }
          //

          let pisirmeDereceleriElement: HTMLElement | null = document.getElementById('pisirmeDereceleri');

          if (pisirmeDereceleriElement) {
            pisirmeDereceleriElement.style.display = 'none';
          }

          //
          resolve(musteriyeServisEdildiText);
        }
        else
          reject(musteriyeServisEdilemediText);
      }, MüşteriyeServisEtmeSuresi);

    });
  }
  // \Promises

  public siparisleriKontrolEt(): boolean {
    let productCount: number = this.productList.length;
    let counter: number = 0;

    for (var i = 0; i < this.productList.length; i++) {

      if (this.productList[i].stockQuantity > 0) {
        counter++;
      }
      else if (this.productList[i].stockQuantity <= 0) {

      }
    }

    if (productCount === counter)
      return true;
    else {
      consoleLogWriter(`Siparişi iptal ediliyor`);
      this.siparisleriIptalEt('Stok yetersiz');
      return false;
    }
  }

  pisirmeDerecesi(data: string) {
    this.pisirmeDerecesiText = data;
    if (data === this.azPismis) {
      this.azPismisToggle = true;
      this.ortaPismisToggle = false;
      this.cokPismisToggle = false;
    }
    else if (data === this.ortaPismis) {
      this.azPismisToggle = false;
      this.ortaPismisToggle = true;
      this.cokPismisToggle = false;
    }
    else if (data === this.cokPismis) {
      this.azPismisToggle = false;
      this.ortaPismisToggle = false;
      this.cokPismisToggle = true;
    }
  }

  siparisOnaylandi() {
    this.siparisAlindiMi = true;
    this.siparisIptalEdildiMi = false;
    this.siparisOnaylandiMi = this.orderList.length > 0;

    if (!this.siparisOnaylandiMi) {
    this.siparisIptalEdildiMi = true;
      alert('Sepetiniz Boş');
      window.location.reload();
    }
  }

  siparisIptalEdildi() {
    this.siparisIptalEdildiMi = true;
  }

  siparisleriIptalEt(message: string) {
    consoleLogWriter(`Sipariş ${message} için iptal edildi`);
  }

}

