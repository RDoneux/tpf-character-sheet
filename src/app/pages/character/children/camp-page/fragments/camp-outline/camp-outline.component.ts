import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core'

@Component({
    selector: 'app-camp-outline',
    templateUrl: './camp-outline.component.html',
    styleUrl: './camp-outline.component.scss',
})
export class CampOutlineComponent implements AfterViewInit {
    @ViewChild('svgElement', { static: true }) svgElement!: ElementRef
    @ViewChild('imageElement', { static: true }) imageElement!: ElementRef

    ngAfterViewInit(): void {
        // const svgWidth = svg.clientWidth || svg.getBoundingClientRect().width;

        // // Calculate scale to make the `<g>` width match the `<svg>` width
        // const scaleX = svgWidth / bbox.width;

        // // Apply scaling and adjust translation to center the `<g>` element
        // g.setAttribute('transform', `translate(0 ${-bbox.y * scaleX}) scale(${scaleX})`);
        // svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

        const svg = this.svgElement.nativeElement as SVGSVGElement
        const image = this.imageElement.nativeElement as SVGGElement

        // image.setAttribute('transform', 'translate(0 400) scale(.2 -.1)')

        // const g = svg?.querySelector('g')
        // const bbox = g?.getBBox() ?? { x: 0, y: 0, width: 0, height: 0 }
        // svg?.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`)
        // svg?.setAttribute('width', `${bbox.width}`)
        // svg?.setAttribute('height', `${bbox.height}`)
        // g?.setAttribute('transform', `translate(${bbox.x}, ${bbox.y}) scale(2)`)
    }
}
