import { I18nOverride } from '../interfaces';

declare module '@edjopato/telegraf-i18n' {
  // @ts-ignore
  type I18n = I18nOverride;

  export function match(resourceKey: string, templateData?: any): string;
}
