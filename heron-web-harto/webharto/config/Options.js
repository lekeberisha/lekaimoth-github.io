/** Heron Map Options (Dutch Maps and Overlays) */

Ext.namespace("Heron.options");
Ext.namespace("Heron.scratch");
OpenLayers.Util.onImageLoadErrorColor = "transparent";
// OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
OpenLayers.ProxyHost = "";
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

Ext.BLANK_IMAGE_URL = '/heron-web-harto/lib/ext-3.4.1/resources/images/default/s.gif';

/**
 * Options for MapPanel
 * These will be assigned as "hropts" within the global config
 * "scratch" is just for convenience.
 *
 **/
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.GISWS");

Heron.options.map.settings = {
    projection: 'EPSG:7392',
    units: 'm',
    // resolutions: Heron.options.serverResolutions.zoom_0_16,

    maxExtent: '7416000, 4632000, 7568000, 4796000',

    resolutions: [559.9999, 280, 140, 55.99999999999999, 27.999999999999996, 13.999999999999998, 6.999999999999999, 2.8, 1.4, 0.7, 0.27999999999999997, 0.13999999999999999, 0.07],

    center: '7488652,4715308',
    xy_precision: 3,
    zoom: 3,
    allOverlays: true,
    theme: null,

    /**
     * Useful to always have permalinks enabled. default is enabled with these settings.
     * MapPanel.getPermalink() returns current permalink
     *
     **/
    permalinks: {
        /** The prefix to be used for parameters, e.g. map_x, default is 'map' */
        paramPrefix: 'map',
        /** Encodes values of permalink parameters ? default false*/
        encodeType: false,
        /** Use Layer names i.s.o. OpenLayers-generated Layer Id's in Permalinks */
        prettyLayerNames: true
    }

    /** You can always control which controls are to be added to the map. */
     // controls : [
     // new OpenLayers.Control.Attribution(),
     // new OpenLayers.Control.ZoomBox(),
     // new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}}),
     // new OpenLayers.Control.LoadingPanel(),
     // new OpenLayers.Control.PanPanel(),
     // new OpenLayers.Control.ZoomPanel(),
     // new OpenLayers.Control.OverviewMap(),
     // new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200})
     // ] 
};

//GIS Server te cilat ofrojne sherbimet e hartes
Heron.scratch.urls = {
    GEO: 'http://ec2-3-19-26-45.us-east-2.compute.amazonaws.com:8080',
    GEOBACKUP: 'http://localhost:8080',
    AKK: 'http://geoportal.rks-gov.net'
};

//GISWS Hapesirat punuese ne GIS Server
Heron.GISWS.urls = {
    GEOSERVER: Heron.scratch.urls.GEO + '/geoserver/wms?',
    GEOSERVER_LOCAL: Heron.scratch.urls.GEOBACKUP + '/geoserver/wms?',
    AKKWMTS: Heron.scratch.urls.AKK + '/wmts?',
    AKKWMS: Heron.scratch.urls.AKK + '/wms?'
};

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    {
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv'
    },
    {
        name: 'GML (version 2.1.2)',
        outputFormat: 'text/xml; subtype=gml/2.1.2',
        fileExt: '.gml'
    },
    {
        name: 'ESRI Shapefile (zipped)',
        outputFormat: 'SHAPE-ZIP',
        fileExt: '.zip'
    },
    {
        name: 'GeoJSON',
        outputFormat: 'json',
        fileExt: '.json'
    }
];

/* Shtresat vektoriale */
Ext.namespace("Heron.options.worklayers");
Heron.options.worklayers = {
    editor: new OpenLayers.Layer.Vector('Editor', {
        displayInLayerSwitcher: true, visibility: false}),


    scratch: new OpenLayers.Layer.Vector('Scratch', {
        displayInLayerSwitcher: true, visibility: false})
};


/** Collect layers from above, these are actually added to the map.
 * One could also define the layer objects here immediately.
 * */
