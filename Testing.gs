function test() {
  test_data_();
  test_expand_();
  test_expandWithData_();  
}

function test_data_() {
  var info = data();
  MyAssert.ok(info, "The info was loaded, created");
  MyAssert.ok(Object.keys(info).length > 4, "The info has a 'name'");
  MyAssert.ok("email" in info, "The info has an 'email'");
  MyAssert.ok("userid" in info, "The info has an 'userid'");
}

function test_expandWithData_() {
  var info = data();
  MyAssert.equal(expandWithData("#{name}", info), info["name"], "The 'name' is used");
  MyAssert.equal(expandWithData("#{email}", info), info["email"], "The 'email' is used");
  MyAssert.equal(expandWithData("#{fname} #{userid} #{surname}", info), info["fname"] + " " + info["userid"] + " " + info["surname"], "The fields are used and combined");
  MyAssert.equal(expandWithData("#{userid} is for me", info), info["userid"] + " is for me", "The 'userid' is inserted with the other text");
  MyAssert.equal(expandWithData("#{test}", info), "#{test}", "The 'test' in not used");
}

function test_expand_() {
  var info = data();
  MyAssert.equal(expand("#{name}"), info["name"], "The 'name' is used");
  MyAssert.equal(expand("#{email}"), info["email"], "The 'email' is used");
}