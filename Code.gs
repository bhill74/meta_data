/**
 * Replaces any known keyword with the corresponding meta data equivalent
 *
 * @param {string} the input string to parse for keywords
 * @param {object} the dictionary of fields to insert
 * @return {string} the resulting output string
 */
function expandWithData(input, info) {
  return input.replace(/\#\{(\w+)\}/g, function(tag, name, offset, string) {
    return (name in info) ? info[name] : tag;
  });
}

/**
 * Replaces any known keyword with the corresponding meta data equivalent
 *
 * @param {string} the input string to parse for keywords
 * @return {string} the resulting output string
 */
function expand(input) {
  return expandWithData(input, data());
}

/**
 * Retrives and/or derives the information for the current user
 *
 * @return {object} an object containing all the info for the current user
 */
function data() {
  var config = LoadJSON.loadByPath("config");
  var info = (config && "user" in config) ? config["user"] : {}
  if (!("email" in info)) {
    info["email"] = Session.getActiveUser().getEmail();
  }
  var comp = info["email"].split('@');
  if (!("domain" in info)) {
    info["domain"] = comp[1];
  }
  
  var identity = comp[0];
  if (!("name" in info)) {
    info["name"] = identity.replace('.',' ').replace(/\w+/g, function(x) {
      return x.replace(/^\w/, function(y) {
        return y.toUpperCase();
      });
    });
  }
  
  var names = info["name"].split(/ /);
  if (!("fname" in info)) {
    info["fname"] = names[0];
  }
  
  if (!("surname" in info)) {
    info["surname"] = names[names.length-1];
  }
  
  if (!("userid" in info)) {
    info["userid"] = identity.replace(/^(\w)\w*\./, '$1').substring(0,8);
  }
  
  info["uemail"] = info["userid"] + '@' + info["domain"];
  return info;
}