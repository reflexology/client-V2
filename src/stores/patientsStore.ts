import { Patient } from 'services/patientService';
import { makeAutoObservable } from 'mobx';
import RootStore from './rootStore';
class PatientsStore {
  private rootStore: RootStore;

  patients: Patient[] = [];
  testArray: number[] = [1, 2, 3];

  constructor(rootStore: RootStore) {
    makeAutoObservable(
      this,

      //@ts-ignore
      { rootStore: false }
    );
    this.rootStore = rootStore;
  }
}

export default PatientsStore;
