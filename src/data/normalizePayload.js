import translate from '../helpers/translate';

export default function normalizePayload (locale, financialSupports, states, authorities,
                                          beneficiaries, topics, projectTypes, instruments, geographicRegions) {

  let filters = {};

  filters.provinces = states.filter(e => !e.context || e.context === 'financial-support')
    .map(e => ({ ...e, label: translate('name', e, locale) }));
  filters.authorities = authorities.filter(e => !e.context || e.context === 'financial-support')
    .map(e => ({ ...e, label: translate('name', e, locale), supportsProvinces: e.isStateSupported }));
  filters.beneficiaries = beneficiaries.filter(e => !e.context || e.context === 'financial-support')
    .map(e => ({ ...e, label: translate('name', e, locale) }));
  filters.topics = topics.filter(e => !e.context || e.context === 'financial-support')
    .map(e => ({ ...e, label: translate('name', e, locale) }));
  filters.projectTypes = projectTypes.filter(e => !e.context || e.context === 'financial-support')
    .map(e => ({ ...e, label: translate('name', e, locale) }));
  filters.supportTypes = instruments.filter(e => !e.context || e.context === 'financial-support')
    .map(e => ({ ...e, label: translate('name', e, locale) }));
  filters.regions = geographicRegions.filter(e => !e.context || e.context === 'financial-support')
    .map(e => ({ ...e, label: translate('name', e, locale) }));

  // remove unused provinces
  filters.provinces = filters.provinces.filter(e => financialSupports.find(a => a.states.find(b => b.id === e.id)));

  let subsidyPrograms = financialSupports.filter(e => e.isPublic)
    .map(e => ({
      ...e,
      title: translate('name', e, locale),
      policies: translate('policies', e, locale),
      description: translate('description', e, locale),
      additionalInformation: translate('additionalInformation', e, locale),
      inclusionCriteria: translate('inclusionCriteria', e, locale),
      exclusionCriteria: translate('exclusionCriteria', e, locale),
      application: translate('application', e, locale),
      financingRatio: translate('financingRatio', e, locale),
      relevanceForRegionalDevelopmentStrategies: translate('res', e, locale),
    }))
    .map(e => ({
      ...e,
      startingDate: e.startDate ? new Date(e.startDate).toLocaleDateString('de-CH') : null,
      endDate: e.endDate ? new Date(e.endDate).toLocaleDateString('de-CH') : null,
    }))
    .map(e => ({
      ...e,
      logo: translate('logo', e, locale) ? 'https://tools.regiosuisse.ch/api/v1/files/view/'+translate('logo', e, locale).id+'.'+translate('logo', e, locale).extension : null,
    }))
    .map(e => ({
      ...e,
      moreInformation: (translate('links', e, locale) || []).map(a => ({ title: a.label, url: a.value })),
    }))
    .map(e => ({
      ...e,
      pdf: 'https://tools.regiosuisse.ch/api/v1/financial-supports/export/'+e.id+'-'+locale+'.pdf',
    }))
    .map(e => ({
      ...e,
      contacts: translate('contacts', e, locale),
    }))
    .map(e => ({
      ...e,
      projects: [],
      externalProjects: [],
      relatedRecords: [],
    }))
    .map(e => ({
      ...e,
      provinces: e.states.map(a => (filters.provinces.find(b => a.id === b.id))),
      authorities: e.authorities.map(a => (filters.authorities.find(b => a.id === b.id))),
      beneficiaries: e.beneficiaries.map(a => (filters.beneficiaries.find(b => a.id === b.id))),
      topics: e.topics.map(a => (filters.topics.find(b => a.id === b.id))),
      projectTypes: e.projectTypes.map(a => (filters.projectTypes.find(b => a.id === b.id))),
      supportTypes: e.instruments.map(a => (filters.supportTypes.find(b => a.id === b.id))),
      regions: e.geographicRegions.map(a => (filters.regions.find(b => a.id === b.id))),
    }));

  return {
    filters,
    subsidyPrograms,
  };

}