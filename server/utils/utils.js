
var imageLooper = () => {
  for (let i = 0, p = Promise.resolve(); i < 5; i++) {
    p = p.then(() => new Promise((resolve, reject) => {

    }));
    fun.push(p);
  }
  return Promise.all(fun);
};

var funIO = (io) => {
  io.on('connection', (socket) => {
    socket.on('file1event', () => {
      console.log('file1event triggered');
    });
  });
  console.log('something happened');
};

module.exports = {
  imageLooper,
  funIO
};
