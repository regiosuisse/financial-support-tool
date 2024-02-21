import axios from 'axios'
import transformFsis from '../data/transformFsis'
import {transformFilter} from '../data/transformFilter'
import normalizePayload from '../data/normalizePayload';

export default async function(language) {

  let payload = await Promise.all([
    axios.get('https://tools.regiosuisse.ch/api/v1/financial-supports'),
    axios.get('https://tools.regiosuisse.ch/api/v1/states'),
    axios.get('https://tools.regiosuisse.ch/api/v1/authorities'),
    axios.get('https://tools.regiosuisse.ch/api/v1/beneficiaries'),
    axios.get('https://tools.regiosuisse.ch/api/v1/topics'),
    axios.get('https://tools.regiosuisse.ch/api/v1/project-types'),
    axios.get('https://tools.regiosuisse.ch/api/v1/instruments'),
    axios.get('https://tools.regiosuisse.ch/api/v1/geographic-regions'),
  ]);

  payload = payload.map(res => res.data);

  payload = normalizePayload(language, ...payload);

  return {
    subsidyPrograms: transformFsis(payload.subsidyPrograms, payload.filters),
    filters: transformFilter(payload.filters)
  }

}
