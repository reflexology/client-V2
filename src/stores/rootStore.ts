import { configure } from 'mobx';

import PatientsStore from './patientsStore';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true
});
class RootStore {
  patientStore: PatientsStore;
  constructor() {
    this.patientStore = new PatientsStore(this);
  }
}
export default RootStore;
