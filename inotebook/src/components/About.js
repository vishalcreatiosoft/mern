import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export const About = () => {

    const data = useContext(noteContext);
    

    return (
        <div>
            This about page by {data.name}
           
        </div>
    )
}
