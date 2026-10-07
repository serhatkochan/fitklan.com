# Yayın bilgileri

- Üretim adresi: https://fitklan.com/
- Herkese açık tanıtım sayfası deposu: https://github.com/serhatkochan/fitklan.com
- Vercel projesi: `fit-klan`
- Vercel takım adı: `serhatkochans-projects`
- İlk yayın: 7 Ekim 2026
- İlk üretim deployment: `dpl_BEUoXiroSwJ7JFs1Abd5ZQtMerg1`

Bu yayın yalnızca Fit Klan'ın statik tanıtım sayfasına aittir. Uygulamanın gelecekteki frontend ve backend depoları bu yayından ayrı tutulacaktır.

## Alan adı

Cloudflare yetkili DNS sağlayıcısıdır. Nameserver kayıtları Cloudflare'da bırakılmıştır. Alan adına özgü hedefler Vercel'in domain configuration yanıtından alınmıştır.

| Ad | Tür | Hedef | Proxy |
| --- | --- | --- | --- |
| fitklan.com | A | 216.198.79.1 | DNS only |
| fitklan.com | A | 64.29.17.1 | DNS only |
| www.fitklan.com | CNAME | ae8aa5a48599d71f.vercel-dns-017.com | DNS only |

HTTPS sertifikasını Vercel yönetir. HTTP istekleri HTTPS'e, `www.fitklan.com` ise 308 ile ana adrese yönlenir. E-posta/MX hizmeti yapılandırılmamıştır; sayfanın iletişim bağlantısı mevcut kurucu e-posta adresini açar.

## Doğrulama

İlk yayın sırasında Vercel alan adı kontrolü `configured_correctly` ve `misconfigured: false` döndürdü. HTTPS ana sayfa HTTP 200, www ve HTTP yönlendirmeleri 308 döndürdü.

Gerçek Edge tarayıcısında 360, 390, 768, 1024 ve 1440 px genişliklerde yatay taşma olmadığı doğrulandı. Menü, klavye ile rol sekmeleri, FAQ, bölüm bağlantıları, yerel fontlar/görseller, paylaşım görseli ve e-posta CTA kontrol edildi. JavaScript kapalıyken menü ve FAQ kullanılabilir. Test çıktıları ve ekran görüntüleri yerel `artifacts/` klasöründedir; genel build çıktısına dahil edilmez.

## Sonraki yayın

8 Ekim 2026'da mevcut `fit-klan` Vercel projesi, `serhatkochan/fitklan.com` GitHub deposuna bağlandı. Üretim dalı `main` olarak doğrulandı. Bu dala gönderilen commit'ler Vercel üzerinden otomatik yayınlanır.

Yerel build: `npm run build`. Vercel projesi statik `dist/` çıktısını yayınlar. Gerekirse CLI ile üretim yayını önce `--prod --skip-domain` ile hazırlanabilir; doğrulamadan sonra aynı deployment `vercel promote` ile alan adına atanır.

Cloudflare kimlik bilgileri projede veya belgelerde saklanmaz. Yeni DNS hedefleri gerektiğinde Vercel'den yeniden alınmalıdır.
