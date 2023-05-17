import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphColourSchemeService {

  constructor() { }

   /**
    * List of colours to be used by the charts.
    * 
    * 
    * This is the python matplotlib tab20 theme. See
    * https://matplotlib.org/3.5.0/tutorials/colors/colormaps.html
    * >>> cm = plt.get_cmap("tab20").colors
    * >>> a = [f"#{round(r*255):>02x}{round(g*255):>02x}{round(b*255):>02x}" for r, g, b in cm]
    * >>> print(a)
    */
   public colourScheme = [
    '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a',
    '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94',
    '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d',
    '#17becf', '#9edae5'
  ];
}
