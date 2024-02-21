import language from './helpers/setLanguage'

const strings = {
  de: {
    apply_filter: 'Anwenden',
    additionalInformation: 'Kurzbeschrieb',
    inclusionCriteria: 'Teilnahmekriterien',
    exclusionCriteria: 'Ausschlusskriterien',
    financingRatio: 'Finanzierung',
    relevanceForRegionalDevelopmentStrategies:
      'Relevanz für Regionale Entwicklungsstrategien (RES)',
    moreInformation: 'Mehr Informationen',
    externalProjects: 'Projekte',
    policies: 'Zugehörige Politik',
    authorities: 'Förderstelle',
    beneficiaries_label: 'Begünstigte',
    application: 'Gesuchstellung',
    topics_label: 'Thema',
    projectTypes_label: 'Projekttyp',
    promoter: 'Projektträger',
    supportTypes_label: 'Unterstützungsarten',
    regions_label: 'Geographische Region',
    contacts: 'Kontakt',
    reset_filter: 'Filter entfernen',
    reset_all_filters: 'Zurücksetzen',
    provinces_label: 'Kantonale Finanzhilfen',
    overview: 'Keine ungesicherten Änderungen',
    error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    noFsiFound: 'Keine Finanzhilfen gefunden.',
    print: 'Drucken',
    read_more: 'Mehr erfahren',
    beneficiaries: {
      label: 'Begünstigte',
      name: 'Einschränken nach Begünstigten',
      description: 'Wählen Sie aus, für wen Sie die Finanzhilfe beantragen möchten.'
    },
    regions: {
      label: 'Geographische Region',
      name: 'Einschränken nach geographischer Region',
      description: 'Wählen Sie aus, für welchen Ort Sie die Finanzhilfe beantragen möchten.'
    },
    topics: {
      label: 'Thema',
      name: 'Einschränken nach thematischen Schwerpunken',
      description: 'Wählen Sie passende thematische Schwerpunkte aus.'
    },
    projectTypes: {
      label: 'Projekttyp',
      name: 'Einschränken nach Projekttyp',
      description: 'Wählen Sie aus, für welche Projekttypen nach Finanzhilfe gesucht wird.'
    },
    supportTypes: {
      label: 'Unterstützungsart',
      name: 'Einschränken nach Unterstützungsarten',

      description: 'Wählen Sie aus, welche Unterstützungsarten für das Projekt infrage kommen.'
    }
  },
  fr: {
    additionalInformation: 'Brève description',
    inclusionCriteria: 'Critères de participation',
    exclusionCriteria: 'Critères d’exclusion',
    financingRatio: 'Financement',
    relevanceForRegionalDevelopmentStrategies:
      'Pertinence pour les stratégies de développement régional (SDR)',
    moreInformation: 'Plus d’informations',
    externalProjects: 'Projets',
    policies: 'Politique appliquée',
    authorities: 'Organisme d’encouragement',
    application: 'Requête',
    beneficiaries_label: 'Bénéficiaires',
    promoter: 'Promoteurs',
    beneficiaries_title: 'Restreindre en fonction des bénéficiaires',
    beneficiaries_byline: "Sélectionnez pour qui vous souhaitez demander l'aide financière.",
    regions_label: 'Région géographique',
    regions_title: 'Restreindre en fonction de la région géographique',
    regions_byline: "Sélectionnez le site pour lequel vous souhaitez demander l'aide financière.",
    topics_label: 'Thème',
    topics_title: 'Restreindre en fonction des priorités thématiques',
    topics_byline: 'Sélectionnez les priorités thématiques appropriées',
    projectTypes_label: 'Type de projet',
    projectTypes_title: 'Restreindre selon le type de projet',
    projectTypes_byline:
      'Sélectionnez les types de projets pour lesquels vous cherchez des aides financières.',
    supportTypes_label: 'Type de soutien',
    supportTypes_title: 'Restreindre en fonction des types de soutien',
    supportTypes_byline:
      'Sélectionnez les types de soutien qui entrent en ligne de compte pour le projet.',
    contacts: 'Contact',
    apply_filter: 'Appliquer',
    reset_filter: 'Appliquer',
    reset_all_filters: 'Réinitialiser le Filtre',
    provinces_label: 'Aides financières cantonales',
    overview: 'Overview',
    error: "Une erreur s'est produite. Veuillez réessayer..",
    noFsiFound: 'Aucune aide financière trouvée.',
    print: 'Imprimer',
    read_more: 'Pour en savoir plus',
    beneficiaries: {
      label: 'Bénéficiaires',
      name: 'Restreindre en fonction des bénéficiaires',
      description: "Sélectionnez pour qui vous souhaitez demander l'aide financière."
    },
    regions: {
      label: 'Région géographique',
      name: 'Restreindre en fonction de la région géographique',
      description: "Sélectionnez le site pour lequel vous souhaitez demander l'aide financière."
    },

    topics: {
      label: 'Priorité thématique',
      name: 'Restreindre en fonction des priorités thématiques',
      description: 'Sélectionnez les priorités thématiques appropriées.'
    },
    projectTypes: {
      label: 'Type de projet',
      name: 'Restreindre selon le type de projet',
      description:
        'Sélectionnez les types de projets pour lesquels vous cherchez des aides financières.',
      color: '#966450'
    },
    supportTypes: {
      label: 'Type de soutien',
      name: 'Restreindre en fonction des types de soutien',
      description:
        'Wélectionnez les types de soutien qui entrent en ligne de compte pour le projet.'
    }
  },
  it: {
    additionalInformation: 'Breve descrizione',
    inclusionCriteria: 'Criteri di partecipazione',
    exclusionCriteria: 'Criteri di esclusione',
    financingRatio: 'Finanziamento',
    relevanceForRegionalDevelopmentStrategies:
      'Rilevanza per le strategie regionali di sviluppo (SRS)',
    moreInformation: 'Maggiori informazioni',
    externalProjects: 'Progetti',
    promoter: 'Promotori',
    policies: 'Politica di riferimento',
    authorities: 'Ufficio/ente finanziatore',
    application: 'Domanda di finanziamento',
    beneficiaries_label: 'Beneficiari',
    beneficiaries_title: 'Restreindre en fonction des bénéficiaires',
    beneficiaries_byline: "Sélectionnez pour qui vous souhaitez demander l'aide financière.",
    regions_label: 'Regione geografica',
    regions_title: 'Restreindre en fonction de la région géographique',
    regions_byline: "Sélectionnez le site pour lequel vous souhaitez demander l'aide financière.",
    topics_label: 'Tema',
    topics_title: 'Restreindre en fonction des priorités thématiques',
    topics_byline: 'Sélectionnez les priorités thématiques appropriées',
    projectTypes_label: 'Tipo di progetto',
    projectTypes_title: 'Restreindre selon le type de projet',
    projectTypes_byline:
      'Sélectionnez les types de projets pour lesquels vous cherchez des aides financières.',
    supportTypes_label: 'Tipo di aiuto finanziario',
    supportTypes_title: 'Restreindre en fonction des types de soutien',
    supportTypes_byline:
      'Sélectionnez les types de soutien qui entrent en ligne de compte pour le projet.',
    contacts: 'Contatto',
    apply_filter: 'Applica',
    reset_filter: 'Rimuovi filtro',
    reset_all_filters: 'Ripristinare il Filtro',
    provinces_label: 'Aiuti finanziari dei Cantoni',
    overview: 'Overview',
    error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    noFsiFound: 'Nessun aiuto finanziario trovato.',
    print: 'Stampare',
    read_more: 'Per saperne di più',
    beneficiaries: {
      label: 'Beneficiari',
      name: 'Filtra in base ai beneficiari',
      description: "Seleziona l'aiuto finanziario"
    },
    regions: {
      label: 'Regione geografica',
      name: 'Filtra in base alla regione geografica',
      description: "Seleziona la località per la quale si chiede l'aiuto finanziario"
    },
    topics: {
      label: 'Priorità tematica',
      name: 'Filtra per priorità tematica',
      description: 'Seleziona la priorità tematica ',
      color: '#4B4B4B'
    },
    projectTypes: {
      label: 'Tipo di progetto',
      name: 'Filtra per tipo di progetto',
      description: "Seleziona il tipo di progetto per il quale si chiede l'aiuto finanziario",
      color: '#966450'
    },
    supportTypes: {
      label: 'Tipo di aiuto finanziario',
      name: 'Filtra per tipo di aiuto finanziario',
      description:
        'Seleziona il tipo di aiuto finanziario considerato per il progetto da realizzare',
      color: '#4B4B4B'
    }
  }
}

export default strings[language]
