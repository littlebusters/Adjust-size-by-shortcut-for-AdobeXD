const {getNudgeValue, openSettingDialog, createAlert} = require('./modules/helper');

async function shrinkWidth(selection) {
    objectResize(selection.items, 'width', -await getNudgeValue('small'));
}
async function extendWidth(selection) {
    objectResize(selection.items, 'width', await getNudgeValue('small'));
}
async function shrinkHeight(selection) {
    objectResize(selection.items, 'height', -await getNudgeValue('small'));
}
async function extendHeight(selection) {
    objectResize(selection.items, 'height', await getNudgeValue('small'));
}

async function shrinkGWidth(selection) {
    objectResize(selection.items, 'width', -await getNudgeValue('big'));
}
async function extendGWidth(selection) {
    objectResize(selection.items, 'width', await getNudgeValue('big'));
}
async function shrinkGHeight(selection) {
    objectResize(selection.items, 'height', -await getNudgeValue('big'));
}
async function extendGHeight(selection) {
    objectResize(selection.items, 'height', await getNudgeValue('big'));
}

// main
function objectResize(sel, side, shift) {
	if (0 === sel.length) {
			const dialog = createAlert('title', 'message');
			dialog.showModal();
			return false;
	}

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
        "ExtendGH": extendGHeight,
        "Settings": openSettingDialog
    }
};
