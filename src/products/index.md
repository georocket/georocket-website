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
    "title": "Binary files",
    "description": "Store textures, orthophotos and other geospatial file formats",
    "pro": true
  },
  {
    "title": "Additional indexers",
    "description": "Make use of more indexers for various file formats and schemas",
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
    "category": "Interfaces"
  },
  {
    "title": "Command line",
    "description": "Import, export, search and other features on the command line",
    "oss": true,
    "pro": true
  },
  {
    "title": "Admin web app",
    "description": "Control GeoRocket with a web-based graphical user interface",
    "pro": true
  },
  {
    "title": "Web visualization",
    "description": "Data stored in GeoRocket can be visualized in 2D and 3D in a web browser",
    "pro": true
  },
  {
    "title": "Cluster metrics",
    "description": "Detailed information about GeoRocket's status, work load and performance",
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
    "category": "Security"
  },
  {
    "title": "User authentication",
    "description": "Create users and groups, assign roles and permissions",
    "pro": true
  },
  {
    "title": "Enterprise accounts",
    "description": "Connect to a Single Sign-On (SSO) system or our enterprise directory (e.g. LDAP)",
    "pro": true
  },
  {
    "title": "Encryption",
    "description": "Secure your data in the Cloud against unauthorized access",
    "pro": true
  },
  {
    "category": "Data management"
  },
  {
    "title": "Data processing",
    "description": "Connect GeoRocket with the GeoToolbox and apply various processing services",
    "pro": true
  },
  {
    "title": "Secondary data store",
    "description": "Maintain derived or pre-processed data (e.g. different levels of detail, or glTF files)",
    "pro": true
  },
  {
    "title": "Versioning",
    "description": "Store multiple versions of your data and access the history",
    "pro": true
  },
  {
    "category": "Deployment"
  },
  {
    "title": "Cloud-ready",
    "description": "GeoRocket is reactive, scalable and ready for the Cloud",
    "oss": true,
    "pro": true
  },
  {
    "title": "Serverless",
    "description": "Run GeoRocket on a serverless infrastructure such as AWS Lambda",
    "pro": true
  },
  {
    "category": "Support"
  },
  {
    "title": "Updates",
    "description": "Get updates and bug fixed for your GeoRocket edition",
    "oss": true,
    "pro": true
  },
  {
    "title": "Installation support",
    "description": "Get help with installing and running GeoRocket",
    "pro": true
  },
  {
    "title": "Enterprise support",
    "description": "8x5 support",
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
  <div class="compare-row">
    <div class="compare-col-1">&nbsp;</div>
    <div class="compare-col-2"><a href="{{ site.url }}/try" class="btn btn-primary">Try <span class="hidden-sm-down"><span class="hidden-md-down">GeoRocket </span>OSS</span></a></div>
    <div class="compare-col-3"><a href="{{ site.url }}/try" class="btn btn-primary">Try <span class="hidden-sm-down"><span class="hidden-md-down">GeoRocket </span>Pro</span></a></div>
  </div>
</div>

</div>
</div>
</div>
