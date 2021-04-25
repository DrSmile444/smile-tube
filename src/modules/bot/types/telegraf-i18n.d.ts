import * as I18origin from '@edjopato/telegraf-i18n';

import { Language } from '../interfaces';

declare module '@edjopato/telegraf-i18n' {
  // @ts-ignore
  type I18n = {
    locale(languageCode: Language): void;
  } & I18origin.I18n;

  export function match(resourceKey: string, templateData?: any): string;
}
