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
            id: 'mRNA',
            name: 'mRNA-Impfstoff (Moderna oder BioNTech)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        moderna: {
            id: 'MD',
            name: 'Moderna (Spikevax®)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        biontech: {
            id: 'BT',
            name: 'BioNTech/Pfizer (Comirnaty®)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        biontechchildren: {
            id: 'BTch',
            name: 'BioNTech/Pfizer (Comirnaty®) für 5- bis 11-jährige',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        astrazeneca: {
            id: 'AZ',
            name: 'AstraZeneca (Vaxzevria®)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        jnj: {
            id: 'JJ',
            name: 'Johnson & Johnson (Janssen®)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
    },
};
