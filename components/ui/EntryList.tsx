import React, { FC, useContext, useMemo } from 'react';
import { Box, List, Paper } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries } = useContext(EntriesContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

  console.log(entriesByStatus);
  
  return (
    <Box>
      <Paper
        sx={{
          backgroundColor: 'transparent',
          height: 'calc(100vh - 180px)',
          overflow: 'scroll',
          padding: '1px 3px'
        }}>
        <List sx={{ opacity: 1 }}>
          {
            entriesByStatus.map(entry => <EntryCard key={entry._id} entry={entry} />)
          }
        </List>
      </Paper>
    </Box>
  )
}