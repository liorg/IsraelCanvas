function setTempalateImage(base64Image) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; i++) {
        var rules = ss[i].cssRules || ss[i].rules;
        var url = "url(data:image/png;base64," + base64Image+"";
        for (var j = 0; j < rules.length; j++) {
            if (rules[j].selectorText == "div.Issue") {
                rules[j].style.backgroundImage = url;
            }
        }
    }
}