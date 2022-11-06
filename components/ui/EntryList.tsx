import React, { DragEvent, FC, useContext, useMemo, useEffect } from 'react';
import { Box, List, Paper } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  useEffect(() => {
    console.log('----', entries, status);
  }, [entries])
  

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  }

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  return (
    <Box
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          backgroundColor: 'transparent',
          height: 'calc(100vh - 180px)',
          overflow: 'scroll',
          padding: '1px 3px'
        }}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => <EntryCard key={entry._id} entry={entry} />)
          }
        </List>
      </Paper>
    </Box>
  )
}