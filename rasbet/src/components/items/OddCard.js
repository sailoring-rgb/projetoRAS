import '../../css/items/OddCard.scss'

export const OddCard = ({odd}) => {
    return (
        <div className='odd-card'>
            <label>{ odd.name }</label>
            <label>{ odd.price }</label>
        </div>
    )
}