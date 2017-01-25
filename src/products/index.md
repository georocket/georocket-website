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
        <h2>GeoRocket Products</h2>
        <p class="hidden-md-down">Enterprise and Open-Source features</p>
      </div>
      <div class="col-md-5 px-5 px-sm-4 px-md-0">
        <img class="img-fluid" src="{{ site.url }}/images/products/georocket-pro.png">
      </div>
    </div>
  </div>
</div>

<div class="container container-main">
<div class="row">
<div class="col-md-12">

<h1 class="text-center">Compare the GeoRocket editions</h1>

<p class="lead text-center">The Open-Source edition (OSS) contains less features than the Professional edition (Pro)</p>

{%
set features = [
  {
    "category": "General"
  },
  {
    "title": "Import/Export",
    "description": "Store geospatial files",
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
    "category": "Security"
  },
  {
    "title": "User authentication",
    "description": "Create users and groups, assign roles and permissions",
    "oss": false,
    "pro": true
  },
  {
    "title": "Encryption",
    "description": "Secure your data in the Cloud against unauthorized access",
    "oss": false,
    "pro": true
  }
]
%}

<div class="compare-editions">
  <div class="compare-head compare-row">
    <div class="compare-col-1">&nbsp;</div>
    <div class="compare-col-2"><span class="hidden-xs-down">GeoRocket </span>OSS</div>
    <div class="compare-col-3"><span class="hidden-xs-down">GeoRocket </span>Pro</div>
  </div>
{% for feature in features %}
  {% if feature.category %}
  <div class="compare-row compare-category-row {% if loop.index0 == 0 %}first-row{% endif %}">
    <div class="compare-col-1 category-title">{{ feature.category }}</div>
    <div class="compare-col-2">&nbsp;</div>
    <div class="compare-col-3">&nbsp;</div>
  </div>
  {% else %}
  <div class="compare-row">
    <div class="compare-col-1">{{ feature.title }}<div class="description">{{ feature.description }}</div></div>
    <div class="compare-col-2">
      {% if feature.oss %}<div class="yes"><i class="mdi mdi-check-circle-outline" aria-hidden="true"></i></div>{% else %}<div class="no"><i class="mdi mdi-close-circle-outline" aria-hidden="true"></i></div>{% endif %}
    </div>
    <div class="compare-col-3">
      {% if feature.pro %}<div class="yes"><i class="mdi mdi-check-circle-outline" aria-hidden="true"></i></div>{% else %}<div class="no"><i class="mdi mdi-close-circle-outline" aria-hidden="true"></i></div>{% endif %}
    </div>
  </div>
  {% endif %}
{% endfor %}
</div>

</div>
</div>
</div>
