var uploadHandler = "mockUpload.ashx";
var downloadHandler = "MockData.ashx";
var preview="Preview.htm";
var dropBox;
var drag;
var dragClone;
var dragElement;
var elementCopy;
var currentId;
var context;
var advertisementSize = { Height: 10, Width: 20 };

var ctrlDown = false;
var ctrlKey = 17, vKey = 86, cKey = 67; var deleteKey = 46; var savkey = 83;

var c_copy_table_btn = "copy-table-btn";
var c_paste_table_btn = "paste-table-btn";
var c_del_table_btn = "del-table-btn";
var c_save_table_btn = "save-table-btn";
var c_prev_table_btn = "prev-table-btn";
var c_del_red_table_btn = "del-red-table-btn";
var c_destroy = "destroy";
var c_invalid = "invalid";
var c_disabled = "disabled";
var c_clone = "clone";
var c_focusObject = "focus-object";
var c_deleted_advertisement = "deleted-advertisement";

var c_jquery_id = "#";
var c_jquery_class = ".";

var c_portrait_width = "210mm";
var c_portrait_height = "297mm";

var c_issue = "Issue";
var c_dropable = "drop";
var c_dragable = "drag";
var c_blur="blur";

var c_AdvertisingSpace = "myWidget";
var c_advertisment_id = "advertisment-id";
var c_advertisment_size = "advertisment-size";
var c_advertisment_title = "advertisment-title";

var c_keyup = "keyup";
var c_dblclick = "dblclick";
var c_keypress = "keypress";
var c_keydown = "keydown";
var c_mouseover = "mouseover";
var c_mouseout = "mouseout";
var c_mousedown = "mousedown";

var c_ui_widget_content = "ui-widget-content";

var c_absolute = "absolute";
var c_px = "px";
var c_id = "id";
var c_issueid = "id";
var c_span = "span";
var c_li = "li";
var c_div = "div";

var c_drop = c_jquery_class + c_dropable;
var c_drag = c_jquery_id + c_dragable;
var c_AdvertisingSpace_className = c_jquery_class + c_AdvertisingSpace;
var c_advertisment_id_className = c_jquery_class + c_advertisment_id;
var c_advertisment_size_className = c_jquery_class + c_advertisment_size;
var c_advertisment_title_className = c_jquery_class + c_advertisment_title;
var c_deleted_advertisement_className = c_jquery_class + c_deleted_advertisement;
var c_issue_className = c_jquery_class + c_issue;
var c_hidefirma = "hd";

var onfocusOnSizeLabel = false;
var isHideFirma = false;

function getAdvertisementById(id) {
    var row = jQuery.grep(context.Advertisements, function (n, i) {
        return (n.Id == id);
    });
    return row[0];
}

function setTemplateImage(base64Image, IsLandscape) {
    var url = "url(data:image/png;base64," + base64Image + ")";//+ "=);" 
    //url = "url(data:image/gif;base64,R0lGODlhCwALAIABAAAAAP///yH5BAEAAAEALAAAAAALAAsAAAIUhI8Wy6zdHlxyqnTBdHqHCoERlhQAOw==)";
    // var ele = $(c_div + " " + c_issue_className)[0];
    var ele = $(c_issue_className)[0];
    ele.style.backgroundImage = url;

    if (!IsLandscape) {
        ele.style.width = c_portrait_width;
        ele.style.height = c_portrait_height;
    }
}

function ajaxFailed(xmlRequest) {
    alert(xmlRequest.status + ' \n\r ' +
          xmlRequest.statusText + '\n\r' +
          xmlRequest.responseText);
}

function setAdvertisementsToolbarData() {
    $.each(context.Advertisements, function (index, advertisement) {
        if (!advertisement.IsDroped && !advertisement.IsDeleted)
            appendAdvertisementsToDragToolBox(advertisement);
    });
}

