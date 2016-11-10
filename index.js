var form = document.getElementById("myForm"),
    colorFields = form.elements["color"],
    colorFirst = colorFields[0];

alert(form.elements[0] === colorFirst);
alert(form.elements[0].nodeName);
