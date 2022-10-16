# Solid_Electron_Angular_Practicum
Course Name
Solid Electron Angular Practicum
Type
First Case
Technologies to be used
Javascript, Typescript

Case Detail
Verilen malzeme listesi ve iş sürecini kullanarak bir hamburger işletmesi fonksiyonelitesi hazırlanmalıdır.
Javascript ve TypeScript kullanarak gerekli yerlerde senkron veya asenkron bir yapı kullanarak çalışan bir uygulama yapılacak. CallBack Function, Promise, async-await yapılarından birini kullanabilirsiniz.
Malzeme Listesi: 
Tüm malzemelerden 5’er adet olduğu varsayılacaktır.
Marul Turşu
Paket Sos
Soğan
Köfte
Tavuk
Domates
Ekmek
Patates
Cola
İş Süreci:
Sipariş al (1 Saniye)
Her malzeme için stok kontrolü (3 saniye)
Eğer stokta malzeme eksiği varsa uyarı mesajı verilmeli, işlem iptal edilmeli, yeni istek alınmamalı)
Köfte mi? - Tavuk mu? sorgusu(1 saniye)
Köfte ise :
Pişme derecesi kontrolü
Az Pişmiş(2 saniye)
Orta Pişmiş (3 saniye)
Çok Pişmiş (4 saniye)

Tavuk ise:
Tavuk Pişir (3 saniye)

Hamburger Yapımı(2 saniye): 
Köfte veya Tavuk(1 adet), Marul(1 adet), Domates(1 adet), Turşu(1 adet), Soğan(1 adet) hamburger ekmeğiyle birleştirilecek. Malzemeler siparişte varsa eklenmeli!
Patatesleri Kızart (5 saniye)
 İçeçeği Hazırla (2 saniye)
 Sosları ve Ürünleri Servis Tepsisine Koy (1 saniye)
 Müşteriye Servis Et (1 saniye)

Genel sistemin akış şeması:
1. step -> 2. step -> 3,4,5 -> 6 -> 7 
3,4 ve 5. stepler aynı anda başlatılmalı. Birbirlerinin bitmesini beklememeli. 
6. step, 3,4 ve 5. stepler bittikten sonra başlamalı 
7. step, 6. stepten sonra başlayacak.

Html, css ya da bootstrap kullanarak görüntü katabilirsiniz.
