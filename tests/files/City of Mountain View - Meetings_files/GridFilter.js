
function gridFilterMenuShowing(sender, args) {
    //get the DOM event
    var evt = args.get_domEvent();
    if (!evt._isCustomEvent) //if this is the original event - prevent it
    {
        //get the target
        var target = evt.target || evt.srcElement;
        //get the location
        var loc = getOffset(target, sender._element.ownerDocument, sender._element.ownerDocument.documentElement);
        //create a "fake" event arguments object
        var newEvt = $telerik.$.extend({}, {
            target: target,     //specify the current target
            clientX: loc.left,  //and the coordinates we want
            clientY: loc.top + target.offsetHeight,
            _isCustomEvent: true //this is important!
        });
        args.set_cancel(true);
        setTimeout(function () {
            //this internal RadGrid function invokes the context menu all over again
            sender._showFilterMenu(args.get_tableView().get_id(), args.get_column().get_uniqueName(), newEvt);

        }, 100);
    }
}


function FocusMenu(menu, eventArgs) {
    menu.get_items().getItem(0).get_linkElement().focus();
}


function getOffset(elem, doc, docElem, box) {
    try {
        box = elem.getBoundingClientRect();
    } catch (e) { }

    // Make sure we're not dealing with a disconnected DOM node
    if (!box || !jQuery.contains(docElem, elem)) {
        return box ? {
            top: box.top,
            left: box.left
        } : {
            top: 0,
            left: 0
        };
    }

    var body = doc.body,
        win = window,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop,
        scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
        top = box.top - clientTop,
        left = box.left - clientLeft;

    return {
        top: top,
        left: left
    };
}