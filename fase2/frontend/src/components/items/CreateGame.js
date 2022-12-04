import React from 'react'
import '../../css/items/CreateGame.scss'

export const CreateGame = ({value, onChange, type, placeholder}) => {
  return ( 
        <input
            className='create-game-input'
            value={value}
            type={type}
            placeholder={placeholder}
        />
    );
}

//<label for="Name">Name:</label>
//<input type="text" id="Name" name="Name" placeholder="Jane Doe"></input>