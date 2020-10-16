import { atom } from 'recoil';
import { Treatment, TreatmentAndBalance } from 'services/treatmentService';

export const treatmentsAtom = atom<Treatment[]>({
  key: 'treatments',
  default: []
});

export const currentTreatmentAtom = atom<Partial<TreatmentAndBalance> | undefined>({
  key: 'currentTreatment',
  default: undefined
});

export const isFetchingTreatmentsAtom = atom<boolean>({
  key: 'isFetchingTreatments',
  default: true
});
