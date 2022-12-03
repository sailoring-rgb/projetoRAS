import React from 'react'
import '../../css/items/SignInInput.scss'

export const SignInInput = ({type, placeholder, value, onChange}) => {
  return ( 
        <input
            className='signin-input'
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
        />
    );
};