// https://docs.google.com/spreadsheets/d/1sV1AjJ3i2gJCu31b76CoHA85w-2SL2_XhcT_IkjpFrk/edit?pli=1#gid=557196378

import { Vaccine } from 'types';

type VaccinationPdf = {
    label: string;
    url: string;
};

export type VaccineData = {
    id: string;
    name: string;
    pdfs: VaccinationPdf[];
    pdfDescription: string;
    notice?: string;
};

export const vaccines: Record<string, Record<Vaccine, VaccineData>> = {
    de: {
        mrna: {
            id: 'mRNA',
            name: 'mRNA-Impfstoff (Moderna oder BioNTech)',
            pdfDescription:
                'Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.',
            pdfs: [
                {
                    label: 'Anamnesebogen',
                    url: 'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
                },
            ],
        },
        moderna: {
            id: 'MD',
            name: 'Moderna (Spikevax®)',
            pdfDescription:
                'Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.',
            pdfs: [
                {
                    label: 'Anamnesebogen',
                    url: 'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
                },
            ],
        },
        biontech: {
            id: 'BT',
            name: 'BioNTech/Pfizer (Comirnaty®)',
            pdfDescription:
                'Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.',
            pdfs: [
                {
                    label: 'Anamnesebogen',
                    url: 'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
                },
            ],
        },
        biontechchildren: {
            id: 'BTch',
            name: 'BioNTech/Pfizer (Comirnaty®) für 5- bis 11-jährige',
            pdfDescription:
                'Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.',
            pdfs: [
                {
                    label: 'Anamnesebogen',
                    url: 'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
                },
            ],
        },
        astrazeneca: {
            id: 'AZ',
            name: 'AstraZeneca (Vaxzevria®)',
            pdfDescription:
                'Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.',
            pdfs: [
                {
                    label: 'Anamnesebogen',
                    url: 'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
                },
            ],
        },
        jnj: {
            id: 'JJ',
            name: 'Johnson & Johnson (Janssen®)',
            pdfDescription:
                'Vor dem Impftermin und Ihrem medizinischen Aufklärungsgespräch können Sie sich das Aufklärungsmerkblatt zum Impfstoff und die Einwilligungserklärung zur Impfung als PDF-Datei herunterladen und ausdrucken. Dort erhalten Sie ebenfalls wichtige Informationen zu Ihrer Impfung und dem Impfstoff gegen das Coronavirus.',
            pdfs: [
                {
                    label: 'Anamnesebogen',
                    url: 'https://www.rki.de/DE/Content/Infekt/Impfen/Materialien/Downloads-COVID-19/Einwilligung-de.pdf?__blob=publicationFile',
                },
            ],
        },
    },
};
