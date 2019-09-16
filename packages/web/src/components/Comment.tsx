import React, { FunctionComponent } from 'react'
import { Comment as AntdComment, Icon, Tooltip, Avatar } from 'antd'
import { Markdown } from './Markdown'
import { useTranslation } from 'react-i18next'
import './Comment.css'

export interface CommentItem {
	likes: number
	dislikes: number
	action: string
	author: string
	title: string
	content: string
}

export interface CommentProps {
	item: CommentItem
}

export const Comment: FunctionComponent<CommentProps> = ({
	item: { likes, dislikes, action, title, author, content }
}) => {
	const { t } = useTranslation()
	const actions = [
		<span>
			<Tooltip title='Like'>
				<Icon
					type='like'
					theme={action === 'liked' ? 'filled' : 'outlined'}
					onClick={() => {
						likes++
					}}
				/>
			</Tooltip>
			<span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
		</span>,
		<span>
			<Tooltip title='Dislike'>
				<Icon
					type='dislike'
					theme={action === 'disliked' ? 'filled' : 'outlined'}
					onClick={() => {
						dislikes++
					}}
				/>
			</Tooltip>
			<span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
		</span>,
		<span>{t('Comments.reply')}</span>
	]

	return (
		<AntdComment
			className='Comment'
			actions={actions}
			author={<h3 className='Comment__author'>{author}</h3>}
			avatar={<Avatar icon='user' />}
			content={<Markdown source={content} />}
			datetime={<Tooltip title={title}>{title}</Tooltip>}
		/>
	)
}
