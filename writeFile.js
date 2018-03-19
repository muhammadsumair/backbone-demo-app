var fs = require("fs");
var sampleArray = [];
for(var i = 0; i < 200000; i++) {
    sampleArray.push({
        "id": "" + i,
        "name": "Waqas Ahmed",
        "title": "Project manager"
    })
}

fs.writeFile("./public/json/sample.json", JSON.stringify(sampleArray), function(err) {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});