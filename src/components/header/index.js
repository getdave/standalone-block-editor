/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';


import HistoryUndo from './undo';
import HistoryRedo from "./redo";

export default function Header() {
	function handleUndo() {
		console.log( 'undo' );
	}
	return (
		<div
			className="getdavesbe-header"
			role="region"
			aria-label={__("Standalone Editor top bar.", "getdavesbe")}
			tabIndex="-1"
		>
			<h1 className="getdavesbe-header__title">
				{__("Standalone Block Editor", "getdavesbe")}
			</h1>

			<HistoryUndo />
			<HistoryRedo />
		</div>
	);
}
