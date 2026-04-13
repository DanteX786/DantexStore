import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Box, Typography, Button, TextField } from "@mui/material";

export const ApiRycAxius = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    const source = axios.CancelToken.source(); 

    axios.get(`https://rickandmortyapi.com/api/character`, {
      params: { page: page, name: query },
      cancelToken: source.token
    })
    .then(({ data }) => {
      setCharacters(data.results || []);
      setInfo(data.info || {});
    })
    .catch((error) => {
      if (axios.isCancel(error)) return;
      if (error.response?.status === 404) {
        setCharacters([]);
        setInfo({});
        return;
      }
      console.error(error);
    });

    return () => source.cancel();
  }, [page, query]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Personajes Rick & Morty
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Buscar personaje..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        sx={{ mb: 4, maxWidth: 400, display: 'block' }}
      />

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: 2 
      }}>
        {characters.length > 0 ? characters.map(char => (
          <Box key={char.id} sx={{ p: 2, border: '1px solid #333', borderRadius: 2, textAlign: 'center' }}>
            <img 
              src={char.image} 
              alt={char.name} 
              style={{ width: '100%', borderRadius: '8px' }} 
            />
            <Typography variant="h6">{char.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {char.gender}
            </Typography>
          </Box>
        )) : <Typography>Cargando...</Typography>}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => setPage(page - 1)} 
          disabled={!info.prev}
        >
          Anterior
        </Button>
        
        <Typography>Página {page}</Typography>
        
        <Button 
          variant="contained" 
          onClick={() => setPage(page + 1)} 
          disabled={!info.next}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};