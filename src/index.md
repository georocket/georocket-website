---
template: page.html
---

<div id="welcome" class="scrollme">
<img class="whiteclouds animateme" data-when="span" data-from="0" data-to="1" data-translatey="100" src="{{ site.url }}/images/whiteclouds.svg">
<img class="blueclouds animateme" data-when="span" data-from="0" data-to="1" data-opacity="0.5" data-translatey="300" src="{{ site.url }}/images/blueclouds.svg">
<img class="outer-space" src="{{ site.url }}/images/outer-space.svg">
<div class="blue-bg animateme" data-when="span" data-from="0" data-to="0.5" data-opacity="0"></div>
<div class="container">
  <div class="row">
    <div class="col-md-8">
      <h1>It's not rocket science!</h1>
      <h2>GeoRocket is a high-performance data store for geospatial files</h2>
      <button type="button" class="btn btn-secondary hidden-sm-down download">Download v1.0.0-SNAPSHOT</button>
    </div>
    <div class="col-md-4">
      <img class="rocket" src="{{ site.url }}/images/rocket.svg">
    </div>
  </div>
</div>
</div>

<div class="container">
<div class="row">
<div class="col-xs-12">

<div class="row featurette">
<div class="col-md-7">
  <h2 class="featurette-heading"><span class="plus">+</span> Data storage</h2>
  <p class="lead">GeoRocket can store geospatial files such as <em>3D city models</em> (CityGML),
  <em>orthophotos</em> (GeoTIFF) or <em>GML files</em>. Any file saved in GeoRocket can be completely restored later.
  No information is lost.</p>
  <p class="lead">Multiple files can be combined to a complex scene. For example, upload a CityGML file containing your
  3D city model and another one containing your digital terrain model. GeoRocket will merge the files
  when you retrieve them.</p>
</div>
<div class="col-md-5">
  <img class="featurette-image img-responsive center-block" src="{{ site.url }}/images/geospatial-files.svg" alt="GeoRocket stores geospatial files">
</div>
</div>

<hr class="featurette-divider">

<div class="row featurette">
<div class="col-md-7 col-md-push-5">
  <h2 class="featurette-heading"><span class="plus">+</span> Spatial queries</h2>
  <p class="lead">Powered by popular Open-Source framework <a href="https://www.elastic.co">Elasticsearch</a>,
  GeoRocket offers a wide range of <em>high-speed search features</em>. You can perform spatial queries and search for
  attributes, layers and tags.</p>
  <p class="lead">GeoRocket will select only those features in the data store that match your request. They
  will be merged in their original form to a valid geospatial file.</p>
</div>
<div class="col-md-5 col-md-pull-7">
  <img class="featurette-image img-responsive center-block" src="{{ site.url }}/images/spatial-queries.svg" alt="Spatial queries">
</div>
</div>

<hr class="featurette-divider">

<div class="row featurette">
<div class="col-md-7">
  <h2 class="featurette-heading"><span class="plus">+</span> Made for the Cloud</span></h2>
  <p class="lead">GeoRocket has been designed to be <em>high-performance</em> and <em>scalable</em>.
  It is extremely fast&mdash;no matter if you run it on a single machine or in the Cloud.</p>
  <p class="lead">GeoRocket is <em>reactive</em>. That means it can handle big files and
  a large number of parallel requests without becoming unresponsive.</p>
</div>
<div class="col-md-5">
  <img class="featurette-image img-responsive center-block" src="{{ site.url }}/images/made-for-cloud.svg" alt="GeoRocket is made for the Cloud">
</div>
</div>

<hr class="featurette-divider">

<div class="row featurette">
<div class="col-md-7 col-md-push-5">
  <h2 class="featurette-heading"><span class="plus">+</span> Open-Source</span></h2>
  <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
</div>
<div class="col-md-5 col-md-pull-7">
  <img class="featurette-image img-responsive center-block" src="{{ site.url }}/images/open-source.svg" alt="GeoRocket is Open-Source">
</div>
</div>

</div>
</div>
</div>
