const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const fs = require('fs');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
// pass express into http server setup
var server = http.createServer(app);
// websocket server created to emit and listen to events
var io = socketIO(server);

//var util = require('./utils/utils.js').funIO(io);


// configure express middleware (holds html so keep below maintenance)
app.use(express.static(publicPath));

app.get('/', function(req,res) {
  res.sendFile(path.join(publicPath + '/html/index.html'));
});

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('startImageLoop', (start) => {
    console.log(`startImageLoop: ${start}`);
    var totalBarcodes = 12;
    var interval = 2000;
    var rows = [{
      file: 'code128-OLPN0000000000000001.png',
      object: 'olpn',
      olpnLast4: '0001',
      bin: 'A1',
      distributionOrder: '2000001000',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      ndc: '',
      serial: '',
      lot: '',
      expiry: '',
      currTaskDtl: '1',
      totalTaskDtl: '2',
      barcodeSequence: '1',
      totalBarcodes: totalBarcodes
    }, {
      file: 'code128-AA100AA1015.png',
      object: 'location',
      olpnLast4: '',
      bin: '',
      distributionOrder: '',
      displayLocation: 'AA-100-AA-1-05',
      pickSequencePrevious: '5000',
      pickSequenceCurrent: '5500',
      ndc: '',
      serial: '',
      lot: '',
      expiry: '',
      currTaskDtl: '1',
      totalTaskDtl: '2',
      barcodeSequence: '2',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1-128--01-95012345678903-21-Item1Serial1.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1234567890',
      serial: 'Item1Serial1',
      lot: 'MyFavLot',
      expiry: 'Dec 31 2020',
      olpnLast4: '0001',
      bin: 'A1',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '1',
      totalTaskDtl: '2',
      barcodeSequence: '3',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1-128--01-95012345678903-21-Item1Serial2.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1234567890',
      serial: 'Item1Serial2',
      lot: 'MyFavLot',
      expiry: 'Dec 31 2020',
      olpnLast4: '0001',
      bin: 'A1',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '1',
      totalTaskDtl: '2',
      barcodeSequence: '4',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1-128--01-95012345678903-21-Item1Serial3.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1234567890',
      serial: 'Item1Serial3',
      lot: 'MyNotSoFavLot',
      expiry: 'Nov 30 2019',
      olpnLast4: '0001',
      bin: 'A1',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '1',
      totalTaskDtl: '2',
      barcodeSequence: '5',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1-128--01-95012345678903-21-Item1Serial4.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1234567890',
      serial: 'Item1Serial4',
      lot: 'MyNotSoFavLot',
      expiry: 'Nov 30 2019',
      olpnLast4: '0001',
      bin: 'A1',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '1',
      totalTaskDtl: '2',
      barcodeSequence: '6',
      totalBarcodes: totalBarcodes
    }, {
      file: 'code128-OLPN0000000000000002.png',
      object: 'olpn',
      olpnLast4: '0200',
      bin: 'B2',
      distributionOrder: '2000007000',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      ndc: '',
      serial: '',
      lot: '',
      expiry: '',
      currTaskDtl: '2',
      totalTaskDtl: '2',
      barcodeSequence: '7',
      totalBarcodes: totalBarcodes
    }, {
      file: 'code128-AA200AA2024.png',
      object: 'location',
      olpnLast4: '',
      bin: '',
      distributionOrder: '',
      displayLocation: 'AA-200-AA-2-02',
      pickSequencePrevious: '5500',
      pickSequenceCurrent: '7000',
      ndc: '',
      serial: '',
      lot: '',
      expiry: '',
      currTaskDtl: '2',
      totalTaskDtl: '2',
      barcodeSequence: '8',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1datamatrix--01-03415151524241-17-190731-10-LOTA-21-DifferentOne.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1515152424',
      serial: 'DifferentOne',
      lot: 'LOTA',
      expiry: 'Jul 31 2019',
      olpnLast4: '0200',
      bin: 'B2',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '2',
      totalTaskDtl: '2',
      barcodeSequence: '9',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1datamatrix--01-03415151524241-17-190731-10-LOTA-21-DifferentTwo.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1515152424',
      serial: 'DifferentTwo',
      lot: 'LOTA',
      expiry: 'Jul 31 2019',
      olpnLast4: '0200',
      bin: 'B2',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '2',
      totalTaskDtl: '2',
      barcodeSequence: '10',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1datamatrix--01-03415151524241-17-190731-10-LOTA-21-DifferentThree.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1515152424',
      serial: 'DifferentThree',
      lot: 'LOTA',
      expiry: 'Jul 31 2019',
      olpnLast4: '0200',
      bin: 'B2',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '2',
      totalTaskDtl: '2',
      barcodeSequence: '11',
      totalBarcodes: totalBarcodes
    }, {
      file: 'gs1datamatrix--01-03415151524241-17-190731-10-LOTA-21-DifferentFour.png',
      object: 'item',
      barcodeHuman: '',
      ndc: '1515152424',
      serial: 'DifferentFour',
      lot: 'LOTA',
      expiry: 'Jul 31 2019',
      olpnLast4: '0200',
      bin: 'B2',
      distributionOrder: '',
      displayLocation: '',
      pickSequencePrevious: '',
      pickSequenceCurrent: '',
      currTaskDtl: '2',
      totalTaskDtl: '2',
      barcodeSequence: '12',
      totalBarcodes: totalBarcodes
    }];

    for (let i = 0, p = Promise.resolve(); i < totalBarcodes; i++) {
      p = p.then(() => new Promise((resolve, reject) => {
        fs.readFile(`/usr/src/app/server/images/${rows[i].file}`, (err, data) => {
          if (err) throw err;
          socket.emit('updateImage',
            {
              image: true,
              buffer: data
            },{
              object: rows[i].object,
              olpnLast4: rows[i].olpnLast4,
              bin: rows[i].bin,
              distributionOrder: rows[i].distributionOrder,
              displayLocation: rows[i].displayLocation,
              pickSequencePrevious: rows[i].pickSequencePrevious,
              pickSequenceCurrent: rows[i].pickSequenceCurrent,
              ndc: rows[i].ndc,
              serial: rows[i].serial,
              lot: rows[i].lot,
              expiry: rows[i].expiry,
              currTaskDtl: rows[i].currTaskDtl,
              totalTaskDtl: rows[i].totalTaskDtl,
              barcodeSequence: rows[i].barcodeSequence,
              totalBarcodes: rows[i].totalBarcodes
            }
          );
          setTimeout(() => {
            resolve(`finished ${i}.`);
          }, interval);
        });
      }));
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});

// binds app to a port
server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
