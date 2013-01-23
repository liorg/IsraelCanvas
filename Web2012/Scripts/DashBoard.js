var dropBox;
var drag;
var dragClone;
var dragElement;
var c_drop = ".drop";

$(document).on('keypress', '.advertisment-size', function (e) {
    return e.which != 13;
});

function getAdvertisementById(id) {
    var row = jQuery.grep(context.Advertisements, function (n, i) {
        return (n.Id == id);
    });
    return row[0];
}

function setTemplateImage(base64Image, IsLandscape) {
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
function setToolbarData() {
    $.each(context.Advertisements, function (index, advertisement) {
        drag.append('<li class="MenuItem" style="height:' + advertisement.Height + ';width:' + advertisement.Width + ';"><span id=' + advertisement.Id + '>' + advertisement.Name + '</span></li>');
    });
}
function setImageTemplate() {
    setTemplateImage(context.UriTemplate, context.IsLandscape);
}
function setToolboxUi() {
    $("#tabs").tabs();
    // fix the classes
    $(".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *")
      .removeClass("ui-corner-all ui-corner-top")
      .addClass("ui-corner-bottom");
    // move the nav to the bottom
    $(".tabs-bottom .ui-tabs-nav").appendTo(".tabs-bottom");
}
function loadAjax() {
    $.ajax({
        type: "POST",
        url: "MockData.ashx?id=2b841240-eef8-43ec-ad0b-ef812238c8af",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        success: function (data, status) {
            context = data;
            setToolbarData();
            registerElementEvents();
            setImageTemplate();
        },
        error: ajaxFailed
    });
}
function setGlobalVar() {
    dropBox = $('.drop'); drag = $('#drag');
}
function registerElementEvents() {
    var maxChar = 7;
    $('.advertisment-size').live("keyup", function () { checkCharcount($(this), maxChar); });
    $('.advertisment-size').live("keydown", function () { checkCharcount($(this), maxChar); });
    $('.advertisment-size').live("dblclick", function () { $(this).selectText(); });

    $('#drag li').draggable({
        revert: "invalid",
        appendTo: c_drop,
        containment: c_drop,
        scroll: false,
        helper: 'clone',
        cursorAt: { bottom: 0 },
        start: function (event, ui) {
            dragClone = $(this).clone();
            dragElement = $(this);
        },
        stop: function (event, ui) {
            var w=$(c_drop).outerWidth();
    }
    });

    dropBox.droppable({
        accept: "#drag li, .ui-widget-content",
        scroll: true,
        refreshPositions: true,
        drop: function (event, ui) {
            var currPoint = getCurrentPointOnScreen(this, event, ui);
            var row = getAdvertisementById(dragClone.find('span').attr('id'));
            row.Top = currPoint.top;
            row.Left =currPoint.left;

            if (ui.draggable.hasClass("myWidget")) {
                return true;
            }
            editAdvertismentOnIssue(this, dragClone, row, currPoint);
            dragElement.remove();
            return true;
        }
    });
}
function checkCharcount(content, max) {
    if (content.text().length > max) {
        content.text(content.text().substring(0, max));
    }
}
function getCurrentPointOnScreen(issue, event, ui) {
    var eWidth = ui.draggable.outerWidth();
    var eHeight = ui.draggable.outerHeight();
    var x = event.pageX - $(issue).offset().left - (eWidth / 2);
    var y = event.pageY - $(issue).offset().top - (eHeight / 2);

    var left = x>0?x:0 + "px";
    var top = y>0?y:0 + "px";
    return { top: top, left: left };
}

function editAdvertismentOnIssue(issue, dragClone, currentRow, currPoint) {
    dragClone = dragClone.replaceWith("<div data-title='" + dragClone.text() + "'  class='ui-draggable'><span id='" + dragClone.find("span").attr('id') + "'><span   class='advertisment-title'>" + dragClone.text() + "</span><br><span contenteditable='true'   class='advertisment-size'>" + currentRow.Size + "</span></div>");
    dragClone.addClass("ui-widget-content").addClass("myWidget");
    dragClone.css({
        position: 'absolute',
        left: currPoint.left,
        top: currPoint.top
    });
    dragClone.qtip({
        content: currentRow.Name + " <br/>" + currentRow.Size,
        show: 'mouseover',
        hide: 'mouseout'
    })
    dragClone.draggable(
        {
            containment: '.drop', cursor: "move", scroll: false,
        }).bind('click', function () {
            // var advertismentSize = $(this).find(".advertisment-size").focus(); 
        }
        ).resizable({
            containment: c_drop,
            
            stop: function (event, ui) {
                ui.originalElement;
                ui.element;
                var title = $(this).find('span.advertisment-title');
                var row = getAdvertisementById($(this).find('span').attr('id'));

                if (row.MaxFontSizeUi == undefined) {
                    row.MaxFontSizeUi = row.MaxSizeName.rect();
                }
                else if(row.MaxFontSizeUi.Width==0 && row.MaxFontSizeUi.Height==0){
                    var size= row.MaxSizeName.rect();
                    row.MaxFontSizeUi.Width = size.Width;
                    row.MaxFontSizeUi.Height = size.Height;
                }
                if (row.MaxFontSizeUi.Width > $(this).outerWidth()) {
                    //  title.text(row.NameShortcut + "...");
                    title.text( "...");
                }
                else if (row.MaxFontSizeUi.Height > $(this).outerHeight()) {
                    //  title.text(row.NameShortcut + "...");
                    title.text( "...");
                }
                else {
                    title.text(row.Name);
                }
                title.focus();
                row.Width = $(this).outerWidth();
                row.Height = $(this).outerHeight();
            }
        });
    dragClone.appendTo(issue);
}

jQuery.fn.selectText = function () {
    var range, selection;
    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(this[0]);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(this[0]);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

String.prototype.rect = function (font) {
    var f = font || '11px Tahoma, Arial',
        o = $('<span>' + this + '</span>')
              .css({ 'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f })
              .appendTo($('body')),
        w = o.width();
        h = o.height();
    o.remove();

    return {Width:w,Height:h};
}

