

const getGames = () => {
    console.log(`SENDING TO => ${process.env.REACT_APP_API_URL}/games`)
    return fetch(`${process.env.REACT_APP_API_URL}/games`)
        .then(res => res.json());

        
};

export {
    getGames
}