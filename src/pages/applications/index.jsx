import { useSelector } from 'react-redux'

export const Applications = () => {
    const candidates = useSelector(state => state.candidates)
    return (
        <p>applications</p>
    )
}