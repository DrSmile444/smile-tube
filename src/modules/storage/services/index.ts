import { Container } from 'inversify';
import 'reflect-metadata';

import { StorageTypes } from '../storage-types';
import { StorageService } from './storage.service';

const storageContainer = new Container();
storageContainer.bind<StorageService>(StorageTypes.StorageService).to(StorageService);

export const storageService = storageContainer.get<StorageService>(StorageTypes.StorageService);

export * from './storage.service';
