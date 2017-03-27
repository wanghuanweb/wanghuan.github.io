require.config({
    paths: {
        "jquery": "jquery.min",
        "fullPage":"jquery.fullPage",
        "velocity": "velocity.min",
        "velocity-ui": "velocity.ui.min",
        "index":"index"
    },
    shim: {
        "velocity": {
            deps: [ "jquery" ]
        },
        "fullPage": {
            deps: [ "jquery" ]
        },
        // velocity.ui 依赖 velocity
        "velocity-ui": {
            deps: [ "velocity" ]
        }
    }
});

require([ "jquery", "velocity", "velocity-ui" ], function ($, Velocity) {
    /* Your app code here. */
    $("body").velocity({ opacity: 0.5 });
});
