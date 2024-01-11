import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { capitalize, round } from '@/util';
import Tooltip from '@mui/material/Tooltip';
import TrackStatDetails from './TrackStatDetails';

interface Stat {
  field: string;
  description: string;
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
    description: 'The key the track is in.',

    transformer(keyIndex: number, analysis: Record<string, any>): string {
      return `${keys[keyIndex]} ${
        analysis.track.mode ? 'major' : 'minor'
      } (certainty: ${toPercentage(analysis.track.key_confidence)})`;
    },
  },
  {
    field: 'tempo',
    description:
      'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',

    transformer(bpm: number, analysis: Record<string, any>): string {
      return `${round(bpm, 0)} bpm (certainty: ${toPercentage(
        analysis.track.tempo_confidence
      )})`;
    },
  },
  {
    field: 'time_signature',
    alias: 'Time signature',
    description:
      'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).',

    transformer(meter: number, analysis: Record<string, any>) {
      return `${meter}/4 (certainty: ${toPercentage(
        analysis.track.time_signature_confidence
      )})`;
    },
  },
];

const featureStats: Stat[] = [
  {
    field: 'loudness',
    description:
      'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.',

    transformer(db: number) {
      return `${round(db, 1)} db`;
    },
  },
  {
    field: 'energy',
    description:
      'Energy is a measure from 0% to 100% and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'danceability',
    description:
      'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0% is least danceable and 100% is most danceable.',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'valence',
    description:
      'A measure from 0% to 100% describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'liveness',
    description:
      'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 80% provides strong likelihood that the track is live.',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'instrumentalness',
    description:
      'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 100%, the greater likelihood the track contains no vocal content. Values above 50% are intended to represent instrumental tracks, but confidence is higher as the value approaches 100%.',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'acousticness',
    description:
      'A confidence measure from 0% to 100% of whether the track is acoustic. 100% represents high confidence the track is acoustic.',

    transformer(level: number): string {
      return toPercentage(level);
    },
  },
  {
    field: 'speechiness',
    description:
      'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100% the attribute value. Values above 66% describe tracks that are probably made entirely of spoken words. Values between 33% and 66% describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 33% most likely represent music and other non-speech-like tracks.',

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
                <TrackStatDetails
                  alias={stat.alias}
                  field={stat.field}
                  description={stat.description}
                />
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
                <TrackStatDetails
                  alias={stat.alias}
                  field={stat.field}
                  description={stat.description}
                />
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
