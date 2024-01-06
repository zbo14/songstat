import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { capitalize, round } from '@/util';

interface Stat {
  field: string;
  alias?: string;
  transformer?: (input: any, data: Record<string, any>) => any;
}

const keys = [
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'G#/Ab',
  'A',
  'A#/Bb',
  'B',
];

function toPercentage(x: number): string {
  return `${round(round(x, 2) * 100)}%`;
}

const analysisStats: Stat[] = [
  {
    field: 'key',

    transformer(keyIndex: number, analysis: Record<string, any>): string {
      return `${keys[keyIndex]} ${
        analysis.track.mode ? 'major' : 'minor'
      } (confidence: ${toPercentage(analysis.track.key_confidence)})`;
    },
  },
  {
    field: 'tempo',

    transformer(bpm: number, analysis: Record<string, any>): string {
      return `${round(bpm, 0)} bpm (confidence: ${toPercentage(
        analysis.track.tempo_confidence
      )})`;
    },
  },
  {
    field: 'time_signature',
    alias: 'Time signature',

    transformer(meter: number, analysis: Record<string, any>) {
      return `${meter}/4 (confidence: ${toPercentage(
        analysis.track.time_signature_confidence
      )})`;
    },
  },
];

const featureStats: Stat[] = [
  {
    field: 'loudness',

    transformer(db: number) {
      return `${round(db, 1)} db`;
    },
  },
  {
    field: 'energy',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'danceability',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'valence',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'liveness',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'instrumentalness',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'acousticness',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'speechiness',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
];

export default async function TrackStats({
  audioFeatures,
  audioAnalysis,
}: {
  audioFeatures: Record<string, any>;
  audioAnalysis: Record<string, any>;
}) {
  return (
    <Grid container columnSpacing={8} rowSpacing={6} pt={2}>
      {analysisStats.map((stat, i) => {
        return (
          <Grid item key={i} xs={6} lg={3}>
            <Stack gap={2} alignItems='start'>
              <Stack direction='row' gap={1} alignItems='center'>
                <Typography variant='h6'>
                  {capitalize(stat.alias ?? stat.field)}
                </Typography>
              </Stack>
              <Typography>
                {stat.transformer
                  ? stat.transformer(
                      audioAnalysis?.track?.[stat.field],
                      audioAnalysis
                    )
                  : round(audioAnalysis?.track?.[stat.field], 1)}
              </Typography>
            </Stack>
          </Grid>
        );
      })}
      {featureStats.map((stat, i) => {
        return (
          <Grid item key={i} xs={6} lg={3}>
            <Stack gap={2} alignItems='start'>
              <Stack direction='row' gap={1} alignItems='center'>
                <Typography variant='h6'>
                  {capitalize(stat.alias ?? stat.field)}
                </Typography>
              </Stack>
              <Typography>
                {stat.transformer
                  ? stat.transformer(audioFeatures?.[stat.field], audioFeatures)
                  : round(audioFeatures?.[stat.field], 1)}
              </Typography>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
}
