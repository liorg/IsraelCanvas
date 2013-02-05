var uploadHandler = "mockUpload.ashx";
var downloadHandler = "MockData.ashx";
var preview = "Preview.htm";
var dropBox;
var drag;
var dragSections;
var dragClone;
var dragElement;
var elementCopy;
var currentId;
var context;
var menuItemSize = { Height: 10, Width: 20 };

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

var c_titleAlert = "הודעה";

//var c_portrait_width = "210mm";
//var c_portrait_height = "297mm";

var c_portrait_width = "210mm";
var c_portrait_height = "292mm";

//width: 297mm;
//height: 210mm;

var c_issue = "Issue";
var c_dropable = "drop";
var c_dragable = "drag";
var c_blur = "blur";

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

var c_adv_drag_type = "adv-drag-type";
var c_whitespace_drag_type = "whitespace-drag-type";
var c_section_drag_type = "section-drag-type";
var c_whitespace_type = "whitespace-type";
var c_adv_type = "adv-type"
var c_section_type = "section-type";
var c_remover_border = "remove-border";
var c_drop = c_jquery_class + c_dropable;
var c_drag = c_jquery_id + c_dragable;
var c_dragSections = "dragSections";
var c_dragSections_Id = c_jquery_id + c_dragSections;
var c_toolbar_ClassName = c_jquery_class + "ToolBar";
var c_AdvertisingSpace_className = c_jquery_class + c_AdvertisingSpace;
var c_advertisment_id_className = c_jquery_class + c_advertisment_id;
var c_advertisment_size_className = c_jquery_class + c_advertisment_size;
var c_advertisment_title_className = c_jquery_class + c_advertisment_title;
var c_deleted_advertisement_className = c_jquery_class + c_deleted_advertisement;
var c_issue_className = c_jquery_class + c_issue;
var c_hidefirma = "hd";

var onfocusOnSizeLabel = false;
var isHideFirma = false;
var c_hasDeleteAreaMessage = "יש מודעות מבוטלות";
var c_toContinueMessage = "האם להמשיך?";
var c_newLine = "<br/>";
var c_thereIsExtraAdvsMessage  = "יש מודעות נוספות בארגז כלים";

$.extend({
    customAlert: function (message, title) {
        $("<div></div>").dialog({
            buttons: { "Ok": function () { $(this).dialog("close"); } },
            close: function (event, ui) { $(this).remove(); },
            resizable: false,
            title: title,
            modal: true
        }).text(message);
    },
    customConfirm: function (message, title, okCancelAction) {
        $("<div></div>").dialog({
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close").hide();
            },
            buttons: {
                "Ok": function () {
                    okCancelAction(true);
                    $(this).dialog("close");
                }
                ,
                "Cancel": function () {
                    okCancelAction(false);
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) { $(this).remove(); },
            resizable: false,
            title: title,
            modal: true
        }).html(message);
    }
});

function confirm(s, okCancelHandler) {
    $.customConfirm(s, c_titleAlert, okCancelHandler);
}
function messageBox(s) {
    //alert(s);
    $.customAlert(s, c_titleAlert)
}

function getAdvertisementById(id) {
    var row = jQuery.grep(context.Advertisements, function (n, i) {
        return (n.Id == id);
    });
    return row[0];
}

function getSectionById(id) {
    var row = jQuery.grep(context.Sections, function (n, i) {
        return (n.Id == id);
    });
    return row[0];
}

function setTemplateImage(base64Image, IsLandscape) {
    var url = "url(data:image/png;base64," + base64Image + ")";
     var ele = $(c_issue_className)[0];
    ele.style.backgroundImage = url;

    if (!IsLandscape) {
        ele.style.width = c_portrait_width;
        ele.style.height = c_portrait_height;
    }
}

function ajaxFailed(xmlRequest) {
    if (xmlRequest.status == "200") {
        
        return;
    }

    messageBox(xmlRequest.status + ' \n\r ' +
          xmlRequest.statusText + '\n\r' +
          xmlRequest.responseText);
}

function setAdvertisementsToolbarData() {
    $.each(context.Advertisements, function (index, advertisement) {
        if (!advertisement.IsDroped && !advertisement.IsDeleted)
            appendAdvertisementsToDragToolBox(advertisement);
    });
}

