// Preprocessing for OpenAPI specification

fetch = require("node-fetch");

fetch(process.argv[2]).then(async (res) => {
  const spec = await res.json();
  for (const [_, pathData] of Object.entries(spec.paths)) {
    for (const [_, opPathData] of Object.entries(pathData)) {
      // Remove path operation tags to avoid seperate '*Service' classes
      opPathData.tags = [];
    }
  }
  console.log(JSON.stringify(spec, null, 2));
});
