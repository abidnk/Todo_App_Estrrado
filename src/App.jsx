import React from 'react';

import {AddTodoForms} from './components/AddTodoForms';
import {TodoList} from './components/TodoList';

const App = () => {
	return (
		<div className=' bg-yellow-300 w-full h-auto flex justify-center items-start p-10'>
      <div>

			<span className=' font-bold text-3xl text-black   '   style={{
        backgroundImage: 'linear-gradient(to right, black, red)',
        backgroundClip: 'text',
        color: 'transparent'
      }}>My Todo List</span>
			<AddTodoForms />
      <TodoList/>
      </  div>
		</div>
	);
};

export default App;