var dictionary;
$(document).ready(function(){

    jQuery.get('dictionary.txt', function(data) {
        dictionary = data.split("\n");
    });

});

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str) && strArray[j].indexOf(str) == 0) return j;
    }
    return -1;
}

function CallMethod() {

    var word = "RESOLUTION";
    var index = searchStringInArray(word, dictionary);

    var entry = "";
    var startIndex = index;

    while (1) // finding startIndex
    {
        if (dictionary[startIndex].indexOf("1.") >= 0 || dictionary[startIndex].indexOf("Def") >= 0)
            break;

        startIndex++;
    }

    var tempIndex = startIndex;

    while (1)
    {
        if (dictionary[tempIndex] == dictionary[tempIndex].toUpperCase())
            break;

        entry += dictionary[tempIndex];
        tempIndex++;
    }
}