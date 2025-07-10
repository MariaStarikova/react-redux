import React, { memo, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export interface FilterFormValues {
  name: string;
  groupId: string;
}

export interface FilterFormProps {
  groups: GroupContactsDto[];
  onFilter: (name: string, groupId: string) => void;
  initialName?: string;
  initialGroupId?: string;
}

export const FilterForm = memo<FilterFormProps>(props => {
  const { groups, onFilter, initialName = '', initialGroupId = '' } = props;
  const [name, setName] = useState(initialName);
  const [groupId, setGroupId] = useState(initialGroupId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(name, groupId);
  };

  const handleReset = () => {
    setName('');
    setGroupId('');
    onFilter('', '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onFilter(newName, groupId);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupId = e.target.value;
    setGroupId(newGroupId);
    onFilter(name, newGroupId);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row xxl={4} className="g-4">
        <Col>
          <InputGroup className="mb-3">
            <Form.Control
              id={'name'}
              name={'name'}
              value={name}
              onChange={handleNameChange}
              placeholder="name"
              aria-label="name"
            />
          </InputGroup>
        </Col>
        <Col>
          <Form.Select
            id={'groupId'}
            name={'groupId'}
            aria-label="Поиск по группе"
            value={groupId}
            onChange={handleGroupChange}
          >
            <option>Open this select menu</option>
            {groups.map(groupContacts => (
              <option value={groupContacts.id} key={groupContacts.id}>
                {groupContacts.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              Применить
            </Button>
            <Button type="button" variant="outline-secondary" onClick={handleReset}>
              Сбросить
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
});
