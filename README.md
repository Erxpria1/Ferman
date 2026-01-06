# 📜 Divan-ı Not (Sadrazam'ın Defteri)

**Osmanlı temalı modern görev yöneticisi**

## 🎯 Genel Bakış

Divan-ı Not, Osmanlı İmparatorluğu'nun zengin estetiğini modern web teknolojileriyle birleştiren, benzersiz bir görev yönetim uygulamasıdır. Geleneksel Türk sanatlarından ilham alan tasarımı ve kullanıcı dostu arayüzüyle, görevlerinizi yönetmeyi hem eğlenceli hem de verimli bir deneyime dönüştürür.

## ✨ Özellikler

### 🎨 Görsel Tasarım
- **Osmanlı Renk Paleti**: Turkuaz (çini), Bordo (kadife), Altın Sarısı (varak)
- **Ebru Animasyonu**: Su üzerinde dalgalanan boyalardan ilham alan açılış ekranı
- **Parşömen Efekti**: Otantik Osmanlı belgesi görünümü
- **Altın Varak Çerçeveler**: Görevler ve modüller için zarif çerçeveler

### 📋 Kanban Tahtası
- **Üç Sütunlu Sistem**:
  - 📜 **Fermanlar**: Yapılacak görevler
  - ⚙️ **İşlemde**: Devam eden görevler
  - 💎 **Hazine**: Tamamlanan görevler
- **Sürükle-Bırak**: Görevleri kolayca taşıyın
- **Detaylı Görev Görünümü**: Her görev için özel modal pencere

### 🏆 Gamification (Oyunlaştırma)
Tamamladığınız görevlere göre rütbe kazanın:
1. **Acemi Oğlanı** (Başlangıç)
2. **Yeniçeri** (10 görev)
3. **Paşa** (50 görev)
4. **Sadrazam** (100+ görev)

### 🎭 Özel Özellikler
- **Katip (Akıllı Asistan)**: Akıllı öneriler ve Osmanlıca atasözleri
- **Mühür Efekti**: Görev tamamlandığında animasyonlu onay mührü
- **LocalStorage**: Tarayıcıyı kapatınca bile verileriniz kaybolmaz
- **PWA Desteği**: Masaüstüne yükleyip uygulama gibi kullanın

## 🛠️ Teknoloji Yığını

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Özel CSS
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Fonts**: Cinzel Decorative (Başlıklar), Inter (Gövde)
- **Storage**: LocalStorage API
- **PWA**: Service Workers + Web Manifest

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın**:
   ```bash
   git clone <repository-url>
   cd Ferman
   ```

2. **Bağımlılıkları yükleyin**:
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**:
   ```bash
   npm run dev
   ```

4. **Tarayıcıda açın**:
   ```
   http://localhost:5173
   ```

### Üretim İçin Build

```bash
npm run build
```

Build edilen dosyalar `dist/` klasöründe oluşturulur.

## 📱 Kullanım

### Görev Ekleme
1. İlgili sütunun altındaki "Yeni Ferman" butonuna tıklayın
2. Görev başlığını yazıp Enter'a basın veya "Ekle" butonuna tıklayın

### Görev Düzenleme
1. Bir göreve tıklayın
2. Açılan modal pencerede:
   - İkon seçin
   - Başlık ve açıklama ekleyin
   - Öncelik seviyesi belirleyin
   - Diğer sütunlara taşıyın

### Görev Taşıma
- **Sürükle-bırak**: Görevi tutup istediğiniz sütuna sürükleyin
- **Modal'dan**: Görev detayında "Taşı" butonlarını kullanın

### Rütbe Sistemi
- Her görevi "Hazine" sütununa taşıdığınızda tamamlanmış sayılır
- Tamamlanan görev sayısına göre otomatik rütbe yükselirsiniz
- İlerlemenizi sağ üst köşedeki rütbe rozetinden takip edin

## 🎨 Özelleştirme

### Renk Paleti
Renkleri değiştirmek için `src/index.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
  --ottoman-turquoise: #1ABC9C;
  --ottoman-bordeaux: #8B0000;
  --ottoman-gold: #FFD700;
  /* ... diğer renkler */
}
```

### Tailwind Yapılandırması
`tailwind.config.js` dosyasında tema ayarlarını özelleştirin.

## 📂 Proje Yapısı

```
Ferman/
├── public/
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service Worker
├── src/
│   ├── components/
│   │   ├── common/        # Ortak componentler (Katip)
│   │   ├── gamification/  # Rütbe ve mühür animasyonları
│   │   ├── kanban/        # Kanban tahtası componentleri
│   │   └── splash/        # Ebru açılış ekranı
│   ├── context/           # React Context (TaskContext)
│   ├── utils/             # Yardımcı fonksiyonlar (storage)
│   ├── App.jsx            # Ana uygulama
│   ├── main.jsx           # Giriş noktası
│   └── index.css          # Global stiller
├── package.json
├── vite.config.js
└── README.md
```

## 🔮 Gelecek Özellikler

- [ ] Web Notifications API entegrasyonu
- [ ] Özel alarm ve hatırlatıcılar
- [ ] Alaturka saat tasarımlı zaman seçici
- [ ] Ses efektleri (Ney, Mehter kös)
- [ ] Çoklu dil desteği
- [ ] Karanlık mod
- [ ] Görev kategorileri
- [ ] Dosya ekleme özelliği
- [ ] Veri dışa/içe aktarma (JSON, CSV)

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/harika-ozellik`)
5. Pull Request oluşturun

## 📜 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Yaratıcı

Proje Müdürü: Gemini (AI Assistant)
Konsept: Osmanlı-Türk Modern UX

## 🙏 Teşekkürler

- Osmanlı sanatından ilham için
- React ve Vite topluluğuna
- Tüm açık kaynak katkıda bulunanlara

---

**Hoş Geldiniz Hünkarım!** 👑

*Divan-ı Not ile görevlerinizi Osmanlı zarafeti ile yönetin.*
