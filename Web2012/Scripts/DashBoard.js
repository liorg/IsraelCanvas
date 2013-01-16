var dropBox;
var drag;
var dragClone;
var dragElement;

var c_drop = ".drop";
//var AdvertisementWidth = "100px";
//var AdvertisementHeight = "20px";

function getAdvertisementById(id) {
    var row = jQuery.grep(context.Advertisements, function (n, i) {
        return (n.Id == id);
    });
    return row[0];
}

function setTempalateImageOld(base64Image, IsLandscape) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; i++) {
        var rules = ss[i].cssRules || ss[i].rules;
        var url = "url(data:image/png;base64," + base64Image + "=);";
        for (var j = 0; j < rules.length; j++) {
            if (rules[j].selectorText == "div.Issue") {
                rules[j].style.backgroundImage = url;
                // IsLandscape= width: 297mm;, height: 210mm;
                if (!IsLandscape) {
                    rules[j].style.width = "210mm";
                    rules[j].style.height = "297mm";
                }
            }
        }
    }
}
function setTempalateImage(base64Image, IsLandscape) {

    var url = "url(data:image/png;base64," + base64Image + "=);";
    var ele = $("div.Issue")[0];
    ele.style.backgroundImage = url;

    if (!IsLandscape) {
        ele.style.width = "210mm";
        ele.style.height = "297mm";
    }

}
function ajaxFailed(xmlRequest) {
    alert(xmlRequest.status + ' \n\r ' +
          xmlRequest.statusText + '\n\r' +
          xmlRequest.responseText);
}
function setToolbar() {
    $.each(context.Advertisements, function (index, advertisement) {
        drag.append('<li  class="MenuItem" style="height:' + advertisement.Height + ';width:' + advertisement.Width + ';"><span id=' + advertisement.Id + '>' + advertisement.Name + '</span></li>');
    });
}
function setImageTemplate() {
    setTempalateImage(context.UriTemplate, context.IsLandscape);
}
function loadElementEvents() {

    $('#drag li').draggable({
        revert: "invalid",
        appendTo: c_drop,
        containment: c_drop,
        scroll: false,
        // handle: "span",
        helper: 'clone',
        cursorAt: { bottom: 0 },
        start: function () {
            // $(this).hide();
            dragClone = $(this).clone();
            dragElement = $(this);
        },
        stop: function () {
            // $(this).show()
        }
    });


    var zIndex = 5000;
    dropBox.droppable({
        accept: "#drag li, .ui-widget-content",
        scroll: true,
        refreshPositions: true,
        drop: function (event, ui) {
            var eWidth = ui.draggable.outerWidth();
            var eHeight = ui.draggable.outerHeight();
            var x = event.pageX - $(this).offset().left - (eWidth / 2);
            var y = event.pageY - $(this).offset().top - (eHeight / 2);

            var left = x + "px";
            var top = y + "px";
            if (ui.draggable.hasClass("myWidget")) {
                var row = getAdvertisementById(dragClone.find('span').attr('id'));
                row.Top = top;
                row.Left = left;
                return true;
            }

           
         
            var row = getAdvertisementById(dragClone.find('span').attr('id'));
            row.Top = top;
            row.Left = left;
            dragClone = dragClone.replaceWith("<div class='ui-draggable'><span id='" + dragClone.find("span").attr('id') + "'><span  class='advertisment-title'>" + dragClone.text() + "</span><br><br><span class='advertisment-size'>" + row.Size + "</span></div>");
            dragClone.addClass("ui-widget-content").addClass("myWidget");
            dragClone.css({
                position: 'absolute',
                left: left,
                top: top
            });
            dragClone.draggable(
                {
                    containment: '.drop', cursor: "move",
                });

            dragClone.resizable({
                containment: '.drop',
                // appendTo: '.drop',
                stop: function (event, ui) {
                    var row = getAdvertisementById($(this).find('span').attr('id'));
                    row.Width = $(this).outerWidth();
                    row.Height = $(this).outerHeight();
                }
            });

            dragClone.appendTo(this);
            dragElement.remove();
            return true;
        }
    });
}