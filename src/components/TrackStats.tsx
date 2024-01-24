import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { round } from '@/util';
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

function to100(x: number): number {
  return round(round(x, 2) * 100);
}

function formatTime({
  start,
  duration,
}: {
  start: number;
  duration: number;
}): string {
  const startMinutes = Math.floor(start / 60);
  const startSeconds = String(Math.floor(start % 60)).padStart(2, '0');

  const end = start + duration;
  const endMinutes = Math.floor(end / 60);
  const endSeconds = String(Math.floor(end % 60)).padStart(2, '0');

  return `${startMinutes}:${startSeconds}-${endMinutes}:${endSeconds}`;
}

const trackStats: Stat[] = [
  {
    field: 'popularity',
    description:
      'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time.',
  },
];

const analysisStats: Stat[] = [
  {
    field: 'key',
    description: 'The key the track is in.',

    transformer(keyIndex: number, analysis: Record<string, any>): string {
      return `${keys[keyIndex]} (certainty: ${to100(
        analysis.track.key_confidence
      )}%)`;
    },
  },
  {
    field: 'mode',
    description:
      'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived.',

    transformer(mode: number, analysis: Record<string, any>): string {
      return `${mode === 1 ? 'Major' : 'Minor'} (certainty: ${to100(
        analysis.track.mode_confidence
      )}%)`;
    },
  },
  // {
  //   alias: 'Other keys',
  //   field: 'sections',
  //   description: 'Other potential key/modes in the track.',

  //   transformer(
  //     sections: Record<string, any>[],
  //     analysis: Record<string, any>
  //   ): string {
  //     const { key, mode } = analysis.track;

  //     const filteredSections = analysis.sections.filter(
  //       (section: Record<string, any>) => {
  //         return (
  //           section.duration >= 10 &&
  //           section.key_confidence > 0.5 &&
  //           section.mode_confidence > 0.5 &&
  //           (section.key !== key || section.mode !== mode)
  //         );
  //       }
  //     );

  //     const combinedSections: Record<string, any>[] = [];

  //     for (const section of filteredSections) {
  //       const lastSection = combinedSections[combinedSections.length - 1];

  //       if (
  //         lastSection?.start + lastSection?.duration + 1 >= section.start &&
  //         lastSection?.key === section.key &&
  //         lastSection?.mode === section.mode
  //       ) {
  //         lastSection.duration += section.duration;
  //       } else {
  //         combinedSections.push(section);
  //       }
  //     }

  //     return (
  //       combinedSections
  //         .map((section: Record<string, any>) => {
  //           return `${keys[section.key]} ${
  //             section.mode === 1 ? 'Major' : 'Minor'
  //           } (${formatTime({
  //             start: section.start,
  //             duration: section.duration,
  //           })})`;
  //         })
  //         .join(', ') || '--'
  //     );
  //   },
  // },
  {
    field: 'tempo',
    description:
      'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',

    transformer(bpm: number, analysis: Record<string, any>): string {
      return `${round(bpm, 0)} bpm (certainty: ${to100(
        analysis.track.tempo_confidence
      )}%)`;
    },
  },
  // {
  //   alias: 'Other tempos',
  //   field: 'sections',
  //   description: 'Other potential tempos in the track.',

  //   transformer(
  //     sections: Record<string, any>[],
  //     analysis: Record<string, any>
  //   ): string {
  //     const { tempo } = analysis.track;

  //     const filteredSections = analysis.sections.filter(
  //       (section: Record<string, any>) => {
  //         return (
  //           section.duration >= 10 &&
  //           section.tempo_confidence > 0.5 &&
  //           Math.abs(section.tempo - tempo) >= 4
  //         );
  //       }
  //     );

  //     const combinedSections: Record<string, any>[] = [];

  //     for (const section of filteredSections) {
  //       const lastSection = combinedSections[combinedSections.length - 1];

  //       if (
  //         lastSection?.start + lastSection?.duration + 1 >= section.start &&
  //         Math.abs(lastSection?.tempo - section.tempo) < 2
  //       ) {
  //         lastSection.duration += section.duration;
  //       } else {
  //         combinedSections.push(section);
  //       }
  //     }

  //     return (
  //       combinedSections
  //         .map((section: Record<string, any>) => {
  //           return `${round(section.tempo)} bpm (${formatTime({
  //             start: section.start,
  //             duration: section.duration,
  //           })})`;
  //         })
  //         .join(', ') || '--'
  //     );
  //   },
  // },
  {
    field: 'time_signature',
    alias: 'Time signature',
    description:
      'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).',

    transformer(meter: number, analysis: Record<string, any>) {
      return `${meter}/4 (certainty: ${to100(
        analysis.track.time_signature_confidence
      )}%)`;
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
      'Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',

    transformer(level: number): number {
      return to100(level);
    },
  },
  {
    field: 'danceability',
    description:
      'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0 is least danceable and 100 is most danceable.',

    transformer(level: number): number {
      return to100(level);
    },
  },
  {
    field: 'valence',
    description:
      'A measure from 0 to 100 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',

    transformer(level: number): number {
      return to100(level);
    },
  },
  {
    field: 'liveness',
    description:
      'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 80 provides strong likelihood that the track is live.',

    transformer(level: number): string {
      return `${to100(level)}${level > 0.8 ? ' (live)' : ''}`;
    },
  },
  {
    field: 'instrumentalness',
    description:
      'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 100, the greater likelihood the track contains no vocal content. Values above 50 are intended to represent instrumental tracks, but confidence is higher as the value approaches 100.',

    transformer(level: number): number {
      return to100(level);
    },
  },
  {
    field: 'acousticness',
    description:
      'A confidence measure from 0 to 100 of whether the track is acoustic. 100 represents high confidence the track is acoustic.',

    transformer(level: number): number {
      return to100(level);
    },
  },
  {
    field: 'speechiness',
    description:
      'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100 the attribute value. Values above 66% describe tracks that are probably made entirely of spoken words. Values between 33 and 66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 33 most likely represent music and other non-speech-like tracks.',

    transformer(level: number): number {
      return to100(level);
    },
  },
];

export default async function TrackStats({
  track,
  audioFeatures,
  audioAnalysis,
}: {
  track: Record<string, any>;
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
      {trackStats.map((stat, i) => {
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
                  ? stat.transformer(track?.[stat.field], track)
                  : round(track?.[stat.field], 1)}
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
