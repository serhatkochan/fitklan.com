# Fit Klan — Tanıtım Sayfası

[fitklan.com](https://fitklan.com/) için herkese açık tanıtım sayfası deposu: [serhatkochan/fitklan.com](https://github.com/serhatkochan/fitklan.com).

Fitklan'ın AI destekli antrenman, koçluk, beslenme ve spor topluluğu deneyimini anlatır. Bu depo yalnızca statik tanıtım sayfasını, görsellerini ve yayın yapılandırmasını içerir. Uygulamanın frontend ve backend kodları bu depoda bulunmaz.

## Sayfa kapsamı

Yeni ürün metnindeki “Hedefin kişisel. Yolculuğun birlikte.” yaklaşımı; AI ile kendi başına, hocayla ve klanla ilerleme yolları üzerinden sunulur. İletişim bağlantıları `business@fitklan.com` adresini açar.

Ürün ekranlarında açıkça örnek veriler kullanılır. Antrenman süresi seçimi, antrenmanı tamamlama/haftayı sıfırlama, öğün miktarı düzenleme, örnek sesli set taslağı ve onayı, hoca görevleri ve klan etkinliği etkileşimlidir. Bunlar tarayıcı belleğinde çalışan demolardır; sayfa yenilenince sıfırlanır. Gerçek AI, ses tanıma, video analizi veya beslenme hesabı çağrısı yapılmaz; mikrofon/kamera açılmaz, hesap ya da gerçek katılım kaydı oluşturulmaz.

## Diller

Türkçe sürüm `/`, İngilizce sürüm `/en/` adresindedir. Üst menüdeki TR/EN bağlantıları iki statik sayfa arasında geçiş yapar; başlık, içerik, erişilebilirlik metinleri, demo mesajları, sayı biçimleri ve e-posta konusu seçilen dile uygundur. Dil seçimi tarayıcının yerel depolamasında hatırlanır; bu izinli değilse bağlantılar çalışmaya devam eder. Dil değişikliği sayfayı yeniden açar ve örnek demo akışını sıfırlar. `/?lang=tr` bağlantısı hatırlanan İngilizce tercihinden bağımsız Türkçe sürümü açar. İngilizce bağlantısı doğrudan paylaşılabilir.

Her iki sürüm JavaScript kapalıyken kendi dilinde okunur. Canonical, hreflang ve sitemap bilgileri iki dili tanımlar. Uygulama kodu bu depoda değildir; dil seçimi yalnızca tanıtım sayfasını kapsar.

## İstatistiklerin kaynağı

Kurucu 11 Ekim 2026'da Ekim 2026 dönemine ait aşağıdaki platform rakamlarını paylaştı. Landing page'de bu değerler “Paylaşılan platform istatistikleri · Ekim 2026” açıklamasıyla kullanılır; bağımsız analiz/veritabanı doğrulaması yapılmadı. Demo ekranlarındaki kişisel kayıtlar bu platform rakamlarının parçası değildir.

| Ölçüm | Paylaşılan değer |
| --- | --- |
| Toplam kayıtlı kullanıcı | 12.450 |
| Son 30 günde aktif kullanıcı | 8.200 |
| Platformdaki hoca | 145 |
| Tamamlanan antrenman | 342.000+ |
| Aktif klan | 48 |

Statik HTML, CSS ve JavaScript kullanılır. Demo miktar alanları hiçbir sunucuya gönderilmez. Kullanıcı kaydı, veritabanı veya kişisel veri toplayan izleme kodu bulunmaz.

## Yayın ve doğrulama

- Vercel projesi: `fit-klan`
- GitHub `main` dalına gönderilen değişiklikler Vercel'de otomatik yayınlanır.
- Ana alan adı: `https://fitklan.com/`
- `www.fitklan.com`, ana alan adına yönlendirilir.
- DNS, Cloudflare üzerinden yönetilir; DNS hedefleri Vercel projesinin alan adı kontrolünden alınır.
- Mobil/masaüstü düzen, klavye erişimi, örnek panel geçişleri, FAQ, iletişim bağlantıları, HTTP/HTTPS ve yönlendirmeler kontrol edilir.

## Yerel önizleme

`npm run build` komutuyla yalnızca genel sayfa dosyalarını `dist/` klasörüne hazırlayın. Herhangi bir yerel HTTP statik dosya sunucusuyla bu klasörü yayınlayın.

Vercel aynı build komutunu kullanır. Kaynak belgeleri, yerel araçlar, `.vercel` ve ortam dosyaları genel çıktıya kopyalanmaz.

Kimlik bilgileri kaynak kodda veya yapılandırma dosyalarında tutulmaz. `.env` dosyaları, yerel `.vercel` bağlantısı, build çıktısı ve doğrulama kayıtları Git'e eklenmez. Depo herkese açık olduğu için Cloudflare, Vercel veya GitHub tokenlarını dosyalara ve commit geçmişine eklemeyin.

`assets/fonts/` içindeki fontların lisans metinleri font dosyalarıyla birlikte saklanır.

Logo dosyaları, renkleri ve tasarım süreci [BRAND.md](BRAND.md) içinde açıklanır.
