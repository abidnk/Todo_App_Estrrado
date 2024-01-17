import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoReducer';
export function AddTodoForms () {
  
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) {
      alert('Please enter a task before submitting.');
      return;
    }
    dispatch(addTodo(value)); 
    setValue('');
    console.log('user entered: ' + value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={onSubmit} className='mt-10   w-[500px] flex justify-between'>
      <input
        type='text'
        className='h-14 bg-white text-black  rounded-md font-semibold px-4'
        placeholder='Add todo...'
        value={value}
        ref={inputRef}
        onChange={(event) => setValue(event.target.value)}
      />

      <button type='submit' className="btn btn-outline">
        Submit
      </button>
    </form>
  );
};

// export default AddTodoForms;