function setSectionsToolbarData() {
    $.each(context.Sections, function (index, section) {
        if (!section.IsDeleted)
            appendSectionsToDragToolBox(section);
    });
}


function appendAdvertisementsToDragToolBox(advertisement) {
    drag.append('<li class="MenuItem ' + c_adv_type + '" style="height:' + menuItemSize.Height + ';width:' + menuItemSize.Width + ';"><span id=' + advertisement.Id + '>' + advertisement.Name + '</span></li>');
}

function appendSectionsToDragToolBox(section) {
    dragSections.append('<li class="MenuItem ' + c_section_type + '" style="height:' + menuItemSize.Height + ';width:' + menuItemSize.Width + ';"><span id=' + section.Id + '>' + section.Name + '</span></li>');
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
    setSectionsToolbarData();
    setImageTemplate();
    setCurrent(extendAdvertisingItem, extendBehaviourItem, extendSectionItem);
    registerElementEvents();
}

function onSuccessPrevHandler(data, status) {
    context = data;
    setImageTemplate();
    setCurrent();
}

function setGlobalVar() {
    dropBox = $(c_drop); drag = $(c_drag); dragSections = $(c_dragSections_Id);
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
            if (!onfocusOnSizeLabel)
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
    });
}

function registerDragElement() {
    c_toolbar_ClassName;
    var selector = c_toolbar_ClassName + " " + c_li;

    $(selector).liveDraggable({
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
    var selector = c_toolbar_ClassName + " " + c_li;
    dropBox.droppable({
        accept: selector + ", " + c_jquery_class + c_ui_widget_content,
        scroll: true,
        refreshPositions: true,
        drop: function (event, ui) {
            enabledCopyButton(true);
            return onDropHandler(this, event, ui);
        }
    });
}

function onDropHandler(issue, event, ui) {
    var draggable = ui.draggable;
    if (draggable.hasClass(c_AdvertisingSpace)) {
        return true;
    }
    if (draggable.hasClass(c_adv_type)) {
        return onInitAdv(issue, event, ui);
    }
    if (draggable.hasClass(c_whitespace_type)) {
        return onInitWhiteSpace(issue, event, ui);
    }
    if (draggable.hasClass(c_section_type)) {
        return onInitSection(issue, event, ui);
    }
}

function generateWhiteSpace() {
    return "<div style='width:25px;height:15px' class='" + c_whitespace_drag_type + " ui-draggable'></div>";
}

function onInitWhiteSpace(issue, event, ui) {
    var currPoint = getCurrentPointOnScreen(issue, event, ui);
    createWhiteSpaceOnIssue(issue, dragClone, currPoint);
    return true;
}

function onInitSection(issue, event, ui) {
    var currPoint = getCurrentPointOnScreen(issue, event, ui);
    var id;
    if (typeof (dragclone) == "undefined")
        id = ui.draggable.find(c_span).attr(c_id);
    else
        id = dragClone.find(c_span).attr(c_id);
    var row = getSectionById(id);
    createSectionOnIssue(issue, dragClone, row, currPoint);

    return true;
}


function onInitAdv(issue, event, ui) {
    var currPoint = getCurrentPointOnScreen(issue, event, ui);
    var id;
    if (typeof (dragclone) == "undefined")
        id = ui.draggable.find(c_span).attr(c_id);
    else
        id = dragClone.find(c_span).attr(c_id);
    var row = getAdvertisementById(id);

    createAdvertismentOnIssue(issue, dragClone, row, currPoint);
    dragElement.remove();
    return true;
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

function generateSectionOnIssue(title, id) {
    return "<div data-title='" + title + "'  class='" + c_section_drag_type +" " + c_remover_border +" ui-draggable ellipsis'><span class='" + c_advertisment_id + "' id='" + id + "'><span   class='" + c_advertisment_title + "'>" + title + "</span></div>";
}

function generateAdvertismentOnIssue(title, id, size) {
    if (isHideFirma == true) {
        title = "";
    }
    return "<div data-title='" + title + "'  class='" + c_adv_drag_type + " ui-draggable ellipsis'><span class='" + c_advertisment_id + "' id='" + id + "'><span   class='" + c_advertisment_title + "'>" + title + "</span><br><span contenteditable='true'   class='" + c_advertisment_size + "'>" + size + "</span></div>";
}

function setCurrent(extendPropAdvertisingItemHandler, extendPropWhiteSpaceItemHandler, extendPropSectionItemHandler) {
    if (context.Current) {
        $.each(context.Current.Advertisements, function (index, advertisement) {
            var createDiv = generateAdvertismentOnIssue(advertisement.Name, advertisement.Id, advertisement.Size);
            var d = $(createDiv).appendTo(c_issue_className);
            if (advertisement.IsDeleted) {
                $(d).addClass(c_deleted_advertisement);
            }
            if (typeof (extendPropAdvertisingItemHandler) == 'function')
                extendPropAdvertisingItemHandler(d, advertisement);

            setPositionsElements(d, advertisement);
        });
        $.each(context.Current.Colors, function (index, whiteColor) {
            var createDiv = generateWhiteSpace();
            var d = $(createDiv).appendTo(c_issue_className);

            if (typeof (extendPropWhiteSpaceItemHandler) == 'function')
                extendPropWhiteSpaceItemHandler(d, whiteColor);

            setPositionsElements(d, whiteColor);
        });
        $.each(context.Current.Sections, function (index, section) {
            var createDiv = generateSectionOnIssue(section.Name, section.Id);
            var d = $(createDiv).appendTo(c_issue_className);
            if (section.IsDeleted) {
                $(d).addClass(c_deleted_advertisement);
            }
            if (typeof (extendPropAdvertisingItemHandler) == 'function')
                extendPropSectionItemHandler(d, section);

            setPositionsElements(d, section);
        });

        onAnyElementsOnDropAreaHandler();
    }
}

function setPositionsElements(d, item) {

    $(d).addClass(c_ui_widget_content).addClass(c_AdvertisingSpace);
    $(d).appendTo(c_issue_className);
    $(d).css({
        position: c_absolute,
        left: item.Left + c_px,
        top: item.Top + c_px,
        width: item.Width + c_px,
        height: item.Height + c_px
    });
}

function createWhiteSpaceOnIssue(issue, dragClone, currPoint, copy) {
    var isCopy = copy || false;
    dragClone = dragClone.replaceWith(generateWhiteSpace())
    dragClone.css({
        position: c_absolute,
        left: currPoint.left,
        top: currPoint.top
    });
    dragClone.addClass(c_ui_widget_content).addClass(c_AdvertisingSpace);
    extendBehaviourItem(dragClone);
    dragClone.appendTo(issue);
}

function createSectionOnIssue(issue, dragClone, currentRow, currPoint, copy) {
    var isCopy = copy || false;
    var title = dragClone.text();
    var id = dragClone.find(c_span).attr(c_id);

    if (isCopy) {
        title = dragClone.find(c_advertisment_title_className).text();
        id = dragClone.find(c_advertisment_id_className).attr(c_id);
    }

    dragClone = dragClone.replaceWith(generateSectionOnIssue(title, id));
    dragClone.css({
        position: c_absolute,
        left: currPoint.left,
        top: currPoint.top
    });
    dragClone.addClass(c_ui_widget_content).addClass(c_AdvertisingSpace);
    extendSectionItem(dragClone, currentRow);
    dragClone.appendTo(issue);
}

function createAdvertismentOnIssue(issue, dragClone, currentRow, currPoint, copy) {
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

function onFocusElement() {
    $(c_AdvertisingSpace_className).removeClass(c_focusObject);
    $(c_jquery_class+ c_section_drag_type).addClass(c_remover_border);
    if ($(this).hasClass(c_section_drag_type)) {
        $(this).removeClass(c_remover_border);
    }
    $(this).addClass(c_focusObject);
   
    enabledDeleteButton(true);
}

function extendSectionItem(dragClone, currentRow) {
    dragClone.qtip({
        content: currentRow.Name,
        show: c_mouseover,
        hide: c_mouseout
    });

    extendBehaviourItem(dragClone,
        function (event, ui) { ui.helper.qtip("hide"); },
        function (event, ui) { ui.helper.qtip("hide"); });
}

function extendAdvertisingItem(dragClone, currentRow) {
    dragClone.qtip({
        content: currentRow.Name + " <br/>" + currentRow.Size,
        show: c_mouseover,
        hide: c_mouseout
    });

    extendBehaviourItem(dragClone,
        function (event, ui) { ui.helper.qtip("hide"); },
        function (event, ui) { ui.helper.qtip("hide"); },
         function (event, ui) {
             var title = $(this).find(c_advertisment_title_className);
             title.focus();
         });
}

function extendBehaviourItem(dragClone, draggableStartHandler, resizableStartHandler, resizableStopHandler) {
    dragClone.draggable(
        {
            containment: c_drop, cursor: "move", scroll: false,
            start: draggableStartHandler,
        }).bind(c_mousedown, onFocusElement).resizable({
            containment: c_drop,
            start: resizableStartHandler,
            stop: resizableStopHandler
        });
}

function destroyExtendItems(del) {
    del.resizable(c_destroy);
    del.draggable(c_destroy);
}

function getAllAdvertisingSpaceElementById(id) {
    var selector = c_AdvertisingSpace_className + ":has([id='" + id + "'])";
    return $(selector);
}

function menuButtonsHandlerAFterDelElemnts() {
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

function delAdvHandler(obj) {
    var elementsToDelById = obj.find(c_advertisment_id_className).attr(c_id);
    var row = getAdvertisementById(elementsToDelById);

    if (!row.IsDeleted)
        appendAdvertisementsToDragToolBox(row);
    var del = getAllAdvertisingSpaceElementById(elementsToDelById);
    del.qtip(c_destroy);
    destroyExtendItems(del);
    return del;
}

function delSectionHandler(obj) {
    var elementsToDelById = obj.find(c_advertisment_id_className).attr(c_id);
    var row = getSectionById(elementsToDelById);
    if (!row.IsDeleted)
        appendAdvertisementsToDragToolBox(row);
    destroyExtendItems(obj);
    obj.qtip(c_destroy);
    return obj;
}

function deleteHandler() {
    var obj = getEleOnFocus();
    if (obj != null) {
        if (obj.hasClass(c_adv_drag_type)) 
            del = delAdvHandler(obj);
        else if (obj.hasClass(c_section_drag_type)) 
            del = delSectionHandler(obj);
        else 
            del = obj;
        
        del.remove();
        menuButtonsHandlerAFterDelElemnts();
        elementCopy = null;
    }
}

function copyAdvHandler(elementCopy, currPoint) {
    var id = elementCopy.find(c_advertisment_id_className).attr(c_id);
    var row = getAdvertisementById(id);
    createAdvertismentOnIssue($(c_drop), elementCopy, row, currPoint, true);
    elementCopy.removeClass(c_focusObject);
}

function copySectionHandler(elementCopy, currPoint) {
    var id = elementCopy.find(c_advertisment_id_className).attr(c_id);
    var row = getSectionById(id);
    createSectionOnIssue($(c_drop), elementCopy, row, currPoint, true);
    elementCopy.removeClass(c_focusObject);
}

function copyWhitespaceHandler(elementCopy, currPoint) {
    createWhiteSpaceOnIssue($(c_drop), elementCopy, currPoint, true);
    elementCopy.removeClass(c_focusObject);
}

function pasteHandler() {
    if (elementCopy != null) {
        var currPoint = {};
        currPoint.top = 0;
        currPoint.left = 0;
        if (elementCopy.hasClass(c_adv_drag_type)) {
            copyAdvHandler(elementCopy, currPoint);
        }
        else if (elementCopy.hasClass(c_section_drag_type)) {
            copySectionHandler(elementCopy, currPoint);
        }
        else if (elementCopy.hasClass(c_whitespace_drag_type)) {
            copyWhitespaceHandler(elementCopy, currPoint);
        }
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


function saveHandler() {
    //if (isEmptyOnDropElement()) {
    //    messageBox("לא נבחרו שטחי פרסום");
    //    return false;
    //}
    var messageBuilder = "";

    var hasAnyAdvsOnToolBox= hasAdvsOnToolBox();
    var hasAnyDeleteAdvsAndSections= hasDeleteAdvsAndSections();
    if (hasAnyAdvsOnToolBox || hasAnyDeleteAdvsAndSections) {
        // messageBox("יש שטחים של מחיקה");
        messageBuilder += hasAnyAdvsOnToolBox ? c_thereIsExtraAdvsMessage : "";
        messageBuilder += hasAnyAdvsOnToolBox ? c_newLine : "";
        messageBuilder += hasAnyDeleteAdvsAndSections ? c_hasDeleteAreaMessage : "";
        messageBuilder += hasAnyDeleteAdvsAndSections ? c_newLine : "";
        messageBuilder += c_toContinueMessage;
        confirm(messageBuilder,
            function (isOk) {
                if (isOk)
                    save();
            }
        );
    }
    else {
        save();
    }

}
function save() {
    loadContext();
    $(c_jquery_class + c_AdvertisingSpace).each(function (i) {
        var ele = $(this);
        if (ele.hasClass(c_adv_drag_type)) {
            populateAdvertisementsOnContext(ele);
        }
        if (ele.hasClass(c_whitespace_drag_type)) {
            populateWhiteSpacesOnContext(ele);
        }
        if (ele.hasClass(c_section_drag_type)) {
            populateSectionsOnContext(ele);
        }
    });
    upload();
}

function populateSectionsOnContext(obj) {
    var dataUi = dragDetailsUi.getDataByDragElement(obj);
    var row = getSectionById(dataUi.id);
    var ele = {};
    ele.Id = row.Id;
    ele.Name = row.Name;
    setElementBase(ele, dataUi);
    context.Current.Sections.push(ele);
}

function populateWhiteSpacesOnContext(obj) {
    var dataUi = dragDetailsUi.getDragElementPosition(obj);
    var ele = {};
    ele.ColorName = "white";
    setElementBase(ele, dataUi);
    context.Current.Colors.push(ele);
}

function populateAdvertisementsOnContext(obj) {
    var dataUi = dragDetailsUi.getDataByAdvertisementDragElement(obj);
    var row = getAdvertisementById(dataUi.id);
    var ele = {};
    ele.Id = row.Id;
    ele.Name = row.Name;
    ele.isDroped = true;
    ele.Size = dataUi.size;
    setElementBase(ele, dataUi);
    context.Current.Advertisements.push(ele);
}

function setElementBase(ele, data) {
    ele.Width = data.width;
    ele.Height = data.height;
    ele.Top = data.top;
    ele.Left = data.left;
}

function hasDeleteAdvsAndSections() {
    return (getDeleteAdvsAndSections().length > 0);
}

function getDeleteAdvsAndSections() {
    return $(c_deleted_advertisement_className);
}

function hasAdvsOnToolBox() {
    return $("UL>" + c_jquery_class + c_adv_type).length > 0;
}


function prevHandler() {
    //  window.open(preview + "?" + c_issueid + "=" + currentId + "&" + c_hidefirma+"=1");
    window.open(preview + "?" + c_issueid + "=" + currentId);
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
        success: uploadSuccessHandler,
        error: ajaxFailed
    });

   

}
function uploadSuccessHandler(data, status) {
    var d = data;
}

function loadContext() {
    if (context.Current == null) {
        context.Current = {};
        context.Current.Title = context.Title;
        context.Current.IssueId = currentId;
    }
    context.Current.Advertisements = [];
    context.Current.Sections = [];
    context.Current.Colors = [];
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
    getDragElementPosition: function (dragElement) {
        var obj = {};
        obj.width = dragElement.outerWidth();
        obj.height = dragElement.outerHeight();
        obj.top = dragElement.position().top;
        obj.left = dragElement.position().left;
        return obj;
    },
    getDataByDragElement: function (dragElement) {
        var obj = this.getDragElementPosition(dragElement);
        obj.title = dragElement.find(c_advertisment_title_className).text();
        obj.id = dragElement.find(c_advertisment_id_className).attr(c_id);
        return obj;
    },
    getDataByAdvertisementDragElement: function (dragElement) {
        var obj = this.getDataByDragElement(dragElement);
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



