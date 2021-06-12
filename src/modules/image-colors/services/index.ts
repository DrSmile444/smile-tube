import { Container } from 'inversify';
import 'reflect-metadata';

import { ImageColorsTypes } from '../image-colors-types';
import { ImageColorsService } from './image-colors.service';


const imageColorsContainer = new Container();
imageColorsContainer.bind<ImageColorsService>(ImageColorsTypes.ImageColorsService).to(ImageColorsService);

export const imageColorsService = imageColorsContainer.get<ImageColorsService>(ImageColorsTypes.ImageColorsService);

export * from './image-colors.service';
