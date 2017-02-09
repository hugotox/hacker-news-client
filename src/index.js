import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import Main from './container/main.js';
import store from './store';

render(
	<AppContainer>
		<Provider store={store}>
			<Main/>
		</Provider>
	</AppContainer>,
	document.querySelector("#app"));

if (module && module.hot) {
	module.hot.accept('./container/main.js', () => {
		const Main = require('./container/main.js').default;
		render(
			<AppContainer>
				<Provider store={store}>
					<Main/>
				</Provider>
			</AppContainer>,
			document.querySelector("#app")
		);
	});
}