Heron.options.map.layers = [
    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */

    new OpenLayers.Layer.WMS(
        "Orthophoto_2012",
        Heron.GISWS.urls.AKKWMTS,
        {layers: "Orthophoto_2012", format: "image/png", transparent: true},
        {isBaseLayer: true, singleTile: false, visibility: false, alpha: true,
            attribution: "copyright AKK 2012: <a target='_blank' href='http://geoportal.rks-gov.net'>Orthophoto 2012</a>",
            transitionEffect: 'resize'
        }
    ),

    new OpenLayers.Layer.WMS(
        "Orthophoto2018Urban",
        Heron.GISWS.urls.AKKWMTS,
        {layers: "Orthophoto2018Urban", format: "image/png", transparent: true},
        {isBaseLayer: true, singleTile: false, visibility: true, alpha: true,
            attribution: "copyright AKK 2018: <a target='_blank' href='http://geoportal.rks-gov.net'>Orthophoto 2018 Urban</a>",
            transitionEffect: 'resize'
        }
    ),

    new OpenLayers.Layer.WMS(
        "Orthophoto2018Rural",
        Heron.GISWS.urls.AKKWMTS,
        {layers: "Orthophoto2018Rural", format: "image/png", transparent: true},
        {isBaseLayer: true, singleTile: false, visibility: true, alpha: true,
            attribution: "copyright AKK 2018: <a target='_blank' href='http://geoportal.rks-gov.net'>Orthophoto 2018 Rural</a>",
            transitionEffect: 'resize'
        }
    ),

    new OpenLayers.Layer.Image(
            "zbrazet",
            Ext.BLANK_IMAGE_URL,
            OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
            new OpenLayers.Size(10, 10),
            {resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize'}
    ),

    /** OVERLAYS **/

    /*
     * Geoserver: AWS
     */
    new OpenLayers.Layer.WMS(
        "aws-webharto-objektet",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:objektet", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-rruget",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:rruget", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-transporti",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:transporti__publik", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-bari",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Bari", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-ferm",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Ferm", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-park",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Parqet", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-pyll",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Pyll", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-rrugice",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Rrugice", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-varrezat",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Varrezat", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-industri",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Zonat_industriale", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "aws-webharto-komercial",
        Heron.GISWS.urls.GEOSERVER,
        {layers: "webharto:Zonat_komerciale", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),
	
	 /*
     * Geoserver: LOCAL
     */
	new OpenLayers.Layer.WMS(
        "local-webharto-objektet",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:objektet", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-rruget",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:rruget", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-transporti",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:transporti__publik", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-bari",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Bari", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-ferm",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Ferm", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-park",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Parqet", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-pyll",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Pyll", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-rrugice",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Rrugice", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-varrezat",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Varrezat", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-industri",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Zonat_industriale", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),

	new OpenLayers.Layer.WMS(
        "local-webharto-komercial",
        Heron.GISWS.urls.GEOSERVER_LOCAL,
        {layers: "webharto:Zonat_komerciale", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'test',
                    featureNS: 'http://ushtrime.com',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 100000,
                    maxQueryLength: 1000
                }
            }
        }
    ),
	
	Heron.options.worklayers.editor,
    Heron.options.worklayers.scratch
];

/*
 * Define the Layer tree (shown in left menu)
 * Use the exact Open Layers Layer names to identify layers ("layer" attrs) from Heron.options.map.settings.layers above.
 * The text with each node is determined by the WMS Layer name, but may be overruled with a "text" attribute.
 *
 **/
Ext.namespace("Heron.options.layertree");
Heron.options.layertree.tree = [
    {
        text: 'Shtresat baze', expanded: true, children: [
            {nodeType: "gx_layer", layer: "Orthophoto_2012", text: "Orthophoto 2012" },
            {nodeType: "gx_layer", layer: "Orthophoto2018Urban", text: "Orthophoto 2018 Urban" },
            {nodeType: "gx_layer", layer: "Orthophoto2018Rural", text: "Orthophoto 2018 Rural" },
            {nodeType: "gx_layer", layer: "zbrazet"}
        ]
    },   
	{
        text: 'Geoserver (AWS)', expanded: true, children: [
            {
                text: 'Prishtinë', expanded: true, children: [
                    {nodeType: "gx_layer", layer: "aws-webharto-bari", text: "Bari"},
                    {nodeType: "gx_layer", layer: "aws-webharto-ferm", text: "Fermët"},
                    {nodeType: "gx_layer", layer: "aws-webharto-park", text: "Parqet"},
                    {nodeType: "gx_layer", layer: "aws-webharto-pyll", text: "Pyjet"},
                    {nodeType: "gx_layer", layer: "aws-webharto-rrugice", text: "Rrugicët"},
                    {nodeType: "gx_layer", layer: "aws-webharto-varrezat", text: "Varrezat"},
                    {nodeType: "gx_layer", layer: "aws-webharto-rruget", text: "Rrugët"},
                    {nodeType: "gx_layer", layer: "aws-webharto-industri", text: "Zonat industriale"},
                    {nodeType: "gx_layer", layer: "aws-webharto-komercial", text: "Zonat Komerciale"},
                    {nodeType: "gx_layer", layer: "aws-webharto-transporti", text: "Transporti publik"},
                    {nodeType: "gx_layer", layer: "aws-webharto-objektet", text: "Objektet"}
                ]
            }
        ]
    },
    {
        text: 'Geoserver (localhost)', expanded: false, children: [
            {
                text: 'Prishtinë', expanded: false, children: [
                    {nodeType: "gx_layer", layer: "local-webharto-bari", text: "Bari"},
                    {nodeType: "gx_layer", layer: "local-webharto-ferm", text: "Fermët"},
                    {nodeType: "gx_layer", layer: "local-webharto-park", text: "Parqet"},
                    {nodeType: "gx_layer", layer: "local-webharto-pyll", text: "Pyjet"},
                    {nodeType: "gx_layer", layer: "local-webharto-rrugice", text: "Rrugicët"},
                    {nodeType: "gx_layer", layer: "local-webharto-varrezat", text: "Varrezat"},
                    {nodeType: "gx_layer", layer: "local-webharto-rruget", text: "Rrugët"},
                    {nodeType: "gx_layer", layer: "local-webharto-industri", text: "Zonat industriale"},
                    {nodeType: "gx_layer", layer: "local-webharto-komercial", text: "Zonat Komerciale"},
                    {nodeType: "gx_layer", layer: "local-webharto-transporti", text: "Transporti publik"},
                    {nodeType: "gx_layer", layer: "local-webharto-objektet", text: "Objektet"}
                ]
            }
        ]
    }
];

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.options.searchPanelConfig = {
    xtype: 'hr_multisearchcenterpanel',
    height: 600,
    hropts: [
        {
            searchPanel: {
                xtype: 'hr_searchbydrawpanel',
                name: __('Search by Drawing'),
                description: 'Zgjidhni nje shtrese dhe nje mjet vizatimi. Vizatoni nje gjeometri per te gjetur objekte brenda saj.',
                header: false,
                downloadFormats: [
                    {
                        name: 'CSV',
                        outputFormat: 'csv',
                        fileExt: '.csv'
                    },
                    {
                        name: 'GML (version 2.1.2)',
                        outputFormat: 'text/xml; subtype=gml/2.1.2',
                        fileExt: '.gml'
                    },
                    {
                        name: 'ESRI Shapefile (zipped)',
                        outputFormat: 'SHAPE-ZIP',
                        fileExt: '.zip'
                    },
                    {
                        name: 'GeoJSON',
                        outputFormat: 'json',
                        fileExt: '.json'
                    }
                ]
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                autoConfig: true,
                exportFormats: ['XLS', 'WellKnownText'],
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_gxpquerypanel',
                name: 'Kerkimet',
                description: 'Kerko objekte brenda shtrirjes se hartes dhe / ose kritereve te kerkimit',
                header: false,
                border: false,
                caseInsensitiveMatch: true,
                autoWildCardAttach: true,
                downloadFormats: [
                    {
                        name: 'CSV',
                        outputFormat: 'csv',
                        fileExt: '.csv'
                    },
                    {
                        name: 'GML (version 2.1.2)',
                        outputFormat: 'text/xml; subtype=gml/2.1.2',
                        fileExt: '.gml'
                    },
                    {
                        name: 'ESRI Shapefile (zipped)',
                        outputFormat: 'SHAPE-ZIP',
                        fileExt: '.zip'
                    },
                    {
                        name: 'GeoJSON',
                        outputFormat: 'json',
                        fileExt: '.json'
                    }
                ]
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                exportFormats: ['XLS', 'WellKnownText'],
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: true
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_searchbyfeaturepanel',
                name: 'Kerko permes perzgjedhjes se objekteve',
                description: 'Zgjidhni objektet nga nje shtrese dhe perdorni geometries e tyre per te kerkuar ne nje shtrese tjeter',
                header: false,
                border: false,
                bodyStyle: 'padding: 6px',
                style: {
                    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                    fontSize: '12px'
                },
                downloadFormats: [
                    {
                        name: 'CSV',
                        outputFormat: 'csv',
                        fileExt: '.csv'
                    },
                    {
                        name: 'GML (version 2.1.2)',
                        outputFormat: 'text/xml; subtype=gml/2.1.2',
                        fileExt: '.gml'
                    },
                    {
                        name: 'ESRI Shapefile (zipped)',
                        outputFormat: 'SHAPE-ZIP',
                        fileExt: '.zip'
                    },
                    {
                        name: 'GeoJSON',
                        outputFormat: 'json',
                        fileExt: '.json'
                    }
                ]
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                exportFormats: ['XLS', 'WellKnownText'],
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        }
    ]
};

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "scale"},
    /* Leave out: see https://github.com/heron-mc/heron-mc/issues/116 */
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,
                displayPanels: ['Table'],

                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText', 'Shapefile'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
            }
        }
    }},
    {type: "-"} ,
    {type: "pan"},