function appendAdvertisementsToDragToolBox(advertisement) {
    drag.append('<li class="MenuItem" style="height:' + advertisementSize.Height + ';width:' + advertisementSize.Width + ';"><span id=' + advertisement.Id + '>' + advertisement.Name + '</span></li>');
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

function loadAjax(successHandler) {
    $.ajax({
        type: "POST",
        url: downloadHandler + "?id=" + currentId,
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        success: successHandler,
        error: ajaxFailed
    });
}

function onSuccessHandler(data, status) {
    context = data;
    setAdvertisementsToolbarData();
    setImageTemplate();
    setCurrent(extendAdvertisingItem);
    registerElementEvents();
}

function onSuccessPrevHandler(data, status) {
    context = data;
    setImageTemplate();
    setCurrent();
}

function setGlobalVar() {
    dropBox = $(c_drop); drag = $(c_drag);
}

function enabledDeleteButton(enabled) {
    if (enabled) {
        $(c_jquery_id + c_del_table_btn).removeClass(c_disabled);
        return;
    }
    $(c_jquery_id + c_del_table_btn).addClass(c_disabled);
}

function enabledCopyButton(enabled) {
    if (enabled) {
        $(c_jquery_id + c_copy_table_btn).removeClass(c_disabled);
        return;
    }
    $(c_jquery_id + c_copy_table_btn).addClass(c_disabled);
}

function enabledPasteButton(enabled) {
    if (enabled) {
        $(c_jquery_id + c_paste_table_btn).removeClass(c_disabled);
        return;
    }
    $(c_jquery_id + c_paste_table_btn).addClass(c_disabled);
}

function enabledDelRedButton(enabled) {
    if (enabled) {
        $(c_jquery_id + c_del_red_table_btn).removeClass(c_disabled);
        return;
    }
    $(c_jquery_id + c_del_red_table_btn).addClass(c_disabled);
}

function registerMenubarEvents() {
    $(c_jquery_id + c_copy_table_btn).click(function () {
        copyHandler();
    });
    $(c_jquery_id + c_paste_table_btn).click(function () {
        pasteHandler();
    });
    $(c_jquery_id + c_del_table_btn).click(function () {
        deleteHandler();
    });
    $(c_jquery_id + c_save_table_btn).click(function () {
        saveHandler();
    });
    $(c_jquery_id + c_prev_table_btn).click(function () {
        prevHandler();
    });
    $(c_jquery_id + c_del_red_table_btn).click(function () {
        delredsHandler();
    });
}

function registerDocumentEvents() {
    $(document).keydown(function (e) {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrlKey) ctrlDown = false;
        if (e.keyCode == deleteKey) {
            if(!onfocusOnSizeLabel)
             deleteHandler();
        }
    });

    $(document).on(c_keypress, c_advertisment_size_className, function (e) {
        return e.which != 13;
    });
    $(document).live(c_keydown, c_jquery_class + c_AdvertisingSpace, function (e) {
        if (ctrlDown && e.keyCode == cKey) {
            copyHandler();
        }
        else if (ctrlDown && e.keyCode == vKey) {
            pasteHandler();
        }
        //else if (ctrlDown && e.keyCode == savkey) {
        //    saveHandler();
        //}
    });
}

function registerDragElement() {
    $(c_drag + " " + c_li).liveDraggable({
        revert: c_invalid,
        appendTo: c_drop,
        containment: c_drop,
        scroll: false,
        helper: c_clone,
        cursorAt: { bottom: 0 },
        start: function (event, ui) {
            dragClone = $(this).clone();
            dragElement = $(this);
        },
        stop: function (event, ui) {
            var w = $(c_drop).outerWidth();
        }
    });
}

function registerDropElement() {
    dropBox.droppable({
        accept: c_drag + " " + c_li + ", " + c_jquery_class + c_ui_widget_content,
        scroll: true,
        refreshPositions: true,
        drop: function (event, ui) {
            enabledCopyButton(true);
            var currPoint = getCurrentPointOnScreen(this, event, ui);
            var id;
            if (typeof (dragclone) == "undefined")
                id = ui.draggable.find(c_span).attr(c_id);
            else
                id = dragClone.find(c_span).attr(c_id);
            var row = getAdvertisementById(id);
            row.Top = currPoint.top;
            row.Left = currPoint.left;

            if (ui.draggable.hasClass(c_AdvertisingSpace)) {
                return true;
            }
            editAdvertismentOnIssue(this, dragClone, row, currPoint);
            dragElement.remove();
            return true;
        }
    });
}

function registerElementEvents() {
    var maxChar = 7;

    $(c_advertisment_size_className).live(c_keyup, function () { checkCharcount($(this), maxChar); });
    $(c_advertisment_size_className).live(c_keydown, function () { checkCharcount($(this), maxChar); });
    $(c_advertisment_size_className).live(c_dblclick, function () { $(this).selectText(); onfocusOnSizeLabel = true; });
    $(c_advertisment_size_className).live(c_blur, function () { onfocusOnSizeLabel = false; });

    registerDragElement();
    registerDropElement();
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

    var left = x > 0 ? x : 0 + c_px;
    var top = y > 0 ? y : 0 + c_px;
    return { top: top, left: left };
}

