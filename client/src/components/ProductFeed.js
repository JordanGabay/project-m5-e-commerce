import React, { useState, useEffect } from 'react'
import styled from 'styled-components'


const Homepage = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])


    return (
        <ProductGrid>
            {items.map(item => 
                <ItemWrapper>
                    <Image src={item.imageSrc}/>
                    <div>{item.name}</div>
                </ItemWrapper>
            )}
        </ProductGrid>
    )
}

const ProductGrid = styled.div`
    display: flex;
    flex-flow: row wrap;
`

const ItemWrapper = styled.div`

`

const Image = styled.img`

`

export default Homepage