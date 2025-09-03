const QRCode = require('qrcode');

async function generateQRCode(text) {
    const base64 = await QRCode.toDataURL(text);
    console.log(base64);
    return base64;
  
}

generateQRCode("{name:'Ravi Sharma',branch:'ECE',section:'B',id:102}");
