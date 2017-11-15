exports.check = (path) => {
  var git = require("git-utils");
  //get ahead or behild count
  let gitdata = git.open(path).getAheadBehindCount("master");
  if (gitdata.behind >=1) {
    return true;
  } else {
    return false;
  }
};

exports.ask = () => {
  console.log("not implmented yet");
};


exports.Doupdate = () => {
  console.log("not implmented yet");
};
