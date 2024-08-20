import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { Button } from 'react-bootstrap';

const TodoItem = ({ detail, onEdit, onDelete }) => {
  return (
    <div className="my-card mb-4 d-flex justify-content-between">
      <div>
        <h5 className='mb-3'>{ detail.activity_name }</h5>
        <p className='text-muted my-time'>{ moment(detail.created_at).utc(true).utcOffset(moment(detail.created_at).format("Z")).format("DD MMM YYYY HH:mm") }</p>
      </div>
      <div className='text-nowrap'>
        {/* <Button variant="outline-warning" size='sm' onClick={() => onEdit(detail.id)} className='me-1'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button> */}
        <Button variant="outline-danger" size='sm' onClick={() => onDelete(detail.id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
