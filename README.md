# Fit Klan — Tanıtım Sayfası

[fitklan.com](https://fitklan.com/) için herkese açık tanıtım sayfası deposu: [serhatkochan/fitklan.com](https://github.com/serhatkochan/fitklan.com).

Fit Klan, geliştirme aşamasındaki bir hoca–öğrenci platformudur. Bu depo yalnızca statik tanıtım sayfasını, görsellerini ve yayın yapılandırmasını içerir. Uygulamanın frontend ve backend kodları ileride ayrı depolarda geliştirilecektir; bu depolar henüz oluşturulmamıştır.

## Sayfa kapsamı

Hocaların program, geri bildirim ve öğrenci takibini; öğrencilerin antrenman ve kapalı topluluk deneyimini anlatır. Örnek ürün ekranları gerçek bir kullanıcı hesabı veya çalışan fitness uygulaması olarak sunulmaz. Erken erişim iletişimi, doğrulanmış kurucu e-posta adresine `mailto:` bağlantısı üzerinden gerçekleşir.

Statik HTML, CSS ve JavaScript kullanılır. Kayıt formu, veritabanı veya kişisel veri toplayan izleme kodu bulunmaz.

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
