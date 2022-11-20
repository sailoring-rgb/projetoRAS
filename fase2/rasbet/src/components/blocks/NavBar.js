import '../../css/blocks/NavBar.scss'

export const NavBar = ({}) => {
    const isSelected = (path) => path === window.location.pathname

    return (
        <nav>
            <h2>RasBet</h2>

            <ul>
                <li className={isSelected('/todos') ? 'selected' : ''}>
                    <a href={'todos'}>Todos</a>
                </li>
                <li className={isSelected('/football') ? 'selected' : ''}>
                    <a href={'football'}>Futebol</a>
                </li>
                <li className={isSelected('/basketball') ? 'selected' : ''}>
                    <a href={'basketball'}>Basquetebol</a>
                </li>
                <li className={isSelected('/tenis') ? 'selected' : ''}>
                    <a href={'tenis'}>Ténis</a>
                </li>
                <li className={isSelected('/motogp') ? 'selected' : ''}>
                    <a href={'motogp'}>MotoGP</a>
                </li>
            </ul>

            <label>Bem vindo, Carlos</label>
        </nav>
    )
}