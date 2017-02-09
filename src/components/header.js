import React from 'react';
import Utils from '../utils';
import TopLinks from './top-links';


export default class Header extends React.Component {
	render() {
		const {data} = this.props;
		return (
			<div>
				<TopLinks/>
				<div className="header">
					<div className="title">{data.title}</div>
					<div className="stats">
						<span className="score item">{data.score}</span>
						<span className="item">{data.by}</span>
						<span className="item">{Utils.getTimeFrom(data.time)}</span>
						<span className="item">
							<i className="fa fa-comment-o"/> {data.descendants}
						</span>
					</div>
					<div className="links">
						<div>
							<a href={`https://news.ycombinator.com/item?id=${data.id}`}>
								<i className="fa fa-share-square-o"/> https://news.ycombinator.com/item?id={data.id}
							</a>
						</div>
						<div>
							<a href={data.url}>
								<i className="fa fa-share-square-o"/> {data.url}
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
