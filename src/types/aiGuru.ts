import { DialectId } from '../types';

export interface AiGuruModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDialect: DialectId;
}
