# Kantin Terminal Ferry — PWA Setup

## Fail yang diperlukan
```
kantin/
├── index.html      ← App utama
├── manifest.json   ← PWA config
├── sw.js           ← Service Worker (offline)
└── icon.png        ← Icon app (512×512)
```

## Cara letak di server (percuma)

### Pilihan 1: GitHub Pages (PERCUMA, paling mudah)
1. Buat akaun GitHub (percuma) → https://github.com
2. Buat repo baru → namakan "kantin"
3. Upload semua 4 fail ini
4. Pergi Settings → Pages → Source: main branch
5. URL anda: `https://[username].github.io/kantin/`
6. Buka di Safari/Chrome → boleh install ke Home Screen ✅

### Pilihan 2: Netlify Drop (PERCUMA, paling cepat)
1. Pergi https://app.netlify.com/drop
2. Drag & drop folder "kantin" ke situ
3. Dapat URL terus → done!

### Pilihan 3: Vercel (PERCUMA)
1. Pergi https://vercel.com
2. Import dari GitHub atau drag & drop
3. Deploy dalam 1 minit

## Cara install ke iPhone/iPad (iOS)
1. Buka URL dalam **Safari** (bukan Chrome/Firefox)
2. Tekan ikon **Share** (kotak dengan anak panah ke atas)
3. Pilih **"Add to Home Screen"**
4. Tekan **"Add"**
5. App akan muncul di skrin utama ✅

## Cara install ke Android
1. Buka URL dalam **Chrome**
2. Banner "Install" akan muncul automatik
3. ATAU: tekan ⋮ menu → "Add to Home Screen"
4. App akan install seperti APK ✅

## Ciri-ciri baru dalam versi ini
- ✅ **Offline support** — guna tanpa internet selepas install
- ✅ **Auto-save** — data pesanan simpan dalam telefon (localStorage)
- ✅ **Install banner** — reminder automatik untuk install
- ✅ **iOS/Android icons** — icon yang betul bila install
- ✅ **Full-screen mode** — tiada browser bar, rasa macam app sebenar
- ✅ **Safe area** — notch iPhone ditangani betul

## Nota penting
- Data pesanan **disimpan dalam telefon** sahaja (localStorage)
- Setiap telefon ada data tersendiri — tidak sync antara peranti
- Gunakan **Reset Harian** di Tetapan setiap hari baharu
- Untuk sync antara beberapa peranti, perlu backend (berbayar/advanced)

© ChanJX · +60-18 781 1293