//    {type: "pan", options: {iconCls: "icon-hand"}},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
/** Use "geodesic: true" for non-linear/Mercator projections like Google, Bing etc */
    {type: "measurelength", options: {geodesic: false}},
    {type: "measurearea", options: {geodesic: false}},
    {type: "-"},
    {type: "printdialog", options: {url: ''}},
    {type: "-"},
    {type: "oleditor", options: {
        pressed: false,

        // Options for OLEditor
        olEditorOptions: {
            editLayer: Heron.options.worklayers.editor,
            activeControls: ['UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'ModifyFeature', 'Separator'],
            featureTypes: ['text', 'polygon', 'path', 'point'],
            language: 'en',
            DownloadFeature: {
                url: Heron.globals.serviceUrl,
                formats: [
                    {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                    {name: 'Geographic Markup Language - v2 (GML2)', fileExt: '.gml', mimeType: 'text/xml', formatter: new OpenLayers.Format.GML.v2({featureType: 'oledit', featureNS: 'http://geops.de'})},
                    {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                    {name: 'GPS Exchange Format (GPX)', fileExt: '.gpx', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GPX', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')}
                ],
                // For custom projections use Proj4.js
                fileProjection: new OpenLayers.Projection('EPSG:7392')
            },
            UploadFeature: {
                url: Heron.globals.serviceUrl,
                formats: [
                    {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                    {name: 'Geographic Markup Language - v2 (GML2)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML'},
                    {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                    {name: 'GPS Exchange Format (GPX)', fileExt: '.gpx', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GPX', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'CSV (alleen RD-punten, moet X,Y kolom hebben)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:7392')},
                    {name: 'CSV (idem, punten in WGS84)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'ESRI Shapefile (1 laag, gezipped in RD)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                    {name: 'ESRI Shapefile (1 laag, gezipped in WGS84)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')}
                ],
                // For custom projections use Proj4.js
                fileProjection: new OpenLayers.Projection('EPSG:7392')
            }
        }
    }
    },
    {type: "upload", options: {
        upload: {
            layerName: 'Scratch',
            url: Heron.globals.serviceUrl,
            formats: [
                {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                {name: 'Geographic Markup Language - v2 (GML2)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML'},
                {name: 'Geographic Markup Language - v3 (GML3)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML.v3'},
                {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                {name: 'GPS Exchange Format (GPX)', fileExt: '.gpx', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GPX', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                {name: 'CSV (alleen RD-punten, moet X,Y kolom hebben)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:7392')},
                {name: 'CSV (idem, punten in WGS84)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                {name: 'ESRI Shapefile (1 laag, gezipped in RD)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                {name: 'ESRI Shapefile (1 laag, gezipped in WGS84)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')}
            ],
            // For custom projections use Proj4.js
            fileProjection: new OpenLayers.Projection('EPSG:7392')
        }
    }},
    {type: "-"},
//    {type: "coordinatesearch", options: {onSearchCompleteZoom: 8, localIconFile: 'redpin.png', projection: 'EPSG:7392', fieldLabelX: 'X', fieldLabelY: 'Y'}},
    {type: "coordinatesearch", options: {

        // === Full demo configuration ===

        // see ToolbarBuilder.js
        formWidth: 320, formPageX: 15, formPageY: 100
        // see CoordSearchPanel.js
        // , title: 'My title'
        , titleDescription: 'Zgjidhni nje sistem koordinativ nese eshte e nevojshme.<br>Pastaj futni koordinatat X / Y (RD) ose vlerat Lon / Lat.<br>&nbsp;<br>', titleDescriptionStyle: 'font-size:11px; color:dimgrey;', bodyBaseCls: 'x-form-back', bodyItemCls: 'hr-html-panel-font-size-11', bodyCls: 'hr-html-panel-font-size-11', fieldMaxWidth: 200, fieldLabelWidth: 80, fieldStyle: 'color: red;', fieldLabelStyle: 'color: darkblue', layerName: 'Locatie NL - RD', onProjectionIndex: 1, onZoomLevel: -1, showProjection: true, showZoom: true, showAddMarkers: true, checkAddMarkers: true, showHideMarkers: true, checkHideMarkers: false, removeMarkersOnClose: true, showRemoveMarkersBtn: true, buttonAlign: 'center'	,	// left, center, right

        hropts: [
            {
                projEpsg: 'EPSG:4326', projDesc: 'EPSG:4326 - WGS 84', fieldLabelX: 'Lon [shkalle]', fieldLabelY: 'Lat [shkalle]', fieldEmptyTextX: 'Shkruani gjatesine (x.yz) ......', fieldEmptyTextY: 'Shkruani gjeresine (x.yz) ...', fieldMinX: 19, fieldMinY: 42, fieldMaxX: 22, fieldMaxY: 44, iconWidth: 32, iconHeight: 32, localIconFile: 'bluepin.png', iconUrl: null
            },
            {
                projEpsg: 'EPSG:7392', projDesc: 'EPSG:7392 - KosovaRe01', fieldLabelX: 'X [m]', fieldLabelY: 'Y [m]', fieldEmptyTextX: 'Shkruaj y...', fieldEmptyTextY: 'Shkruaj x', fieldMinX: 7416000, fieldMinY: 4632000, fieldMaxX: 7568000, fieldMaxY: 4796000, iconWidth: 32, iconHeight: 32, localIconFile: 'redpin.png', iconUrl: null
            }

        ]

        // ====================================

    }},
    {
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            show: false,

            searchWindow: {
                title: null, //__('Multiple Searches'),
                x: 100,
                y: undefined,
                width: 360,
                height: 440,
                items: [
                    Heron.options.searchPanelConfig
                ]
            }
        }
    },
    {
        type: "namesearch",
        // Optional options, see OpenLSSearchCombo.js
        options: {
            xtype: 'hr_openlssearchcombo',
            id: "pdoksearchcombo",
            width: 240,
            listWidth: 400,
            minChars: 4,
            queryDelay: 200,
            zoom: 11,
            emptyText: 'Kerko addresen',
            tooltip: 'Kerko addresen',
            url: 'http://geodata.nationaalgeoregister.nl/geocoder/Geocoder?max=10'
        }
    },
    {type: "addbookmark"}
];

/** Values for BookmarksPanel (bookmarks to jump to specific layers/zoom/center on map. */
Ext.namespace("Heron.options.bookmarks");
Heron.options.bookmarks =
        [
            {
                id: 'fna',
                name: 'FNA',
                desc: 'Fna multipolygon dhe Orto',
                layers: ['Orthophoto_2012','test-points'],
                x: 7513665,
                y: 4723158,
                zoom: 9
            }
        ];
