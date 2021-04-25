import * as I18origin from '@edjopato/telegraf-i18n';
import { TemplateData } from '@edjopato/telegraf-i18n/dist/source/types';

import { Language } from '../interfaces';

declare module '@edjopato/telegraf-i18n' {
  // @ts-ignore
  type I18n = {
    locale(languageCode: Language): void;
    t(resourceKey: string, templateData?: Readonly<TemplateData>): string;
  } & I18origin.I18n;

  export function match(resourceKey: string, templateData?: any): string;
}
