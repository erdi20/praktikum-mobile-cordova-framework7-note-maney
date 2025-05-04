var routes = [
  {path: '/', componentUrl: 'pages/home.html'},
  {path: '/tentang/', url: 'pages/about.html'},
  {path: '/film/', componentUrl: 'pages/film.html'},
  {path: '/dfilm/', componentUrl: 'pages/detailfilm.html'},
  {path: '/tugas', componentUrl: 'pages/tugas.html'},
  {path: '/barcode', componentUrl: 'pages/barcode.html'},
  {path:'(.*)', url:'pages/404.html'}
]