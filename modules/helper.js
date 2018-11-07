const dom = sel => document.querySelector(sel);
const {uiLabel} = require('./i18l');
const pluginIcon = '../images/adjust-size-by-shortcut-icon.png';

function createAlert(title, msg) {
	document.body.innerHTML = `
<style>
    dialog {
        display: flex;
        flex-direction: row-reverse;
    }
    #title {
        padding-bottom: 7px;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
    }
    .plugin-icon {
        width: 48px;
        height: 48px;
        margin-right: 16px;
        border-radius: 4px;
        background-image: url(${pluginIcon});
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
<dialog id="dialog">
	<form id="form" method="dialog">
		<h1 id="title">${uiLabel[title]}</h1>
		<p>${uiLabel[msg]}</p>
		<footer>
			<button id="ok" type="submit" uxp-variant="cta">OK</button>
		</footer>
	</form>
	<div class="plugin-icon"></div>
</dialog>
`;
	const dialog = dom('#dialog');
	const ok = dom('#ok');
	const cancelDialog = () => dialog.close();
	ok.addEventListener('click', cancelDialog);
	ok.addEventListener('keypress', cancelDialog);

	return dialog;
}

module.exports = {
	createAlert
}