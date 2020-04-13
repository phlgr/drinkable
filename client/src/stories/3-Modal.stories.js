import React from 'react';
import Modal from '../components/Modal';

export default {
  title: 'Modal',
  component: Modal,
};

export const DefaultModal = () => <Modal active={true} ingredient="Cola" />;
export const NoModal = () => <Modal active={false} ingredient="Cola" />;
