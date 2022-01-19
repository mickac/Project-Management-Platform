import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function InsetList({ users }) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
    {users.map((user) =>  (
    <React.Fragment key={user.user_id}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            { user.is_owner ? <StarIcon /> : null }
          </ListItemIcon>
          <ListItemText primary={ user.full_name } />
        </ListItemButton>
      </ListItem>
    </React.Fragment>
    ))}
    </List>
  );
}