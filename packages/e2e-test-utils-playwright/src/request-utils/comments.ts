/**
 * Internal dependencies
 */
import type { RequestUtils } from './index';

export interface Comment {
	id: number;
	author: number;
	content: string;
}

/**
 * Create new comment using the REST API.
 *
 * @param {} this    RequestUtils.
 * @param {} comment Comment.
 */
export async function createComment( this: RequestUtils, comment: Comment ) {
	this.rest( {
		method: 'POST',
		path: '/wp/v2/comments',
		data: comment,
	} );
}

/**
 * Delete all comments using the REST API.
 *
 * @param {} this RequestUtils.
 */
export async function deleteAllComments( this: RequestUtils ) {
	// List all comments.
	// https://developer.wordpress.org/rest-api/reference/comments/#list-comments
	const comments = await this.rest( {
		path: '/wp/v2/comments',
		params: {
			per_page: 100,
			// All possible statuses.
			status: 'unapproved,approved,spam,trash',
		},
	} );

	// Delete all comments one by one.
	// https://developer.wordpress.org/rest-api/reference/comments/#delete-a-comment
	// "/wp/v2/comments" doesn't support batch requests yet.
	await Promise.all(
		comments.map( ( comment: Comment ) =>
			this.rest( {
				method: 'DELETE',
				path: `/wp/v2/comments/${ comment.id }`,
				params: {
					force: true,
				},
			} )
		)
	);
}
