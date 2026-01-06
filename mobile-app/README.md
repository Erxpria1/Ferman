# 📱 Divan-ı Not - React Native (Expo)

Osmanlı temalı görev yöneticisinin mobil versiyonu. **Expo Go** ile çalışır.

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- Expo Go uygulaması (iOS/Android)

### Kurulum

```bash
cd mobile-app
npm install
```

### Çalıştırma

```bash
# Expo server'ı başlat
npx expo start

# QR kodu telefonunuzla tarayın (Expo Go ile)
```

## ✨ Özellikler

### ✅ Çalışan Özellikler
- 📜 **Kanban Tahtası**: 3 sütunlu görev yönetimi (Fermanlar/İşlemde/Hazine)
- 📝 **Görev Ekleme**: Hızlıca yeni ferman ekleyin
- ✅ **Görev Taşıma**: Sütunlar arası görev taşıma
- 🗑️ **Görev Silme**: İstemediğiniz görevleri kaldırın
- 🏆 **Rütbe Sistemi**: Acemi Oğlanı → Yeniçeri → Paşa → Sadrazam
- 💾 **AsyncStorage**: Veriler kalıcı olarak saklanır
- 🎨 **Osmanlı Teması**: Türkuaz, Bordo, Altın renkleri
- 📜 **16 Osmanlı Emojisi**: Özel ikon seti

### 🚧 Geliştirilecek Özellikler
- ⏰ **Bildirimler ve Alarmlar** - Expo Notifications ile
- 🌊 **Ebru Splash Screen** - React Native Reanimated ile
- 🎭 **Katip Asistanı** - Akıllı öneriler
- ✋ **Drag & Drop** - React Native Gesture Handler ile
- 📊 **Animasyonlar** - Mühür efektleri ve geçişler

## 📂 Proje Yapısı

```
mobile-app/
├── App.js                 # Ana uygulama
├── src/
│   ├── constants/
│   │   └── theme.js      # Renkler ve emojiler
│   └── utils/
│       └── storage.js    # AsyncStorage yardımcıları
├── app.json              # Expo konfigürasyonu
├── babel.config.js       # Babel ayarları
└── tailwind.config.js    # NativeWind (opsiyonel)
```

## 🎨 Osmanlı Renk Paleti

- **Turkuaz**: `#1ABC9C` (Çini)
- **Bordo**: `#8B0000` (Kadife)
- **Altın**: `#FFD700` (Varak)
- **Krem**: `#FFF8DC` (Parşömen)
- **Kırmızı**: `#DC143C` (Crimson)

## 📜 Osmanlı Emoji Seti

🏛️ 🪝️ 🌷 🌹 ⚔️ 👑 📿 🕌 🎭 🧿 ☕ 📜 🏺 🎨 💎 🗡️

## 🔧 Geliştirme

### Bağımlılıklar Ekleme

```bash
npx expo install [paket-adı]
```

### Build

```bash
# Android APK
eas build --platform android

# iOS IPA (MacOS gerekli)
eas build --platform ios
```

## 📱 Expo Go'da Test

1. Expo Go uygulamasını indirin
2. `npx expo start` komutu ile server'ı başlatın
3. QR kodu tarayın
4. Uygulama telefonunuzda açılacak

## 🤝 Katkıda Bulunma

Web versiyonundaki diğer özellikleri eklemek için:

1. `src/components/` klasöründe yeni componentler oluşturun
2. React Native componentlerini kullanın (View, Text, TouchableOpacity, vb.)
3. StyleSheet ile stil ekleyin
4. AsyncStorage ile veri saklayın

## 📝 Notlar

- Expo Go ücretsiz ve kolaydır
- Gerçek cihazda test edin
- Web versiyonundaki tüm özellikler henüz eklenmemiştir
- İstediğiniz özelliği eklemek için issue açın

---

**Hoş Geldiniz Hünkarım!** 👑

*Divan-ı Not Mobile - Osmanlı zarafetini cebinizde taşıyın.*
