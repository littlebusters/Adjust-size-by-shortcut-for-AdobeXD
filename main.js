const {createSettingDialog, createAlert, readConfig, writeConfig, validateNum} = require('./modules/helper');
const nudge = (async function() {
    console.log('init');
	// let nudgeValues = {'normal': 1, 'greatly': 10};
	let nudgeValues = await readConfig();

	let small = nudgeValues.normal;
	let big   = nudgeValues.greatly;
	console.log(small);
	console.log(big);

	return {
		getValue: async function(size) {
			switch (size) {
        case 'small':
            return small;
        case 'big':
            return big;
        default:
            return small;
      }
		},
		update: async function(nudgeValues) {
			small = nudgeValues.normal;
			big   = nudgeValues.greatly;
		}
	};
})();

function shrinkWidth(selection) {
    objectResize(selection.items, 'width', -nudge.getValue('small'));
}
function extendWidth(selection) {
    objectResize(selection.items, 'width', nudge.getValue('small'));
}
function shrinkHeight(selection) {
    objectResize(selection.items, 'height', -nudge.getValue('small'));
}
function extendHeight(selection) {
    objectResize(selection.items, 'height', nudge.getValue('small'));
}

function shrinkGWidth(selection) {
    objectResize(selection.items, 'width', -nudge.getValue('big'));
}
function extendGWidth(selection) {
    objectResize(selection.items, 'width', nudge.getValue('big'));
}
function shrinkGHeight(selection) {
    objectResize(selection.items, 'height', -nudge.getValue('big'));
}
function extendGHeight(selection) {
    objectResize(selection.items, 'height', nudge.getValue('big'));
}

async function openSettingDialog() {
    console.log('openSettingDialog');
    const storedValue = await readConfig();
    const dialog = createSettingDialog(storedValue);

    console.log(nudge.getValue('small'));
    console.log(nudge.getValue('big'));
    nudge.update({'normal': 20, 'greatly': 8});
	console.log(nudge.getValue('small'));
	console.log(nudge.getValue('big'));



    try {
        const result = await dialog.showModal();
        if ('reasonCanceled' !== result) {
            let config = {};
            config.normal = (validateNum(result.smallNudge)) ? Math.abs(result.smallNudge - 0) : defaultVal.smallNudge;
            config.greatly = (validateNum(result.bigNudge)) ? Math.abs(result.bigNudge - 0) : defaultVal.bigNudge;
            nudge.update(result.smallNudge, result.bigNudge)
            await writeConfig(config);
        } else {
            console.log('Adjust size setting canceled.')
        }
		} catch(e) {
        console.log(e);
    }
}



// async function nudge() {
// 	console.log('Set default value');
// 	let defaultValue = await readConfig();
// 	console.log(defaultValue);
// 	let smallNudge = defaultValue.normal;
// 	let bitNudge = defaultValue.greatly;
//
// 	const nudgeValue = (shift) => {
// 			switch (shift) {
// 				case 'small':
// 					return smallNudge;
// 				case 'big':
// 					return bitNudge;
// 			}
// 		};
// 	const update = (small, big) => {
//       console.log('Update nudge value');
//       smallNudge = small;
//       bitNudge = big;
//     };
// };
// let s = await nudge();

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
