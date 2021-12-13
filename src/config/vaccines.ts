type VaccineData = {
    id: string;
    title: string;
    anamnesisUrl: string;
    infosUrl: string;
    notice?: string;
};

export const vaccines: Record<string, Record<string, VaccineData>> = {
    de: {
        MD: {
            id: 'MD',
            title: 'Moderna',

            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        BT: {
            id: 'BT',
            title: 'Biontech Pfizer (Comirnaty)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        AZ: {
            id: 'AZ',
            title: 'Astra Zeneca (Vaxzevria)',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
        JJ: {
            id: 'JJ',
            title: 'Johnson & Johnson',
            anamnesisUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Einwilligung-de.pdf?__blob=publicationFile',
            infosUrl:
                'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19-Vektorimpfstoff/Aufklaerungsbogen-de.pdf?__blob=publicationFile',
        },
    },
};
