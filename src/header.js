/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export default function Header() {
	return (
		<div
			className="getdavesbe-header"
			role="region"
            aria-label={__('Standalone Editor top bar.', 'getdavesbe' ) }
			tabIndex="-1"
		>
			<h1 className="getdavesbe-header__title">
                {__('Standalone Block Editor', 'getdavesbe' ) }
			</h1>
		</div>
	);
}