---
id: home
template: page.html
---

<div id="welcome" class="scrollme">
<img class="whiteclouds animateme" data-when="span" data-from="0" data-to="1" data-translatey="150" data-easing="linear" src="{{ site.url }}/images/whiteclouds.svg">
<img class="blueclouds animateme" data-when="span" data-from="0" data-to="1" data-opacity="0.5" data-translatey="300" data-easing="linear" src="{{ site.url }}/images/blueclouds.svg">
<img class="outer-space" src="{{ site.url }}/images/outer-space.svg">
<div class="blue-bg animateme" data-when="span" data-from="0.1" data-to="0.4" data-opacity="0" data-easing="linear"></div>
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
  <p>GeoRocket can store geospatial files such as <em>3D city models</em> (CityGML),
  <em>orthophotos</em> (GeoTIFF) or <em>GML files</em>. Any file saved in GeoRocket can be completely restored later.
  No information is lost.</p>
  <p>Multiple files can be combined to a complex scene. For example, upload a CityGML file containing your
  3D city model and another one containing your digital terrain model. GeoRocket will merge the files
  when you retrieve them.</p>
</div>
<div class="col-md-5">
  <img class="featurette-image img-fluid center-block" src="{{ site.url }}/images/geospatial-files.svg" alt="GeoRocket stores geospatial files">
</div>
</div>

<hr class="featurette-divider">

<div class="row featurette">
<div class="col-md-7 col-md-push-5">
  <h2 class="featurette-heading"><span class="plus">+</span> Spatial queries</h2>
  <p>Powered by popular Open-Source framework <a href="https://www.elastic.co">Elasticsearch</a>,
  GeoRocket offers a wide range of <em>high-speed search features</em>. You can perform spatial queries and search for
  attributes, layers and tags.</p>
  <p>GeoRocket will select only those features in the data store that match your request. They
  will be merged in their original form to a valid geospatial file.</p>
</div>
<div class="col-md-5 col-md-pull-7">
  <img class="featurette-image img-fluid center-block" src="{{ site.url }}/images/spatial-queries.svg" alt="Spatial queries">
</div>
</div>

<hr class="featurette-divider">

<div class="row featurette">
<div class="col-md-7">
  <h2 class="featurette-heading"><span class="plus">+</span> Made for the Cloud</span></h2>
  <p>GeoRocket has been designed to be <em>high-performance</em> and <em>scalable</em>.
  It is extremely fast&mdash;no matter if you run it on a single machine or in the Cloud.</p>
  <p>GeoRocket is <em>reactive</em>. That means it can handle big files and
  a large number of parallel requests without becoming unresponsive. GeoRocket is
  powered by <a href="http://vertx.io">Vert.x</a>&mdash;a toolkit for reactive applications.</p>
</div>
<div class="col-md-5">
  <img class="featurette-image img-fluid center-block" src="{{ site.url }}/images/made-for-cloud.svg" alt="GeoRocket is made for the Cloud">
</div>
</div>

<hr class="featurette-divider">

<div class="row featurette">
<div class="col-md-7 col-md-push-5">
  <h2 class="featurette-heading"><span class="plus">+</span> Enterprise and Open-Source</span></h2>
  <p>GeoRocket exists in two variants. <em>GeoRocket Pro</em> is a professional data store
  that meets enterprise requirements such as multi-tenancy, versioning or extended
  search features. Compared to this, the <em>Open-Source</em> version of GeoRocket offers
  limited functionality but is still powerful enough for most applications.</p>

  <p><em>GeoRocket OSS</em> is hosted on <a href="https://github.com/georocket/georocket">GitHub</a>
  and licensed under the Apache License, Version 2. Contributions are welcome!</p>
</div>
<div class="col-md-5 col-md-pull-7">
  <img class="featurette-image img-fluid center-block" src="{{ site.url }}/images/open-source.svg" alt="GeoRocket is Open-Source">
</div>
</div>

</div>
</div>
</div>

<div class="home-download-container">
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        The latest GeoRocket release is version 1.0.0-SNAPSHOT
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-secondary download">Download</button>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col-md-6 news-column">
      <h2>Blog / News</h2>
      <p class="lead">Stay up to date with the latest from GeoRocket</p>
      {% for post in collections.posts -%}{% if loop.index0 < 3 -%}
      <h5>{{ post.date | date('MMMM, Do YYYY') }}</h5>
      <p><a href="{{ site.url }}/blog/{{ post.slug }}">{{ post.title }}</a></p>
      {%- endif %}{%- endfor %}
      <a href="{{ site.url }}/blog" class="btn btn-secondary">View all</a>
    </div>
    <div class="col-md-6">
      <h2>Something else</h2>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
      <p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
    </div>
  </div>
</div>
