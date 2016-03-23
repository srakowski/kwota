var kwota = (function () {                
                           
    function loadView(view, views, done) {
        $.ajax({
            type: "GET",
            url: view,
            success: function (data) {
                $("body").append(data);                
                if (views.length == 0) {
                    done();
                } else {
                    var nextView = views.shift();
                    loadView(nextView, views, done);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    };

    var loadModules = function (views, done) {
        var view = views.shift();
        loadView(view, views, done);
    };    
        
    return {
        loadModules: loadModules,
        nav: {},
        vm: {}            
    };
        
})();