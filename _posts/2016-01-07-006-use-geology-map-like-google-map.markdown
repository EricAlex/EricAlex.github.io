---
layout:     post
title:      "Use geology maps like using Google Maps on your iPad"
subtitle:   ""
date:       2016-01-07 12:00:00
author:     "Xin Wang"
header-img: "img/post-006/bg.jpg"
---

<p>*Notice: You can download the <a href="{{ site.baseurl }}/PDFs/use-geology-map-like-google-map.pdf">PDF version of this post</a>*</p>

<p>Imagine you are doing geology surveys in the field, enjoying geology map services as powerful as Google Maps: 
locating yourself on the map, zooming in, zooming out, drawing lines to get the stratigraphic profile, 
marking down a sampling site, taking a selfie with your rock sample, searching for nearby geologists, 
making small talks online, sipping your ice cold beer (I'm kidding, no beer provided).</p>

<p>Well, this step-by-step post will walk you through making above imaginations come true.
</p>

<h2 class="section-heading">Requirements</h2>

<p>First you need a map scanner to digitize your geology maps.</p>
<p>You will need ArcGIS, QGIS or similar software to georeference your map and trim off overlapping edges.</p>
<p>You will need TileMill or Mapbox Studio to generate data for your geology map service, both offline and online.</p>

<h2 class="section-heading">Digitizing geology maps</h2>

<p>It depends on where you get your geology maps and the scale of your maps. If you downloaded your maps as *.jpeg, *.png, *.bmp, etc., 
from the Internet, no bother scan your geology maps. If you bought or borrowed your paper maps, scan your maps, 
as the geology map of Sichuan Province's Dege County, China, shown bellow:</p>

<center>
<a href="#">
    <img src="{{ site.baseurl }}/img/post-006/geology-map.jpg" alt="Geology Map">
</a>
<span class="caption text-muted">Figure 1. Geology map of Dege County, Sichuan Province, China.</span>
</center>

<p>Of course you can refine your scanned maps in GIS softwares, turn raster maps into vector maps, 
turn informations on the map into well-orgnized Geo-spatial Databases, 
on the database you can develop very high-level and powerful services. 
But that cost a lot of energy, and money if you are developing it for commercial use. 
I am positive it will be a good investment. Anyway, as I was not funded or encouraged, and I developed this for my own use, 
I left geology maps as rasters and moved to the next step.</p>

<h2 class="section-heading">Georeferencing maps and triming edges</h2>

<p>Open ArcMap, add one piece of geology map, 
notice that normally you will find points at four corners where you can read their \(<\)longitude, latitude\(>\). 
Select the tool in georeferencing toolbar highlighed with red frame in Fig 2, left click on one of the \(<\)longitude, latitude\(>\) known points, 
then right click on it, select "Input X and Y", then enter its \(<\)longitude, latitude\(>\). After processing all points with above procedures, 
click georeferencing\(\rightarrow\)Update Georeferencing.</p>

<center>
<a href="#">
    <img src="{{ site.baseurl }}/img/post-006/georeferencing.jpg" alt="Georeferencing">
</a>
<span class="caption text-muted">Figure 2. Procedure of georeferencing geology maps.</span>
</center>

<p>Adjacent geology maps' edges will overlap after georeferencing (Fig 3).</p>

<center>
<a href="#">
    <img src="{{ site.baseurl }}/img/post-006/overlapping-edges.jpg" alt="Overlapping Edges">
</a>
<span class="caption text-muted">Figure 3. Overlapping edges of adjacent geology maps.</span>
</center>

<p>Edges should be trimed off when mosaicing these maps together.</p>
<p>Create new polygon shapefile and add it in, sketch a polygon that just covers the mapping boundary of the geology map. 
Use this polygon clip the raster map: 
ArcToolbox\(\rightarrow\)Data Management Tools\(\rightarrow\)Raster\(\rightarrow\)Raster Processing\(\rightarrow\)Clip.</p>
<p>Define projection of the cliped map: 
ArcToolbox\(\rightarrow\)Data Management Tools\(\rightarrow\)Projections and Tranformations\(\rightarrow\)Define Projection. 
Define it as "WGS 1984 UTM Zone xx", according to its zone number.</p>
<p>Save the cliped and projection defined map as *.tif: 
ArcToolbox\(\rightarrow\)Data Management Tools\(\rightarrow\)Raster\(\rightarrow\)Raster Dataset\(\rightarrow\)Copy Raster. 
Include .tif as the extension of your output file.</p>
<p>The final result so far looks like Fig 4.</p>

<center>
<a href="#">
    <img src="{{ site.baseurl }}/img/post-006/edges-trimed.jpg" alt="Edges Trimed">
</a>
<span class="caption text-muted">Figure 4. Overlapping edges were trimed off.</span>
</center>

<h2 class="section-heading">Importing geology maps to TileMill (or MapBox Studio)</h2>

<p>Import saved geotiff maps into TileMill: open TileMill, new Project and name it, click the tool highlighted with red frame in Fig 5, 
click add layer, browse and select geotiff maps, "SRS" select "WGS84", click "Save&Style".</p>

<center>
<a href="#">
    <img src="{{ site.baseurl }}/img/post-006/import-to-tilemill.jpg" alt="Import to TileMill">
</a>
<span class="caption text-muted">Figure 5. Importing maps into TileMill.</span>
</center>

<h2 class="section-heading">Rendering your maps</h2>

<p>As the right side column of Fig 5 shows, you can edit the script that describe the render style of your maps. 
There is detailed documentation of TileMill tells you how to do it. Fell free to customize your geology maps.</p>

<p>Of course you can add other vector layers: roads, villages, the faults that you are studying, previous field trips' traces, 
previous sampling sites. The only limitation is your imagination.</p>

<p>It is better to collect geology maps with different scales of the same region, as 1:1,000,000, 1:500,000, 1:200,000, etc. 
In TileMill you can set different scale maps to appear in different zoom level ranges 
(If you are familiar with the comcept of raster pyramids in ArcGIS and zoom level of Google Maps). 
So you can control what kind of details will appear at different zoom level (scale).</p>

<h2 class="section-heading">Exporting your geology map service data</h2>

<p>After you add all features that you wanted and are satisfied with your map, 
you can export your geology map service data and release your service now. Click Export\(\rightarrow\)MBTiles, then Fig 6 will appear, 
you can resize and drag the rectangle to set the extent of your export region, there are other parameters you can set: 
zoom range, Centor and MetaTile size, the export extent and zoom range will decide the size of your output file, so set them carefully, 
you wouldn't like to store a 20G MBTiles file in your iPad.</p>

<center>
<a href="#">
    <img src="{{ site.baseurl }}/img/post-006/export-map-data.jpg" alt="Export Map Data">
</a>
<span class="caption text-muted">Figure 6. Exporting geology map service data: MbTiles.</span>
</center>

<h2 class="section-heading">Using your geology map service on iPad</h2>

<p>There are several Apps for iPad to view MBTiles file, MBTiles GPS is a free and simple one. 
It is still being developed, as shown in Fig 7A and 7B. Maybe too simple, 
fancy features like tracing and marking locations are not included. But it will satisfy your basic usage.</p>

<center>
<a href="#">
    <img src="{{ site.baseurl }}/img/post-006/large-scale-and-detailed-map.jpg" alt="Map on iPad">
</a>
<span class="caption text-muted">Figure 7. Using geology map service on iPad. A: Large scale view; B: Detailed view.</span>
</center>

<p>If you want to release your geology map services online, you may need <a href="https://www.mapbox.com/">Mapbox</a>'s service. 
They made it very simple and convenient for you.</p>

<p>If you want your geology map services to have fancy features, you may need to develop your own Apps. 
Again you can use Map App framework provided by <a href="https://www.mapbox.com/">Mapbox</a>, 
both for iOS (<a href="https://www.mapbox.com/ios-sdk/">Mapbox iOS SDK</a>) 
and Android (<a href="https://www.mapbox.com/android-sdk/">Mapbox Android SDK</a>).</p>
