export enum CalculationMode {
    CALC_COURSE,
    CALC_WIND
  }
  
export interface WindTriangle {
    trueAirSpeed : number;
    groundSpeed : number;
    trueCourse : number;
    trueHeading : number;
    windSpeed : number;
    windDirection : number;
    windCorrectionAngle : number;
}