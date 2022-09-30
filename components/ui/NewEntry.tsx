import { useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {
        !isAddingEntry ? (
          <>
            <Button
              fullWidth
              startIcon={<AddCircleOutlineOutlined />}
              variant='outlined'
              onClick={() => setIsAddingEntry(true)}
            >
              Agregar Tarea
            </Button>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              multiline
              sx={{ marginTop: 2, marginBottom: 1 }}
              label='Nueva entrada'
              placeholder='Nueva entrada'
              value={inputValue}
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              onBlur={() => setTouched(true)}
              error={inputValue.length <= 0 && touched}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Button variant='text' onClick={() => setIsAddingEntry(false)}>
                Cancelar
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        )
      }
    </Box>
  )
}
