exports.check = (path) => {
  let simplegitpath = path;
  require("simple-git")(simplegitpath).fetch("remote");
  require("simple-git")(simplegitpath).fetch("remote");
  var git = require("git-utils");
  //get ahead or behild count
  let repo = git.open(path);
  let gitdata = repo.getAheadBehindCount("master");
  if (gitdata.behind >=1) {
    return true;
  } else {
    return false;
  }
};

exports.ask = () => {
  console.log("not implmented yet");
  return;
};


exports.Doupdate = (path) => {
  console.log("not implmented yet");

};
