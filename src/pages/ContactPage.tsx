import { FC, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from '../apps/redux/hooks';
import { fetchContacts } from '../apps/redux/actions/contactsActions';

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.contacts.items);
  const contactById = (contactId: string | undefined) =>
    contacts.find(contact => contact.id === contactId);
  const contact = contactById(contactId);
  const loading = useAppSelector(state => state.contacts.loading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!contact) {
    return <Navigate to="/contact" replace />;
  }

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        <ContactCard contact={contact} />
      </Col>
    </Row>
  );
};
