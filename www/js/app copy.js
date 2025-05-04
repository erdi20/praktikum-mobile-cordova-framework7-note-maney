// Dom7
var $ = Dom7;

// Demo
const html = document.documentElement;
if (document.location.href.includes("safe-areas")) {
  if (html) {
    html.style.setProperty("--f7-safe-area-top", "44px");
    html.style.setProperty("--f7-safe-area-bottom", "34px");
  }
}
html.style.setProperty("--f7-navbar-height", "85px");
html.style.setProperty("--f7-fab-size", "80px");
html.style.setProperty("--f7-tabbar-link-active-icon-bg-color", "transparent");
if (document.location.href.includes("example-preview")) {
  $(".view-main").attr("data-browser-history", "true");
  $(".view-main").attr("data-browser-history-root", "/kitchen-sink/core/");
  $(".view-main").attr("data-preload-previous-page", "false");
  $(".view-main").attr("data-ios-swipe-back", "false");
  document.documentElement.classList.add("example-preview");
}

// Theme
var theme = "auto";
if (document.location.search.indexOf("theme=") >= 0) {
  theme = document.location.search.split("theme=")[1].split("&")[0];
}
if (document.location.search.indexOf("mode=") >= 0) {
  const mode = document.location.search.split("mode=")[1].split("&")[0];
  if (mode === "dark") document.documentElement.classList.add("dark");
}

// Init App
var app = new Framework7({
  el: "#app",
  theme,
  // store.js,
  store: store,
  // routes.js,
  routes: routes,
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  vi: {
    placementId: "pltd4o7ibb9rc653x14",
  },
  navbar: {
    mdCenterTitle: true,
    hideOnPageScroll: true,
    showOnPageScrollTop: true,
    showOnPageScrollEnd: false,
  },
});

let terjemahanHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let terjemahanBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
function sekarang() {
  let saatIni = new Date();
  let hr = terjemahanHari[saatIni.getDay()];
  let tgl = saatIni.getDate() <= 9 ? `0${saatIni.getDate()}` : saatIni.getDate();
  let bln = terjemahanBulan[saatIni.getMonth() + 1];
  let th = saatIni.getFullYear();
  let jm = saatIni.getHours() <= 9 ? `0${saatIni.getHours()}` : saatIni.getHours();
  let mn = saatIni.getMinutes() <= 9 ? `0${saatIni.getMinutes()}` : saatIni.getMinutes();
  let dt = saatIni.getSeconds() <= 9 ? `0${saatIni.getSeconds()}` : saatIni.getSeconds();
  return `${hr}, ${tgl} ${bln} ${th} <br> ${jm}:${mn}:${dt}`;
}
function tampilfilm() {
  let hasil = "";
  let x;
  for (x of datafilm) {
    let judul = x.judul;
    let aktor = x.pemain;
    let tahun = x.tahun;
    let rating = x.rating;
    let sinopsis = x.sinopsis;
    let sampul = x.cover;
    hasil += `<div class="card" style="background-color:transparent; " data-jd="${judul}" data-ak="${aktor}" data-th="${tahun}" data-rt="${rating}" data-sm="${sampul}" data-sp="${sinopsis}" onclick="filmdetail(this)">
    <div class="card-content">
    <img src="${sampul}" style="border-radius: 15px; width:100%;">
    </div>
    </div>`;
  }
  $("#blokfilm").html(hasil);
}
function filmdetail(el) {
  sessionStorage.setItem("judul", $(el).data("jd"));
  sessionStorage.setItem("aktor", $(el).data("ak"));
  sessionStorage.setItem("tahun", $(el).data("th"));
  sessionStorage.setItem("rating", $(el).data("rt"));
  sessionStorage.setItem("sampul", $(el).data("sm"));
  sessionStorage.setItem("sinopsis", $(el).data("sp"));
  app.views.main.router.navigate("/dfilm/");
}
function ubahkesuara(el) {
  let konten = $(el).data("sp");
  TTS.speak(
    konten,
    function () {
      console.log("Text To Speech Berhasil");
    },
    function (reason) {
      app.dialog.alert(reason, "Erroe");
    }
  );
}


// barcode
// Pastikan kode ini dijalankan setelah event 'deviceready' terjadi
document.addEventListener('deviceready', function() {
  // Fungsi untuk memanggil barcode scanner
  function scanBarcode() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        // Fungsi yang akan dijalankan jika pemindaian berhasil
        console.log("Barcode result: " + result.text);
        console.log("Barcode format: " + result.format);
        console.log("Scan cancelled: " + result.cancelled);

        // Di sini kamu bisa melakukan sesuatu dengan hasil pemindaian
        // Misalnya, menampilkan hasilnya di UI atau menggunakannya untuk membuat URL Midtrans

        app.dialog.alert(
          `Hasil Pemindaian:<br>
          Teks: ${result.text}<br>
          Format: ${result.format}<br>
          Dibatalkan: ${result.cancelled}`,
          'Hasil Barcode'
        );

        // Contoh jika kamu ingin langsung mengarahkan ke URL Midtrans
        // if (!result.cancelled && result.text) {
        //   window.open(result.text, '_system'); // Membuka di browser sistem
        //   // Atau menggunakan plugin inappbrowser:
        //   // cordova.InAppBrowser.open(result.text, '_blank', 'location=yes');
        // }
      },
      function (error) {
        // Fungsi yang akan dijalankan jika terjadi error saat pemindaian
        console.error("Scanning failed: " + error);
        app.dialog.alert(`Pemindaian gagal: ${error}`, 'Error');
      },
      {
        preferFrontCamera : false, // Lebih baik gunakan kamera belakang untuk pemindaian
        showFlipCameraButton : true,
        showTorchButton : true,
        torchOn: false,
        saveHistory: false,
        prompt : "Arahkan kamera ke barcode",
        resultDisplayDuration: 0, // Jangan tampilkan teks hasil secara otomatis
        formats : "QR_CODE,EAN_13", // Sesuaikan dengan format barcode yang kamu gunakan
        orientation : "", // Biarkan berotasi sesuai perangkat
        disableAnimations : true,
        disableSuccessBeep: false
      }
    );
  }

  // Contoh cara memanggil fungsi scanBarcode() ketika sebuah tombol diklik
  document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('scan-barcode-button')) {
      scanBarcode();
    }
  });
});