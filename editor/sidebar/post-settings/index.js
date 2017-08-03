/**
 * WordPress dependencies
 */
import { Panel } from 'components';

/**
 * Internal Dependencies
 */
import './style.scss';
import PostStatus from '../post-status';
import PostExcerpt from '../post-excerpt';
import PostTaxonomies from '../post-taxonomies';
import FeaturedImagePanel from '../featured-image-panel';
import DiscussionPanel from '../discussion-panel';
import LastRevision from '../last-revision';
import TableOfContents from '../table-of-contents';
import PageAttributes from '../page-attributes';

const panel = (
	<Panel>
		<PostStatus />
		<LastRevision />
		<PostTaxonomies />
		<FeaturedImagePanel />
		<PostExcerpt />
		<DiscussionPanel />
		<PageAttributes />
		<TableOfContents />
	</Panel>
);

export default () => panel;
