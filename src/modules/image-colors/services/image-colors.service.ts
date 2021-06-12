import * as namer from 'color-namer';
import * as ColorThief from 'colorthief';
import { injectable } from 'inversify';

import { colorEmojiMap } from '../constants/color-emoji.const';
import { ImageColors } from '../interfaces';

@injectable()
export class ImageColorsService {
    colorsFromImage(imageUrl: string): Promise<ImageColors> {
        return ColorThief.getPalette(imageUrl, 2)
            .then((colors: number[][]) => colors.map(this.thiefColorToHex))
            .then((colors: [string, string]): ImageColors => {
                const namedColors = colors.map((color) => namer(color));
                const colorNames = namedColors.map((color) => color.basic[0].name);
                const colorEmoji = colorNames.map((colorName) => colorEmojiMap.get(colorName));
                return {
                    colors,
                    colorEmoji,
                };
            });
    }

    private thiefColorToHex(channelColors: number[]) {
        return '#' + channelColors
            .map((color) => {
                const colorHex = color.toString(16);

                return colorHex.length === 1 ?
                    '0' + colorHex :
                    colorHex;
            })
            .join('')
            .toUpperCase();
    }
}
