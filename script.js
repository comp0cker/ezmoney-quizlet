var dictionary;
var dictionary_spanish;
var textarea;
$(document).ready(function(){

    jQuery.get('dictionary.txt', function(data) {
        dictionary = data.split("\n");
    });
    jQuery.get('spanish.txt', function(data) {
        dictionary_spanish = data.split("\n");
    });

});

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str) && strArray[j].indexOf(str) == 0) return j;
    }
    return -1;
}

function CallMethod() {
    textarea = $("#uh").val().split("\n");
    var defType = $("input[name='def']:checked").val();
    var langType = $("input[name='lang']:checked").val();

    for (var i = 0; i < textarea.length; i++) {
        var word = textarea[i].toUpperCase();
        //alert(word);
        if (langType == "eng") {
            var index = searchStringInArray(word, dictionary);

            if (index != -1) {

                var entry = "";
                var startIndex = index;

                while (1) // finding startIndex
                {
                    if (dictionary[startIndex].indexOf("Defn") >= 0)
                        break;

                    startIndex++;
                }

                var tempIndex = startIndex;

                while (1) {
                    //alert(dictionary[tempIndex]);
                    if (dictionary[tempIndex] == dictionary[tempIndex].toUpperCase()) {
                        if (defType == "all" && dictionary[tempIndex][1])
                            break;
                        else if (defType == "first")
                            break;
                    }

                    entry += dictionary[tempIndex];
                    tempIndex++;
                }

                //alert(entry);

                textarea[i] += '	' + entry.replace("Defn:", "");
            }
            else
                textarea[i] += '	no definition found :(';
        }
        else if (langType == "spa")
        {
            word = word.toLowerCase();
            //alert(word);
            var index = searchStringInArray(word, dictionary_spanish);

            if (index != -1)
                textarea[i] += '	' + dictionary_spanish[index].replace(word, "");
            else
                textarea[i] += '	no translation found :(';
        }

        //alert(entry);
    }

    //$("#uh").val('');
    $("#output").empty();

    for (var j = 0; j < textarea.length; j++) // outputting results
    {
        //$("#uh").val($("#uh").val() + textarea[j]);
        $("#output").append("<div>" + textarea[j] + "</div>");
        }

    alert("Set generated!");
}