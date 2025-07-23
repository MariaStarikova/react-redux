import { FC, useEffect, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Navigate, useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { contactsStore } from '../app/store/contactsStore';

export const ContactPage: FC = observer(() => {
  const { contactId } = useParams<{ contactId: string }>();
  const { contacts, loading } = contactsStore;
  const contact = useMemo(() => {
    return contacts.find(contact => contact.id === contactId);
  }, [contacts, contactId]);

  useEffect(() => {
    contactsStore.get();
  }, []);

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
});
