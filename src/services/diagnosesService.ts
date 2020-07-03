import HttpService from './httpService';

export interface Diagnosis {
  _id: string;
  name: string;
  createdBy: string;
}

const DiagnosisService = {
  async getDiagnoses() {
    const diagnoses = await HttpService.get<Diagnosis[]>('/diagnosis');
    return diagnoses.map(diagnosis => diagnosis.name);
  },

  addDiagnoses(diagnoses: string[]) {
    return HttpService.post<Diagnosis[]>(
      '/diagnosis/multiple',
      diagnoses.map(diagnosis => ({ name: diagnosis }))
    );
  }
};

export default DiagnosisService;
