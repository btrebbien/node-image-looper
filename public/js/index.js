// opens socket connection to server
var socket = io();

// default event
socket.on('connect', function () {
  console.log('Connected to the server.');
  socket.emit('startImageLoop', {
    "name": "Test"
  });
});

socket.on('updateImage', function(img, msg) {
  //document.getElementById("image").src = "";
  //document.getElementById("int50table").innerHTML = "";
  var blob = new Blob([img.buffer], {type: 'image/png'} );
  var url = URL.createObjectURL(blob);
  document.getElementById("image").src = url;
  if (msg.object === "olpn") {
    document.getElementById("int50table").innerHTML =
    "<thead class=\"thead-dark\">" +
      "<tr>" +
        "<th>BarcodeAttribute</th>" +
        "<th>Value</th>" +
      "</tr>" +
    "</thead>" +
    "<tbody>" +
      "<tr>" +
        "<td>oLPN</td>" +
        "<td>" + msg.olpnLast4 + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Bin</td>" +
        "<td>" + msg.bin + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Distribution Order</td>" +
        "<td>" + msg.distributionOrder + "</td>" +
      "</tr>" +
    "</tbody>";
    document.getElementById("detailCounter").innerHTML = "Details Completed: " +
      msg.currTaskDtl + "/" + msg.totalTaskDtl + "      Barcodes Scanned: " +
      msg.barcodeSequence + "/" + msg.totalBarcodes;
  } else if (msg.object === "location") {
    document.getElementById("int50table").innerHTML =
    "<thead  class=\"thead-dark\">" +
      "<tr>" +
        "<th>BarcodeAttribute</th>" +
        "<th>Value</th>" +
      "</tr>" +
    "</thead>" +
    "<tbody>" +
      "<tr>" +
        "<td>Location</td>" +
        "<td>" + msg.displayLocation + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Previous Pick Seq</td>" +
        "<td>" + msg.pickSequencePrevious + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Current Pick Seq</td>" +
        "<td>" + msg.pickSequenceCurrent + "</td>" +
      "</tr>" +
    "</tbody>";
    document.getElementById("detailCounter").innerHTML = "Details Completed: " +
      msg.currTaskDtl + "/" + msg.totalTaskDtl + "      Barcodes Scanned: " +
      msg.barcodeSequence + "/" + msg.totalBarcodes;
  } else if (msg.object === "item") {
    document.getElementById("int50table").innerHTML =
    "<thead class=\"thead-dark\">" +
      "<tr>" +
        "<th>BarcodeAttribute</th>" +
        "<th>Value</th>" +
      "</tr>" +
    "</thead>" +
    "<tbody>" +
      "<tr>" +
        "<td>Serial Number</td>" +
        "<td>" + msg.serial + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>LOT</td>" +
        "<td>" + msg.lot + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Expiration</td>" +
        "<td>" + msg.expiry + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>NDC</td>" +
        "<td>" + msg.ndc + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>oLPN</td>" +
        "<td>" + msg.olpnLast4 + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Bin</td>" +
        "<td>" + msg.bin + "</td>" +
      "</tr>" +
    "</tbody>";
    document.getElementById("detailCounter").innerHTML = "Details Completed: " +
      msg.currTaskDtl + "/" + msg.totalTaskDtl + "      Barcodes Scanned: " +
      msg.barcodeSequence + "/" + msg.totalBarcodes;
  }
});

// default event
socket.on('disconnect', function () {
  console.log('Disconnected from the server.');
});

// custom event listener for new Messages
socket.emit('file1event', {
  "name": "Test"
});
