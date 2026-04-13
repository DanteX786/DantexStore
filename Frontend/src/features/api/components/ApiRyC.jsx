
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from "@mui/material";

export const ApiRyC = () => {
    const [characters, setCharacters] = useState(null) 
    const [page, setPage] = useState(1) 
    const [info, setInfo] = useState({}) 
useEffect(()  => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(response => response.json())
    .then(data => {
        setCharacters(data.results)
        setInfo(data.info)
    })
}, [page]);

return (
<Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>Personajes Rick & Morty</Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
        {characters ? characters.map(char => (
            <Box key={char.id} sx={{ p: 2, border: '1px solid #333', borderRadius: 2, textAlign: 'center' }}>
                <img src={char.image} alt={char.name} style={{ width: '100%', borderRadius: '8px' }} />
            <Typography variant="h6">{char.name}</Typography>
            <Typography variant="body2" color="text.secondary">{char.gender}</Typography>
        </Box>
        )) : <p>Cargando...</p>}
    </Box>

    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => setPage(page - 1)} disabled={!info.prev}>Anterior</Button>
        <Typography>Página {page}</Typography>
        <Button variant="contained" onClick={() => setPage(page + 1)} disabled={!info.next}>Siguiente</Button>
        </Box>
    </Box>
);
}

