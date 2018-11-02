function shrinkWidth(selection) {
    objectResize(selection.items, 'width', -1);
}
function extendWidth(selection) {
    objectResize(selection.items, 'width', 1);
}
function shrinkHeight(selection) {
    objectResize(selection.items, 'height', -1);
}
function extendHeight(selection) {
    objectResize(selection.items, 'height', 1);
}

function shrinkGWidth(selection) {
    objectResize(selection.items, 'width', -10);
}
function extendGWidth(selection) {
    objectResize(selection.items, 'width', 10);
}
function shrinkGHeight(selection) {
    objectResize(selection.items, 'height', -10);
}
function extendGHeight(selection) {
    objectResize(selection.items, 'height', 10);
}

// main
function objectResize(sel, side, shift) {

    if('width' === side) {
        sel.forEach(function (obj) {
            let bounds = obj.boundsInParent;
            obj.resize(bounds.width + shift, bounds.height);
        });
    }
    if('height' === side) {
        sel.forEach(function (obj) {
            let bounds = obj.boundsInParent;
            obj.resize(bounds.width, bounds.height + shift);
        });
    }
}

module.exports = {
    commands: {
        "ShrinkW": shrinkWidth,
        "ExtendW": extendWidth,
        "ShrinkH": shrinkHeight,
        "ExtendH": extendHeight,
        "ShrinkGW": shrinkGWidth,
        "ExtendGW": extendGWidth,
        "ShrinkGH": shrinkGHeight,
        "ExtendGH": extendGHeight
    }
};
