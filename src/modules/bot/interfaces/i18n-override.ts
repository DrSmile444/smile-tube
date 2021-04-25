import { I18n } from '@edjopato/telegraf-i18n';
import { TemplateData } from '@edjopato/telegraf-i18n/dist/source/types';

import { Language } from './language';

export type I18nOverride = I18n & {
    locale(languageCode: Language): void;
    t(resourceKey: string, templateData?: Readonly<TemplateData>): string;
};