function generateAdvertismentOnIssue(title, id, size) {
    var display = "none";
    if (isHideFirma==false) {
         display = "block";
    }
    return "<div data-title='" + title + "'  class='ui-draggable ellipsis'><span class='" + c_advertisment_id + "' id='" + id + "'><span style='display: " + display + ";'  class='" + c_advertisment_title + "'>" + title + "</span><br><span contenteditable='true'   class='" + c_advertisment_size + "'>" + size + "</span></div>";
}
function setCurrent(extendPropAdvertisingItemHandler) {
    if (context.Current) {
        if (context.Advertisements.length > 0) {
            $.each(context.Current.Advertisements, function (index, advertisement) {
                var createDiv = generateAdvertismentOnIssue(advertisement.Name, advertisement.Id, advertisement.Size);
                var d = $(createDiv).appendTo(c_issue_className);
                if (advertisement.IsDeleted) {
                    $(d).addClass(c_deleted_advertisement);
                }
                if (typeof(extendPropAdvertisingItemHandler) == 'function')
                     extendPropAdvertisingItemHandler(d, advertisement);
            
                $(d).addClass(c_ui_widget_content).addClass(c_AdvertisingSpace);
                $(d).appendTo(c_issue_className);
                $(d).css({
                    position: c_absolute,
                    left: advertisement.Left+c_px,
                    top: advertisement.Top + c_px,
                    width: advertisement.Width + c_px,
                    height: advertisement.Height + c_px
                });
            });
        }
        onAnyElementsOnDropAreaHandler();
    }
}
function editAdvertismentOnIssue(issue, dragClone, currentRow, currPoint, copy) {
    var isCopy = copy || false;
    var title = dragClone.text();
    var size = currentRow.Size;
    var id = dragClone.find(c_span).attr(c_id);

    if (isCopy) {
        title = dragClone.find(c_advertisment_title_className).text();
        size = dragClone.find(c_advertisment_size_className).text();
        id = dragClone.find(c_advertisment_id_className).attr(c_id);
    }

    dragClone = dragClone.replaceWith(generateAdvertismentOnIssue(title, id, size));
    dragClone.css({
        position: c_absolute,
        left: currPoint.left,
        top: currPoint.top
    });
    dragClone.addClass(c_ui_widget_content).addClass(c_AdvertisingSpace);
    extendAdvertisingItem(dragClone, currentRow);
    dragClone.appendTo(issue);
}

function extendAdvertisingItem(dragClone, currentRow) {
    dragClone.qtip({
        content: currentRow.Name + " <br/>" + currentRow.Size,
        show: c_mouseover,
        hide: c_mouseout
    }).draggable(
        {
            containment: c_drop, cursor: "move", scroll: false,
            start: function (event, ui) {
                ui.helper.qtip("hide");
            },
        }).bind(c_mousedown, function () {
            $(c_AdvertisingSpace_className).removeClass(c_focusObject);
            $(this).addClass(c_focusObject);
            enabledDeleteButton(true);
        }
        ).resizable({
            containment: c_drop,
            start: function (event, ui) {
                ui.helper.qtip("hide");
            },
            stop: function (event, ui) {
                //ui.helper.qtip("show");
                var title = $(this).find(c_advertisment_title_className);
                //var row = getAdvertisementById($(this).find(c_advertisment_id_className).attr(c_id));

                //if (row.MaxFontSizeUi == undefined) {
                //    row.MaxFontSizeUi = row.MaxSizeName.rect();
                //}
                //else if (row.MaxFontSizeUi.Width == 0 && row.MaxFontSizeUi.Height == 0) {
                //    var size = row.MaxSizeName.rect();
                //    row.MaxFontSizeUi.Width = size.Width;
                //    row.MaxFontSizeUi.Height = size.Height;
                //}
                //if (row.MaxFontSizeUi.Width > $(this).outerWidth()) {
                //    //  title.text(row.NameShortcut + "...");
                //    title.text("...");
                //}
                //else if (row.MaxFontSizeUi.Height > $(this).outerHeight()) {
                //    //  title.text(row.NameShortcut + "...");
                //    title.text("...");
                //}
                //else {
                //    title.text(row.Name);
                //}
                title.focus();
            }
        });
}
function deleteHandler() {
    var obj = getEleOnFocus();
    if (obj != null) {
        var elementsToDelById = obj.find(c_advertisment_id_className).attr(c_id);
        var row = getAdvertisementById(elementsToDelById);
        if(!row.IsDeleted)
            appendAdvertisementsToDragToolBox(row);
        var del = getAllAdvertisingSpaceElementById(elementsToDelById);
        destroyExtendItems(del);
        del.remove();
        menuButtonsHandlerAFterDelElemnts();
        elementCopy = null;
    }
}

function destroyExtendItems(del) {
    del.resizable(c_destroy);
    del.qtip(c_destroy);
    del.draggable(c_destroy);
}

function getAllAdvertisingSpaceElementById(id) {
    var selector = c_AdvertisingSpace_className + ":has([id='" + id + "'])";
    return $(selector);
}

