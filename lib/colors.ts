import { Vibrant } from "node-vibrant/node";

export interface ColorPalette {
  vibrant: string;
  darkVibrant: string;
  muted: string;
}

export async function extractPalette(imageUrl: string): Promise<ColorPalette> {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    return {
      vibrant: palette.Vibrant?.hex ?? "#c9b99a",
      darkVibrant: palette.DarkVibrant?.hex ?? "#1a1a1a",
      muted: palette.Muted?.hex ?? "#6a6460",
    };
  } catch {
    return {
      vibrant: "#c9b99a",
      darkVibrant: "#1a1a1a",
      muted: "#6a6460",
    };
  }
}
