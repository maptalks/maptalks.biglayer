var symbols = [



    {
        'markerType' : 'ellipse',
        'markerLinePatternFile' : 'images/x.svg',
        'markerLineOpacity' : 1,
        'markerLineWidth' : 5,
        // 'markerRotation' : 30,
        'markerFill' : {
                type : 'linear',
                colorStops : [
                    [0.00, 'red'],
                    [1 / 6, 'orange'],
                    [2 / 6, 'yellow'],
                    [3 / 6, 'green'],
                    [4 / 6, 'aqua'],
                    [5 / 6, 'blue'],
                    [1.00, 'white'],
                ]
            },
        'markerFillOpacity' : 1,
        'markerWidth' : 80,
        'markerHeight' : 20
    },
    [
        /*{
            'textName' : '图片标注',
            'textVerticalAlignment' : 'bottom'
        },*/

        {
            'markerFile' : 'images/marker-shadow.png',
            'markerDx'   : 8
        },
        {
            // 'markerRotation' : 30,
            'markerFile' : 'images/marker-icon.png'
        }
    ],


    [
        /*{
            'textName' : '矢量标注',
            'textVerticalAlignment' : 'bottom'
        },*/
        {
            'markerType'    : 'path', //pie, ellipse, x, cross, diamond, pin, square, bar
            'markerPath'    : [
                {
                    'path' : 'M8 23l0 0 0 0 0 0 0 0 0 0c-4,-5 -8,-10 -8,-14 0,-5 4,-9 8,-9l0 0 0 0c4,0 8,4 8,9 0,4 -4,9 -8,14z M5,9 a3,3 0,1,0,0,-0.9Z',
                    'fill' : '#DE3333'
                }
            ],
            'markerPathWidth' : 16,
            'markerPathHeight' : 23,
            'markerWidth'   : 32,
            'markerHeight'  : 46
        }
    ],

    {
        "textName"         : "I'm a text marker",
        "textFaceName"    : "arial",
        "textSize"         : "20",
        "textFill"         : "#550033",
        "textOpacity"      : 1,
        "textHaloFill"    : "#0f0",
        "textHaloRadius"  : 3,

        "textDx"           : 0,
        "textDy"           : 0,

        "textHorizontalAlignment" : "left", //left | middle | right | auto
        "textVerticalAlignment"   : "middle",   // top | middle | bottom | auto
        "textAlign"                : "left" //left | right | center | auto
    },

    {
        'markerType' : 'path',
        'markerPath' : tiger,
        'markerPathWidth' : 540,
        'markerPathHeight' : 580,
        'markerPlacement': 'point',
        'markerWidth': 80,
        'markerHeight': 80,
        'markerDy': 20,
        // 'markerRotation' : 30
    },

    {
        'markerFile' : 'images/ph.svg',
        'markerWidth' : 75,
        'markerHeight' : 100,
        'markerOpacity': 0.6,
        'markerDx' : 10,
        'markerDy' : 20
    },

    [
        {
            'markerFile' : 'images/x.svg',
            'markerWidth' : 20,
            'markerHeight' : 20,
            'markerDx' : 50,
            'markerDy' : 5
        },
        {
            'markerType' : 'ellipse',
            'markerWidth' : 80,
            'markerHeight' : 70
        }
    ]

];
