// export const linkDB = "http://localhost:3030";
export const linkDB = "https://enchanting-jade-garb.cyclic.app/";

export const genKey = () => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

var date = new Date();
export var saveCurrentDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
export var saveCurrentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
export var dateKey = saveCurrentDate + "," + saveCurrentTime;
