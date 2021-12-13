import { Vaccine } from 'types';

type VaccineData = {
    id: string;
    name: string;
    anamnesisUrl: string;
    infosUrl: string;
    notice?: string;
};

export const vaccines: Record<string, Record<Vaccine, VaccineData>> = {
    de: {
        mrna: {
            id: 'MRNA',
            name: 'MRNA',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        moderna: {
            id: 'MD',
            name: 'Moderna',

            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        biontech: {
            id: 'BT',
            name: 'Biontech Pfizer (Comirnaty)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        astrazeneca: {
            id: 'AZ',
            name: 'Astra Zeneca (Vaxzevria)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        'johnson-johnson': {
            id: 'JJ',
            name: 'Johnson & Johnson',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
    },
};
