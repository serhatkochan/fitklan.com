# Fit Klan

Türkçe, geliştirme aşamasındaki Fit Klan platformunun tanıtım sayfası.

## Sayfa kapsamı

Hocaların program, geri bildirim ve öğrenci takibini; öğrencilerin antrenman ve kapalı topluluk deneyimini anlatır. Örnek ürün ekranları gerçek bir kullanıcı hesabı veya çalışan fitness uygulaması olarak sunulmaz. Erken erişim iletişimi, doğrulanmış kurucu e-posta adresine `mailto:` bağlantısı üzerinden gerçekleşir.

Statik HTML, CSS ve JavaScript kullanılır. Kayıt formu, veritabanı veya kişisel veri toplayan izleme kodu bulunmaz.

## Yayın ve doğrulama

- Vercel projesi: `fit-klan`
- Ana alan adı: `https://fitklan.com/`
- `www.fitklan.com`, ana alan adına yönlendirilir.
- DNS, Cloudflare üzerinden yönetilir; DNS hedefleri Vercel projesinin alan adı kontrolünden alınır.
- Mobil/masaüstü düzen, klavye erişimi, örnek panel geçişleri, FAQ, iletişim bağlantıları, HTTP/HTTPS ve yönlendirmeler kontrol edilir.

## Yerel önizleme

`npm run build` komutuyla yalnızca genel sayfa dosyalarını `dist/` klasörüne hazırlayın. Herhangi bir yerel HTTP statik dosya sunucusuyla bu klasörü yayınlayın.

Vercel aynı build komutunu kullanır. Kaynak belgeleri, yerel araçlar, `.vercel` ve ortam dosyaları genel çıktıya kopyalanmaz.

Kimlik bilgileri kaynak kodda veya yapılandırma dosyalarında tutulmaz.
