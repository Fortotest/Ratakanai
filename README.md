# 🎯 Ratakan Simulator

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 1. Project Definition

### What is this project?
Ini adalah **Business Strategy Simulator** dalam format *Single Page Application (SPA)*. 🚀

Aplikasi ini berfungsi sebagai "laboratorium strategi" interaktif yang memungkinkan pemilik bisnis, *marketer*, atau analis untuk menguji berbagai skenario bisnis, alokasi *budget*, dan model harga sebelum mengambil risiko dengan uang sungguhan.

### Tujuan Proyek ✅
* Menyediakan **"Strategy Lab"** interaktif untuk memvalidasi ide bisnis dengan cepat.
* Memvisualisasikan alokasi *budget* dan potensi *market share* menggunakan **Chart.js**.
* Memberikan **kalkulator profit** sederhana untuk proyeksi keuntungan.
* Menghasilkan **rekomendasi berbasis AI** untuk optimasi strategi, membantu pengguna menemukan channel baru atau menghentikan channel yang tidak perform.
* Menjawab pertanyaan umum melalui **FAQ** dengan komponen *accordion* yang rapi.

---

## 2. Tech Stack 🛠️

Proyek ini dibangun menggunakan tumpukan teknologi modern untuk *user interface* yang bersih dan responsif:

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (`tailwind.config.ts`)
* **Komponen UI:** [Shadcn/ui](https://ui.shadcn.com/) (`components.json`)
* **Visualisasi Data:** [Chart.js](https://www.chartjs.org/) (Untuk *Doughnut Charts*)
* **Font:** [Inter](https://fonts.google.com/specimen/Inter) (Sesuai *Style Guide*)
* **Hosting:** [Firebase App Hosting](https://firebase.google.com/docs/hosting/app-hosting) (`apphosting.yaml`)

---

## 3. Core Features ✨

* **SPA Layout:** Seluruh simulator disajikan dalam satu halaman *scrollable* yang mulus.
* **Interactive Charts:** Visualisasi *doughnut chart* (Chart.js) untuk alokasi *budget* dan *market share*.
* **Profit Calculator:** *Tool* simpel untuk menghitung estimasi profit berdasarkan Harga Jual & Harga Beli.
* **Strategy Lab Form:** Form inti untuk input skenario (Nama Skenario, Industri, Target Audiens, Alokasi Budget).
* **Scenario Results Display:** Menampilkan hasil skenario dalam tabel terstruktur dan visualisasi chart.
* **AI Recommendations:** Memberikan *insight* berbasis AI untuk optimasi strategi (misal: "Coba channel X", "Hentikan channel Y").
* **FAQ Section:** Komponen *accordion* untuk menjawab pertanyaan umum pengguna.

---

## 4. Style Guidelines 🎨

Desain aplikasi ini mengadopsi *feel* SaaS yang modern, bersih, dan profesional:

* **Background:** Very Light Gray (`#F9FAFB`)
* **Primary:** Bright Blue (`#3B82F6`)
* **Accent (CTA):** Dark Blue (`#1E40AF`)
* **Konten:** Menggunakan *cards* dengan sudut `rounded-xl` dan bayangan `shadow-md`.
* **Hero:** Dilengkapi ilustrasi *flat design* (truk di peta dengan pin lokasi).
* **Font:** 'Inter' (sans-serif) untuk semua teks UI dan *body*.

---

## 5. Installation

### Instalasi Awal
Untuk menjalankan proyek ini secara lokal, Anda perlu menyiapkan beberapa hal:

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/Fortotest/Ratakan.git](https://github.com/Fortotest/Ratakan.git)
    cd Ratakan
    ```

2.  **Install Dependensi Node.js**
    ```bash
    npm install
    ```
    
3.  **(Opsional) Setup Environment Variables**
    * Buat file `.env.local` di *root* proyek jika Anda perlu menambahkan API keys (misalnya untuk layanan AI).
    ```env
    # Contoh
    NEXT_PUBLIC_AI_SERVICE_KEY=YOUR_API_KEY_HERE
    ```

---

## 6. Running the App Locally 🚀

### Menjalankan Aplikasi di Lingkungan Lokal

1.  **Mulai Development Server**
    Di terminal Anda (di dalam direktori `Ratakan`), jalankan:
    ```bash
    npm run dev
    ```

2.  **Akses Frontend**
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat dan menggunakan simulator.

---

## 7. Usage

### Penggunaan Aplikasi
* **Isi Form:** Mulai dengan mengisi **"Strategy Lab Form"**. Masukkan nama skenario, industri, target audiens, dan geser alokasi *budget* Anda.
* **Hitung Profit:** Gunakan **"Profit Calculator"** untuk memasukkan estimasi harga jual dan harga beli produk Anda.
* **Lihat Hasil:** Perhatikan **"Scenario Results"** yang akan menampilkan proyeksi performa channel dalam bentuk tabel dan *doughnut chart*.
* **Dapatkan Insight:** Baca **"AI Recommendations"** yang dihasilkan berdasarkan data yang Anda masukkan.
* **Cek FAQ:** Jika ada pertanyaan, buka bagian **"FAQ Section"** di bagian bawah halaman.

---

## 8. Credits 👤

### Pembuat (Builder)
**Rizky Fadil (Fortotest)**
