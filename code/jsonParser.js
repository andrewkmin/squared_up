var jsonFile = require('./incidents.json');

var ISSUES = {
    "phone support": 0,
    "cash": 0,
    "performance issues": 0,
    "dashboard": 0,
    "point of sale": 0,
    "payroll": 0,
    "instant deposit": 0,
    "reporting": 0,
    "other": 0
}

// alias
var monthObjects = jsonFile;

Object.entries(monthObjects).forEach((entry) => {
    // extract month and related content from mapping
    const [month, content] = entry;

    for (var i = 0; i < content.length; i++) {
        // standardize text
        let text = content[i].title.toLowerCase();

        var found = false;
        Object.entries(ISSUES).forEach((issue) => {
            const [topic, count] = issue;
            if (text.includes(topic)) {
                found = true;
                ISSUES[topic] += 1;
            }
        });

        // catch-all for incidents that didn't correspond to included topics
        if (!found) {
            console.log(text)
            ISSUES["other"] += 1;
        }
    }
});

// print out updated object with correct counts
console.log(ISSUES);