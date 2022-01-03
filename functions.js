const md = markdownit({html:true})
                      .use(texmath, { engine: katex,
                                      delimiters: 'dollars',
                                      katexOptions: { macros: {"\\RR": "\\mathbb{R}"} } });

function timestamp(s) {
  var date = '' + s.slice(0,4) + '-' + s.slice(4,6) + '-' + s.slice(6,8);
  var time = '' + s.slice(8,10) + ':' + s.slice(10,12);
  return date + ' ' + time;
}

function renderTags(tags) {
  return tags.map(x => `<button onclick="tagQuery('${x}')">#${x}</button>`).join("");
}

function styleQuery(x) {
  var result = '';
  for (el of x) {
    result += `<div><b>` + timestamp(el._id) + `</b> <span style="color: darkslategray">[` + el._id.slice(-3) + `]</span> ` + renderTags(el.tags) + md.render(el.text) + `</div>
`;
  }
  return result;
}

function typeQuery(t) {
  db.find({
    selector: {type: t}
  }).then(function(x) {
    document.getElementById("content").innerHTML = styleQuery(x.docs)
  });
}

function tagQuery(t) {
  db.find({
    selector: {"tags": {"$elemMatch": t}}
  }).then(function(x) {
    document.getElementById("content").innerHTML = styleQuery(x.docs)
  }).catch(err => console.log("Error"));
}

function convertLine(s) {
  var ind = s.indexOf(":");
  if (ind < 1) {
    return [];
  } else {
    return [s.slice(0, ind), s.slice(ind+1)];
  }
}

//~ Parse the content and convert it to JSON

//~ Split into documents
var userdata = "\n" + document.getElementById("data").value;

//~ Drop the first, since it's always empty
var elements = userdata.split("\n===\n").slice(1);

//~ split the top (metadata) into lines
//~ The bottom is a chunk of markdown text if it exists
var result = [];
for (el of elements) {
  var ind = el.indexOf("\n---\n");
  if (ind > 0) {
    //~ Strategy: Create an object holding the document data
    //~ Then let JS turn it into a JS object
    //~ Then load them all into the database at once
    var obj = new Object();
    obj['tags'] = ["notags"];
    for (line of el.slice(0, ind).split("\n")) {
      var metadata = convertLine(line);
      if (metadata.length == 2) {
        var n = metadata[0].trim();
        var v = metadata[1].trim();
        if (n === "tags") {
          if (v.length > 0) {
            obj['tags'] = v.split(",").map(x => x.trim());
          }
        } else {
          obj[n] = v;
        }
      }
    }
    obj['text'] = el.slice(ind+5).trim();
    result.push(JSON.parse(JSON.stringify(obj)));
  }
}
console.log(result);
var db = new PouchDB('testdb', {adapter: 'memory'});
db.bulkDocs(result);
db.info().then(x => console.log(x));
typeQuery("note");
//~ document.getElementById("content").style.border = "2px solid green"; 
