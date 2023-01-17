const mongoose = require("mongoose");
const schema = require("./schema");

const db = mongoose.connection;
const model = (() => {
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting mongodb!");
  });

  // 몽고디비 앱 엑세스 주소
  // mongoose.connect(
  //   `mongodb+srv://id:pw@blindcluster.3jgusdb.mongodb.net/?retryWrites=true&w=majority`,
  //   // { useCreateIndex: true, useNewUrlParser : true , useUnifiedTopology: true , useFindAndModify: true}
  // )

  // 몽고디비 앱 엑세스 주소
  // 에러나서 아래처럼 변경해주어야함
  mongoose
    .set('strictQuery', true)
    .connect("mongodb+srv://anfwksel1229:dnpfzlrhrh123@blind.pxposnu.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("연결완료")) //연결잘되면
    .catch((err) => console.log("연결실패", err)); //연결안되면

  // const connect = () => {
  //   mongoose
  //   .connect("mongodb+srv://id:pw@blind.pxposnu.mongodb.net/?retryWrites=true&w=majority")
  //   .then(() => console.log("연결성공"))   //연결잘되면
  //   .catch((err) => console.log(err));     //연결안되면
  // };

  // 스키마 연결
  const model = {};
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }
  return model;
})();

module.exports = model;
