import { DialectId } from '../types';

export interface DialectMatrixProps {
  activeDialect: DialectId;
  onSelectDialect: (dialect: DialectId) => void;
  className?: string;
}

export type ComparisonMode = 'matrix' | 'cards';

export interface DialectCategoryFilter {
  id: string;
  label: string;
}
