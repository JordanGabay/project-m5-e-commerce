import React  from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Searchbar = () => {
    const history = useHistory()
    
    const handleSearch = (event) => {
        event.preventDefault()
        history.push(`/products?search=${event.target.search.value}`)
        event.target.search.value = ''
    }

    return (
        <Wrapper>
            <form onSubmit={(e) => handleSearch(e)}>
                <Input  name='search' />
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 50px;
    text-align: center;
`

const Input = styled.input`
    width: calc(100vw - 200px)
`

export default Searchbar