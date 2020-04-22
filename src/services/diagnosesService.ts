import HttpService from './httpService';

export interface Diagnosis {
  _id: string;
  name: string;
  createdBy: string;
}

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const DiagnosisService = {
  async getDiagnoses() {
    const diagnoses = await HttpService.get<Diagnosis[]>(baseEndPoint + '/diagnosis');
    return diagnoses.map(diagnosis => diagnosis.name);
  }
};

export default DiagnosisService;
