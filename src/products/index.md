---
id: products
template: page.html
title: Products
hastitlelarge: true
---

<div class="title-large pb-0 pt-5">
  <div class="container">
    <div class="row">
      <div class="col-md-7 text-md-left pb-4 pb-sm-5 pt-4 pb-md-0 pt-md-2 pt-lg-4">
        <h2>GeoRocket Features</h2>
        <p class="d-none d-lg-block">Here's a list of things GeoRocket can do</p>
      </div>
      <div class="col-md-5 px-5 px-sm-4 px-md-0">
        <img class="img-fluid" src="{{ site.url }}/images/products/georocket-cli-screen.png">
      </div>
    </div>
  </div>
</div>

<div class="container container-main">
<div class="row">
<div class="col-md-12">

{%
set features = [
  {
    "category": "General"
  },
  {
    "title": "Import/export",
    "description": "High-performance store for geospatial files",
    "oss": true,
    "pro": true
  },
  {
    "title": "Spatial queries",
    "description": "Search for attributes, layers, tags, and bounding boxes",
    "oss": true,
    "pro": true
  },
  {
    "title": "Schema agnostic",
    "description": "Maintain multiple files with different schemas in the same store",
    "oss": true,
    "pro": true
  },
  {
    "title": "Format preserving",
    "description": "Completely restore imported files when exporting and never lose information again",
    "oss": true,
    "pro": true
  },
  {
    "category": "File formats"
  },
  {
    "title": "GML",
    "description": "Import/Export GML or CityGML files",
    "oss": true,
    "pro": true
  },
  {
    "title": "GeoJSON",
    "description": "Feature collections and geometries",
    "oss": true,
    "pro": true
  },
  {
    "category": "Back-ends"
  },
  {
    "title": "File system",
    "description": "Store chunks on your local hard drive",
    "oss": true,
    "pro": true
  },
  {
    "title": "H2",
    "description": "Fast and lightweight embedded database on your local hard drive (default back-end)",
    "oss": true,
    "pro": true
  },
  {
    "title": "Distributed file system",
    "description": "Use a distributed file system such as HDFS or Ceph as data store",
    "oss": true,
    "pro": true
  },
  {
    "title": "MongoDB",
    "description": "Reliable, scalable and fast NoSQL data store",
    "oss": true,
    "pro": true
  },
  {
    "title": "Amazon S3",
    "description": "Store your chunks in the Cloud",
    "oss": true,
    "pro": true
  },
  {
    "category": "Interfaces"
  },
  {
    "title": "Command line",
    "description": "Import, export, search and other features on the command line",
    "oss": true,
    "pro": true
  },
  {
    "title": "HTTP interface",
    "description": "Access GeoRocket from within your application via HTTP",
    "oss": true,
    "pro": true
  },
  {
    "title": "Client/server API",
    "description": "Use our client and server API (Java) and develop apps and extensions",
    "oss": true,
    "pro": true
  },
  {
    "category": "Deployment and support"
  },
  {
    "title": "Cloud-ready",
    "description": "GeoRocket is reactive, scalable and ready for the Cloud",
    "oss": true,
    "pro": true
  },
  {
    "title": "Updates",
    "description": "Get regular updates and bug fixes",
    "oss": true,
    "pro": true
  }
]
%}

<div class="compare-editions">
  <div class="compare-head compare-row">
    <div class="compare-col-1">&nbsp;</div>
    <div class="compare-col-2">GeoRocket</div>
  </div>
{% for feature in features %}
  {% if feature.category %}
  <div class="compare-row compare-category-row {% if loop.index0 == 0 %}first-row{% endif %}">
    <div class="compare-col-1 category-title">{{ feature.category }}</div>
    <div class="compare-col-2">&nbsp;</div>
  </div>
  {% else %}
  <div class="compare-row">
    <div class="compare-col-1">{{ feature.title }}<div class="description">{{ feature.description }}</div></div>
    <div class="compare-col-2">
      {% if feature.oss %}<div class="yes"><i class="mdi mdi-check-circle-outline" aria-hidden="true"></i></div>{% else %}<div class="no"><i class="mdi mdi-close-circle-outline" aria-hidden="true"></i></div>{% endif %}
    </div>
  </div>
  {% endif %}
{% endfor %}
</div>

</div>
</div>
</div>
