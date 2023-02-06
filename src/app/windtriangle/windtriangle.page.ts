import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CalculationMode, WindTriangle } from './types.types'

@Component({
  selector: 'app-home',
  templateUrl: 'windtriangle.page.html',
  styleUrls: ['windtriangle.page.scss'],
})
export class WindTrianglePage implements OnInit {

  svg : SafeHtml
  type = CalculationMode;
  mode : CalculationMode = CalculationMode.CALC_COURSE;
  triangle : WindTriangle = { trueAirSpeed: 0, groundSpeed: 0, trueCourse: 0, trueHeading: 0, windSpeed: 0, windDirection: 0, windCorrectionAngle: 0 };

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.svg = this.sanitizer.bypassSecurityTrustHtml("<p/>");
  }

  modeChanged() {
    var windDirection = this.triangle.windDirection + 180;
    var windTrackAngle = this.triangle.trueCourse - windDirection;
    var windTrackAngleRad = this.toRadians(windTrackAngle);

    var sinWCA = this.triangle.windSpeed * Math.sin(windTrackAngleRad) / this.triangle.trueAirSpeed; 
    var windCorrectionAngleRad = Math.asin(sinWCA);
    var windCorrectionAngle = this.toDegrees(windCorrectionAngleRad);

    var trueHeading = this.triangle.trueCourse + windCorrectionAngle;
    var groundSpeed = this.triangle.trueAirSpeed * Math.cos(windCorrectionAngleRad) + this.triangle.windSpeed * Math.cos(windTrackAngleRad);
    
    this.triangle.trueHeading = Math.round(trueHeading * 100) / 100;
    this.triangle.groundSpeed = Math.round(groundSpeed * 100) / 100;
    this.triangle.windCorrectionAngle = Math.round(windCorrectionAngle * 100) / 100;
    
    this.svgCalc(this.triangle.trueCourse, this.triangle.groundSpeed, this.triangle.windDirection, this.triangle.windSpeed);
  }

  svgCalc(trueCourse: number, groundSpeed: number, windDirection: number, windSpeed: number) {
    trueCourse -=90;
    windDirection +=90;
    var radius = 100;
    var lengthCorrection = radius / groundSpeed

    var tcLineStartX = radius;
    var tcLineStartY = radius;
    var tcLineStopX = tcLineStartX + Math.cos(this.toRadians(trueCourse)) * radius;
    var tcLineStopY = tcLineStartY + Math.sin(this.toRadians(trueCourse)) * radius;

    var wcLineStartX = radius;
    var wcLineStartY = radius;
    var wcLineStopX = tcLineStartX + Math.cos(this.toRadians(windDirection)) * windSpeed * lengthCorrection;
    var wcLineStopY = tcLineStartY + Math.sin(this.toRadians(windDirection)) * windSpeed * lengthCorrection;

    var tasLineStartX = wcLineStopX;
    var tasLineStartY = wcLineStopY;
    var tasLineStopX = tcLineStopX;
    var tasLineStopY = tcLineStopY;

    var svgText =
     `<svg id='triangle' xmlns='http://www.w3.org/2000/svg' viewBox='-5 -5 ${ radius * 2 + 5 } ${ radius * 2 + 5 }'>
        <defs>
          <marker id="singleArrow" markerWidth="10" markerHeight="10"
                  refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 l8,2 l-8,2" stroke="green" fill="none"/>
          </marker>
          <marker id="doubleArrow" markerWidth="20" markerHeight="10"
                  refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 l8,2 l-8,2" stroke="blue" fill="none"/>
            <path d="M5,1 l8,2 l-8,2" stroke="blue" fill="none"/>
          </marker>
          <marker id="trippleArrow" markerWidth="30" markerHeight="10"
                  refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,1 l8,2 l-8,2" stroke="red" fill="none"/>
            <path d="M5,1 l8,2 l-8,2" stroke="red" fill="none"/>
            <path d="M10,1 l8,2 l-8,2" stroke="red" fill="none"/>
          </marker>
        </defs>
     
        <circle cx='${ radius }' cy='${ radius }' r='${ radius }' stroke='gray' fill='none' />

        <path id='WND' stroke='red' marker-mid='url(#trippleArrow)'
              d='M ${ wcLineStartX } ${ wcLineStartY }
                 L ${ this.midPointPercentage(wcLineStartX, wcLineStopX, 17) } ${ this.midPointPercentage(wcLineStartY, wcLineStopY, 17) }
                 L ${ wcLineStopX } ${ wcLineStopY }' />
        <path id='TH' stroke='green' marker-mid='url(#singleArrow)'
              d='M ${ tasLineStartX } ${ tasLineStartY }
                 L ${ this.midPointPercentage(tasLineStartX, tasLineStopX, 48) } ${ this.midPointPercentage(tasLineStartY, tasLineStopY, 48) }
                 L ${ tasLineStopX } ${ tasLineStopY }' />
        <path id='TC' stroke='blue' marker-mid='url(#doubleArrow)'
              d='M ${ tcLineStartX } ${ tcLineStartY }
                 L ${ this.midPointPercentage(tcLineStartX, tcLineStopX, 45) } ${ this.midPointPercentage(tcLineStartY, tcLineStopY, 45) }
                 L ${ tcLineStopX } ${ tcLineStopY }' />
        
        <!--text fill='red' font-size='8'>
          <textPath xlink:href='#WND' startOffset='50%' text-anchor='middle'>WND</textPath>
        </text>
        <text fill='green' font-size='8'>
          <textPath xlink:href='#TH' startOffset='50%' text-anchor='middle'>TH</textPath>
        </text>
        <text fill='blue' font-size='8'>
          <textPath xlink:href='#TC' startOffset='50%' text-anchor='middle'>TC</textPath>
        </text-->
      </svg>`

    this.svg = this.sanitizer.bypassSecurityTrustHtml(svgText);
  }

  midPointPercentage(start: number, end: number, percentage: number) {
    return start + (end - start) * percentage / 100;
  }

  toDegrees(radians: number) {
    return radians * 180 / Math.PI;
  }

  toRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

}
