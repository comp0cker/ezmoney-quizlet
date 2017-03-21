var dictionary;
var textarea;
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
    textarea = $("#uh").val().split("\n");

    for (var i = 0; i < textarea.length; i++) {
        var word = textarea[i].toUpperCase();
        //alert(word);
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
                if (dictionary[tempIndex] == dictionary[tempIndex].toUpperCase())
                    break;

                entry += dictionary[tempIndex];
                tempIndex++;
            }

            //alert(entry);

            textarea[i] += '	' + entry.replace("Defn:", "");
        }
        else
            textarea[i] += '	no definition found :(';

        //alert(entry);
    }

    //$("#uh").val('');
    $("#output").empty();

    for (var j = 0; j < textarea.length; j++)
    {
        //$("#uh").val($("#uh").val() + textarea[j]);
        $("#output").append("<div>" + textarea[j] + "</div>");
        }

    alert("Set generated!");
}