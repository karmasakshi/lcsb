export interface ChartConfiguration {
  maximumValue: number | undefined;
  minimumValue: number | undefined;
  refreshInterval: number;
  axisType: 'linear' | 'logarithmic';
}