function menuButtonsHandlerAFterDelElemnts() {
   // enabledDeleteButton(false);
   // enabledPasteButton(false);
    onEmptyDropAreaHandler();
}
function onEmptyDropAreaHandler() {
    if (isEmptyOnDropElement()) {
        enabledCopyButton(false);
        enabledDelRedButton(false);
        enabledDeleteButton(false);
        enabledDelRedButton(false);
    }
}
function onAnyElementsOnDropAreaHandler() {
    if (!isEmptyOnDropElement()) {
        enabledCopyButton(true);
        if (hasDeleteAdvsAndSections()) {
            enabledDelRedButton(true);
        }
    }
}
function isEmptyOnDropElement() {
    return $(c_drop + " " + c_AdvertisingSpace_className).length > 0 ? false : true;
}

function pasteHandler() {
    if (elementCopy != null) {
        var currPoint = {};
        currPoint.top = 0;
        currPoint.left = 0;
        var id = elementCopy.find(c_advertisment_id_className).attr(c_id);
        var row = getAdvertisementById(id);
        editAdvertismentOnIssue($(c_drop), elementCopy, row, currPoint, true);
        elementCopy.removeClass(c_focusObject);
    }
}

function copyHandler() {
    var obj = getEleOnFocus();
    if (obj != null) {
        if (obj.hasClass(c_deleted_advertisement)) {
            messageBox("לא ניתן להעתיק שטח פרסום מחוק");
            return;
        }
        elementCopy = obj.clone();
        enabledPasteButton(true);
    }
}

function getEleOnFocus() {
    var obj = $(c_jquery_class + c_AdvertisingSpace + c_jquery_class + c_focusObject);
    if (obj.length == 1) {
        return obj;
    }
    return null;
}

function messageBox(s) {
    alert(s);
}
function saveHandler() {
    if (isEmptyOnDropElement()) {
        messageBox("לא נבחרו שטחי פרסום");
        return false;
    }
    if (hasDeleteAdvsAndSections()) {
        messageBox("יש שטחים של מחיקה");
        return false;
    }
    loadContext();
    $(c_jquery_class + c_AdvertisingSpace).each(function (i) {
        var ele = $(this);
        var data = dragDetailsUi.getDataByAdvertisementDragElement(ele);
        var row = getAdvertisementById(data.id);
        row.isDroped = true;
        row.Width = data.width;
        row.Height = data.height;
        row.Top = data.top;
        row.Left = data.left;
        row.Size = data.size;
        context.Current.Advertisements.push(row);
    });

    upload();
}
function hasDeleteAdvsAndSections() {
    return (getDeleteAdvsAndSections().length > 0);
}
function getDeleteAdvsAndSections() {
    return $(c_deleted_advertisement_className);
}

function prevHandler() {
    window.open(preview + "?" + c_issueid + "=" + currentId + "&" + c_hidefirma+"=1");
}

function delredsHandler() {
    var delRedObjs = getDeleteAdvsAndSections();
    destroyExtendItems(delRedObjs);
    delRedObjs.remove();
    onEmptyDropAreaHandler();

}
function upload() {
    $.ajax({
        type: "POST",
        url: uploadHandler,
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(context.Current),
        dataType: "json",
        success: function (data, status) {
            var d = data;

        },
        error: ajaxFailed
    });
}

function loadContext() {
    if (context.Current == null) {
        context.Current = {};
        context.Current.Title = context.Title;
        context.Current.IssueId = currentId;
    }
    context.Current.Advertisements = [];
    context.Current.Sections = [];
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

    return { Width: w, Height: h };
}

jQuery.fn.liveDraggable = function (opts) {
    this.live("mouseover", function () {
        if (!$(this).data("init")) {
            $(this).data("init", true).draggable(opts);
        }
    });
    return $();
};

var dragDetailsUi = {
    getDataByDragElement: function (dragElement) {
        var obj = {};
        this.title = dragElement.find(c_advertisment_title_className).text();
        obj.id = dragElement.find(c_advertisment_id_className).attr(c_id);
        obj.width = dragElement.outerWidth();
        obj.height = dragElement.outerHeight();
        obj.top = dragElement.position().top;
        obj.left = dragElement.position().left;
        return obj;
    },
    getDataByAdvertisementDragElement: function (dragElement) {
        var obj=this.getDataByDragElement(dragElement);
        obj.size = dragElement.find(c_advertisment_size_className).text();
        return obj;
    }
};

function getQueryString() {
    var result = {}, queryString = location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m;
    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return result;
}

function getCurrentId() {
    //  currentId = '2b841240-eef8-43ec-ad0b-ef812238c8af';
    var r = getQueryString();
   return r[c_issueid];
}
function getHideFirma() {
    var r = getQueryString();
    if (typeof r[c_hidefirma] != "undefined") {
        if (r[c_hidefirma] == 1) return true;
    }
    return false;
}