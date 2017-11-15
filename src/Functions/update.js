exports.check = (path) => {
  require("simple-git")(path).fetch("remote").exec(console.log("checking for updates!"));
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
};


exports.Doupdate = () => {
  console.log("not implmented yet");
};
