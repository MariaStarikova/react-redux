import React, { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from '../apps/redux/hooks';
import { fetchContacts } from '../apps/redux/actions/contactsActions';

export const FavoritListPage = memo(() => {
  const dispatch = useAppDispatch();
  const allContacts = useAppSelector(state => state.contacts.items);
  const favoriteContactIds = useAppSelector(state => state.favorites.contactIds);
  const favoriteContacts = allContacts.filter(contact => favoriteContactIds.includes(contact.id));
  const loading = useAppSelector(state => state.contacts.loading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map(contact => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
