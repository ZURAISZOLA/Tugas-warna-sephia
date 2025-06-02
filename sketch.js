/*Tugas Pemrograman #2 - Grafkom
   1462300008 - Zurais AlQorni Zola Asmara Wipa */

let img;
let imgsepia, imgInvert, imgAqua;

function preload() {
  img = loadImage('people.jpg'); //Foto saya
}

function setup(){
  createCanvas(2000, 500);
  img.resize(500, 500);
  
  imgSepia = applySepia(img); //warna untuk image Sepia
  imgInvert = applyInvert(img); //warna untuk image Invert
  imgAqua = applyAqua(img); //warna untuk image Aqua
}

//koordinat tataletak pada gambar
function draw (){
background(0);
image(img, 0,0);
image(imgSepia, 500, 0);
image(imgInvert, 1000, 0);
image(imgAqua, 1500, 0);

//warna pada tulisan
fill(255);
textSize(40);
stroke(0);
strokeWeight(5); //saya tambahkan lapisan (Ketebalan) agar tulisan lebih jelas
  
text("ASLI", 170, 450);
text("SEPIA", 700, 450);
text("INVERT", 1200, 450);
text("AQUA", 1700, 450);
}


function applySepia(img) {
  let sepiaImg = createImage(img.width, img.height);
  img.loadPixels(); //untuk memuat pixel pada gambar
  sepiaImg.loadPixels(); //untuk memuat pixel pada rumus sepia
  
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

      // Rumus sepia
      let rSepia = r * 0.393 + g * 0.769 + b * 0.189;
      let gSepia = r * 0.349 + g * 0.686 + b * 0.168;
      let bSepia = r * 0.272 + g * 0.534 + b * 0.131;

      // Pastikan nilai sudah dalam rentang 0-255
      sepiaImg.pixels[i]     = constrain(rSepia, 0, 255);
      sepiaImg.pixels[i + 1] = constrain(gSepia, 0, 255);
      sepiaImg.pixels[i + 2] = constrain(bSepia, 0, 255);
      sepiaImg.pixels[i + 3] = img.pixels[i + 3];
  }

  sepiaImg.updatePixels();
  return sepiaImg;
}

function applyInvert(img) {
  let inv = createImage(img.width, img.height);
  inv.loadPixels();
  img.loadPixels();
  
  for (let i = 0; i < img.pixels.length; i += 4) {
    inv.pixels[i] = 255 - img.pixels[i];
    inv.pixels[i + 1] = 255 - img.pixels[i + 1];
    inv.pixels[i + 2] = 255 - img.pixels[i + 2];
    inv.pixels[i + 3] = 255;
  }
  inv.updatePixels();
  return inv;
}

function applyAqua(img) {
  let aqua = createImage(img.width, img.height);
  aqua.loadPixels();
  img.loadPixels();
  
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    // Kurangi merah, tambah biru & hijau
    let new_R = max(r - 40, 0);
    let new_G = min(g + 30, 255);
    let new_B = min(b + 50, 255);

    aqua.pixels[i]     = new_R;
    aqua.pixels[i + 1] = new_G;
    aqua.pixels[i + 2] = new_B;
    aqua.pixels[i + 3] = 255;
  }
  aqua.updatePixels();
  return aqua;
}

